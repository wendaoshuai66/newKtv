var request=require('request');
var cheerio=require('cheerio');
var fs=require("fs");
var md5=require("./router/md5");
/*var buffer=require("buffer")*/
// var buf=buffer.alloc(65535)
var buf=Buffer.alloc(65535);
/*alloc(65535);*/
var async=require("async");
var mysql=require("./router/myql")
function save(str,num) {
    var md5str=md5(str);
    var nums=32/num;
    for(var  i=0;i<32;i+=nums){
        buf[parseInt(md5str.substr(i,nums),16)]=1;
    }

}
function dif(str,num,success,err) {
    var md5str=md5(str);
    var nums=32/num;
    var flag=true;
    for(var  i=0;i<32;i+=nums){
        if(buf[parseInt(md5str.substr(i,nums),16)]==1){
            flag=false;
        }
    }
    if(flag){
        if(success){
            success();
        }
    }else{
        if(err){
            err();
        }
    }
}

request("http://news.ifeng.com/history/",function (errr,head,body) {
    var $=cheerio.load(body)
    $("img").each(function (index,obj) {
        var src=$(obj).attr("src");
        var arr=$(".picTxt02 h3 a");
        var arr1=Array.from(arr);
        /*arr1.forEach(function (item,index) {
           console.log( $(item).attr('href'))
        })*/
        var name=Math.random()+src.slice(src.lastIndexOf('.'));
        request(src).pipe(fs.createWriteStream("./img/"+name));
    })
})
var link=[];
var datas=[];
async.series([
    /*1数据库里的东西*/
    function (next) {
        mysql.query("select * from news",function (err,results) {
            if(err){
                console.log(err)
            }else {
                for(var i=0;i<results.length;i++){
                    save(results[i].title,8)
                }
                next();
            }
        })
    },
    /*获取列表页*/
    function(next){
        request("http://tech.ifeng.com/listpage/803/1/list.shtml",function (err,head,body) {
            var $=cheerio.load(body);
            var arr1=$(".zheng_list h1 a");
            var arr2=$(".zheng_list h2 a")
            var arr4=Array.prototype.slice.call(arr1);
            var arr5=Array.prototype.slice.call(arr2);
            var arr=arr4.concat(arr5);
            arr.forEach(item=>{
                link.push($(item).attr("href"))
            })
            next()
        })
    },
    /*获取内容页*/
    function (next) {
        async.eachSeries(link,function (url,next1) {
            request(url,function (err,head,body) {
                var $=cheerio.load(body);
                var arr=[];
                var title=$("#artical_topic").text();
                dif(title,8,function () {
                     console.log(title)
                    var con=$("#artical_real").text();
                    arr.push(title)
                    arr.push(con);
                    datas.push(arr);
                },function () {
                    console.log("数据重复")
                })
                next1()
            })
        },function () {
            next()
        })
    },
//    插入数据库
    function (next) {
        mysql.query("insert into news (tile,con) values ?",[datas],function (err,result) {
            if(err){
                next(err)
            }else {
                console.log(result);
                next(null,result.affectedRows);
            }
        })
    }
],function (err,result) {
   if(err){
       console.log(err)
   }else {
       console.log(result)
   }
})








