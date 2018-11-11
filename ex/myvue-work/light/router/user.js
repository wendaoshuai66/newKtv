var light=require("ueklight");
var router=light.Router()
var mysql=require('./myql');
var md5=require('./md5')
var xlsx=require('node-xlsx')
var async=require('async')
/*查看部门*/
router.get("/api/userpart",function (req,res) {
    var pid=req.query.pid;
    mysql.query(`select * from part where parentid=${pid}`,function (err,results) {
        if (err){
            res.end("err")
        }else {
           for(var i=0;i<results.length;i++){
               (function (i) {
                   mysql.query(`select * from part where parentid='${results[i].pid}'`,function (err,results1) {
                       if(err){
                           res.end("err")
                       }else {
                           results[i].style={};
                           if(results1.length>0){
                               results[i].son=true;
                           }else {
                               results[i].son=false;
                           }
                           if(i==results.length-1){
                               res.end(JSON.stringify(results))
                           }
                       }
                   })
               })(i)
           }
        }
    })
})
/*添加员工*/
router.get("/api/addUser",function (req,res) {
   var aname=(req.query.aname)
   var phone=(req.query.phone)
   var pid=(req.query.pid)
   var pass=md5("123456");
   mysql.query(`replace into user (aname,phone,pid,apass) values ('${aname}','${phone}',${pid},'${pass}')`,function (err,results) {
       if(err){
           res.end("err")
       }else {
           if(results.affectedRows>0){
               res.end("ok")
           }else {
               res.end("err");
           }
       }
   })
})
/*批量上传*/
router.post("/api/userup",function (req,res) {
    var obj=xlsx.parse(res.upInfo.path);
    var tabledata=(obj[0].data);
    var tablePart=[];
    for(var i=1;i<tabledata.length;i++){
        tablePart.push(tabledata[i][2])
    }
    var obj=new Set(tablePart)
   /* var datass=Array.prototype.slice.call(obj);*/
    tablePart=Array.from(obj)
    var datas=[];
    async.series([
        /*数据库的定西，约定的东西*/
        function (next) {
            mysql.query(`select * from part`,function (err,results) {
                if(err){
                    res.end("err")
                    next()
                }else {
                    datas=results;
                    next(null)
                }
            })
        },
        function (next) {
          function tree(data) {
              var arr=[];
              for(var i=0;i<data.length;i++){
                  var flag=true;
                  for(var j=0;j<data.length;j++){
                      if(data[i].pid==data[j].parentid){
                          flag=false;
                          break;
                      }
                  }
                  if(flag){
                      arr.push(data[i])
                  }
              }
              return arr;
          }
          next(null,tree(datas))
        }
    ],function (err,data) {
        /*上传数据比对*/
        var data=data[1];
        /*当前出错的数据容器*/
        var current=[];
        /*数据字典容器*/
        var same={}
        for(var i=0;i<tablePart.length;i++){
            var flag=true;
            for(var j=0;j<data.length;j++){
                if(tablePart[i]==data[j].pname){
                    same[data[j].pname]=data[j].pid;
                    flag=false;
                    break;
                }
            }
            if(flag){
                current.push(tablePart[i]);
            }
        }
        if(current.length>0){
            res.end(JSON.stringify(current))
        }else {
            var fina=[];
            for(var i=1;i<tabledata.length;i++){
                var arr=[];
                arr.push(tabledata[i][0])
                arr.push(tabledata[i][1])
                arr.push(same[tabledata[i][2]]);
                arr.push(md5("123456"))
                fina.push(arr);
            }
            mysql.query("replace into user (aname,phone,pid,apass) values ?",[fina],function (err,results) {
                if(err){
                    res.end("err")
                }else {
                    res.end("ok")
                }
            })
        }
    })
})