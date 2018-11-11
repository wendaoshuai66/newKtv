var request=require('request');
var cheerio=require('cheerio');
var async=require('async');
var md5=require('./router/md5');
var mysql=require('./router/myql');
var fs=require('fs');
var buf=Buffer.alloc(65535);

var CronJob = require('cron').CronJob;
new CronJob('1 * * * * *', function() {
    go();
}, null, true, 'America/Los_Angeles');
function go() {
    var links=[];var datas=[];
    async.series([
        //1、数据库里面的内容
        function (next) {
            mysql.query("select * from news",function (err, result) {
                if(err){
                    console.log(err);
                }else{
                    for(var i=0;i<result.length;i++){
                        save(result[i].title,8);
                    }
                    next();
                }
            })
        },
        //2、获取列表页的内容
        function (next) {
            request("http://tech.ifeng.com/listpage/803/1/list.shtml",function (err, head, body) {
                var $ = cheerio.load(body);
                var arr1=$(".zheng_list h1 a");
                var arr2=$(".zheng_list h2 a");
                var arr3=Array.prototype.slice.call(arr1);
                var arr4=Array.prototype.slice.call(arr2);
                var arr=arr3.concat(arr4);
                arr.forEach(function (item,index) {
                    links.push($(item).attr("href"));
                })
                next();
            })
        },
        //3、获取内容页
        function (next) {
            async.eachSeries(links,function (url,next1) {
                request(url,function (err, head, body) {
                    var arr=[];
                    var $ = cheerio.load(body);
                    var title=$("#artical_topic").text();
                    diff(title,8,function () {
                        console.log(title)
                        var con=$("#artical_real").text();
                        arr.push(title);
                        arr.push(con);
                        datas.push(arr);
                    })
                    next1();
                })
            },function () {
                next();
            })
        },
        //4、放入数据库
        function (next) {
            mysql.query("insert into news (title,con) values ?",[datas],function (err, result) {
                if(err){
                    next("err");
                }else{
                    console.log(result);
                    next(null,result.affectedRows);
                }
            })
        }],function (err,num) {
        if(err){
            console.log(err);
        }else{
            console.log(num);
        }
    })

}



function save(str,num) {
    var mstr=md5(str);
    var nums=32/num;
    for(var i=0;i<32;i+=nums){
        buf[parseInt(mstr.substr(i,nums),16)]=1;
    }
}
function diff(str,num,success,err) {
    var mstr=md5(str);
    var nums=32/num;
    var flag=true;
    for(var i=0;i<32;i+=nums){
        if(buf[parseInt(mstr.substr(i,nums),16)]==1){
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


































// process.exit();
// save("qwertyuiopasdfghjkl",8);
// diff("qwertyuiopasdfghjkl",8,function () {
//     console.log('不同');
// },function (){
//     console.log('相同');
// });
// gb2312 gbk unicodetb
//前台js 实现buffer数据类型 没有实现butter 接口
//buffer 缓存
//1、保存数据到内存
//2、数据的读取快
//
// async.series([
//     //获取数据库已经有的数据
// //    布隆过滤器     buffer
// ],function () {
//     console.log("end");
// })

// request("http://www.xinhuanet.com/politics/2018-01/21/c_1122291303.htm",function (err,head,body) {
//     var $=cheerio.load(body);
//     var arr=$('.h-news');
//     var arr1=$('.news-link');
//     var arr2=
//     arr.forEach(function (item,index) {
//         console.log($(item).text());
//     })
//     var url=$(arr[2]).attr("href");
//     request(url,function(err,head,body){
//         var $=cheerio.load(body);
//         console.log($('.h-title').html);
//     })
//
// })
// request("http://www.baidu.com/",function (err,head,body) {
//     var $=cheerio.load(body);
//     $("img").each(function (index,obj) {
//         if($(obj).attr("src").replace(/\s*/,"")){
//             var src='';
//             if($(obj).attr("src").indexOf("http")>-1){
//                 src=$(obj).attr("src");
//             }else{
//                 src="http:"+$(obj).attr("src");
//             }
//             console.log(src);
//         }
//         var name=Math.random()+".png";
//         var write=fs.createWriteStream("./imgs/"+name);
//         request(src).pipe(write);
//     })
// })

// $("img").each(function (index,item) {
//     if($(item).attr("src").replace(/\s*/,"")){
//         var src=($(item).attr("src"));
//         console.log(src);
//         var name=Math.random()+src.substr(src.lastIndexOf("."));
//         // console.log(name);
//         // request(src).pipe(fs.createWriteStream("./imgs/"+name));
//     }
// })