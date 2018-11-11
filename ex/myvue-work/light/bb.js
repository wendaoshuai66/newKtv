var request = require('request');
var cheerio = require('cheerio');
var md5 = require('./router/md5')
var mysql = require('./router/myql')
var async =require('async')
var fs = require('fs');
var buf = Buffer.alloc(65535)
var CronJob = require('cron').CronJob;
new CronJob('1 * * * * *', function() {
    go()
}, null, true, 'America/Los_Angeles');

function go() {

    var links=[];
    var datas =[];
    async.series([
        function (next) {
            mysql.query("select * from news",function (err,result) {
                if(err){
                    console.log(err)
                }else{
                    for(let i=0;i<result.length;i++){
                        save(result[i].title,8)
                    }
                    next();
                }
            })
        },
        function (next) {
            request('http://tech.ifeng.com/listpage/803/1/list.shtml',function (err,head,body) {
                var $ = cheerio.load(body);
                var arr1 = $('.zheng_list h1 a');
                var arr2 = $('.zheng_list h2 a');
                var arr3 = Array.prototype.slice.call(arr1)
                var arr4 = Array.prototype.slice.call(arr2)
                var arr = arr3.concat(arr4)
                arr.forEach(function (item,index) {
                    var $ = cheerio.load(item);
                    links.push($(item).attr('href'))
                })
                next()
            })
        },
        function (next) {
            async.eachSeries(links,function (url,next1) {
                request(url,function (err,head,body) {
                    var $ = cheerio.load(body);
                    var arr=[];
                    let title = $('#artical_topic').text();
                    diff(title,8,function () {
                        let con = $('#artical_real').text();
                        arr.push(title)
                        arr.push(con)
                        datas.push(arr)
                    },function () {
                        console.log('数据重复')
                    })
                    next1();
                })
            },function () {
                next();
            })
        },
        function (next) {
            mysql.query('insert into news (title,con) values ?',[datas],function (err,result) {
                if(err){
                    next(err)
                }else{
                    next(null,result.affectedRows)
                }
            })
        }
    ],function (err,result) {
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
    function save(str,num) {
        var md5str = md5(str);
        var nums = 32/num;
        for(var i=0;i<32;i+=nums){
            buf[parseInt(md5str.substr(i,nums),16)]=1;
        }

    }
    function diff(str,num,success,err) {
        var md5str = md5(str);
        var nums = 32/num;
        var flag=true
        for(var i=0;i<32;i+=nums){
            if(buf[parseInt(md5str.substr(i,nums),16)]==1){
                flag = false;
            }
        }
        if(flag){
            if(success){
                success()
            }
        }else{
            if(err){
                err()
            }
        }
    }
}














/*request("http://tech.ifeng.com/a/20180122/44854180_0.shtml",function (err,head,body) {
    var $=cheerio.load(body)
    $('img').each(function (index,item) {
        var src = $(item).attr('src')
        var name = Math.random()+src.substr(src.lastIndexOf('.'))
        request(src).pipe(fs.createWriteStream('./imgs/'+name))
    })
})*/

/*保存数据到内存    数据的读取要快   类似数组
*
* 前台的javascript   实现 buffer数据类型
* 并没有实现  buffer的接口
*
* */

/*1.数据库里的内容
* 2.获取列表页的内容   去获取链接
* 3.获取内容页  eachseries
* 4.插入到数据库
*
*
* cron   定时
*
*
* */