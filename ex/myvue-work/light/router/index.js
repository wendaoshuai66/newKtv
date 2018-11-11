var light=require("ueklight");
var router=light.Router()
var mysql=require('./myql');
var fs=require("fs");
var path=require("path");
var md5=require('./md5');
var access=require("./access");
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});
})
/*管理员查看*/
router.get("/api/adminshow",function (req,res) {
   var uid=req.query.uid;
   mysql.query(`select rid from admin where uid=${uid}`,function (err,results) {
       if(err){
           res.end();
       }else {
           if(results[0].rid==1){
               mysql.query(`select admin.*,role.rname from admin,role where admin.rid=role.rid`,function (err,results1) {
                   if(err){
                       res.end();
                   }else{
                       access(uid,4,function () {
                           var obj={datas:results1,isShowDelbtn:true};
                           res.end(JSON.stringify(obj))
                       },function () {
                           var obj={datas:results1,isShowDelbtn:false};
                           res.end(JSON.stringify(obj))
                       })
                   }
               })
           }else {
               mysql.query(`select admin.* ,role.rname from admin,role where admin.rid=role.rid and admin.uid=${uid}`,function (err,results2) {
                   if(err){
                       res.end();
                   }else {
                       access(uid,4,function () {
                           var obj={datas:results2,isShowDelbtn:true};
                           res.end(JSON.stringify(obj))
                       },function () {
                           var obj={datas:results2,isShowDelbtn:false};
                           res.end(JSON.stringify(obj))
                       })
                   }

               })
           }
       }
   })
})
/*管理员接收图片*/
router.post("/api/uploads",function (req,res) {
    console.log(res)
    var relPath = res.upInfo.relPath;
    res.end(relPath);
})
/*管理员添加*/
router.post("/api/addAdmin",function (req, res) {
    var name=req.body.name;
    var num=req.body.num;
    var photo=req.body.photo;
    var uid=req.body.uid;
    var upass=md5("123456");
    access(uid,4,function () {
        mysql.query(`insert into admin (uname,rid,uphoto,upass) values ('${name}','${num}','${photo}','${upass}')`,function (err,results) {
            if(err){
                res.end('err');
            }else {
                if(results.affectedRows>0){
                    res.end('ok')
                }else {
                    res.end('err')
                }
            }
        })
    },function () {
        res.end("err1");
    })
})
/*管理员修改*/
router.post("/api/updateAdmin",function (req,res) {
    var name=req.body.name;
    var num=req.body.num;
    var photo=req.body.photo;
    var id=req.body.id;

    mysql.query(`update admin set uname='${name}',rid='${num}',uphoto='${photo}' where uid=${id}`,function (err,results) {
        if(err){
            res.end("err")
        }else {
            if(results.affectedRows>0){
                res.end("ok")
            }else {
                res.end("err")
            }
        }
    })
})
/*权限查看*/
router.get("/api/lableshow",function (req,res) {
    mysql.query(`select * from label`,function (err,results) {
        if (err){
            res.end('err');
        }else {
            res.end(JSON.stringify(results))
        }
    })
})
/*权限添加*/
router.get("/api/addlabel",function (req, res) {
    var name=(req.query.name);
    var num=(req.query.num);
    mysql.query(`insert into label (lname,lnum) values ('${name}',${num})`,function (err,results) {
        if(err){
            res.end('err');
        }else {
            if(results.affectedRows>0){
                res.end('ok')
            }else {
                res.end('err')
            }
        }
    })
})
/*权限删除*/
router.get("/api/delLabel/:id",function (req,res) {
    var id=(req.params.id);
    mysql.query(`delete from label where lid=${id}`,function (err,results) {
        if(err){
            res.end("err");
        }else {
            if (results.affectedRows>0){
                res.end("ok")
            }else {
                res.end("err");
            }
        }
    })
})
/*权限修改*/
router.get("/api/updatelabel",function (req,res) {
    var name=(req.query.name);
    var num=(req.query.num);
    var id=(req.query.id);
    mysql.query(`update label set lname='${name}',lnum='${num}' where lid=${id}`,function (err,results) {
        if(err){
            res.end("err")
        }else {
            if(results.affectedRows>0){
                res.end("ok")
            }else {
                res.end("err")
            }
        }
    })
})
/*角色查看*/
router.get("/api/roleshow",function (req,res) {
    mysql.query(`select * from role`,function (err,results) {
        if (err){
            res.end("err")
        }else {
            mysql.query(`select * from label`,function (err,aa) {
                if(err){
                    res.end("err");
                }else {
                    for(var i=0;i<results.length;i++){
                        var arr= results[i].lnum.split(',');
                        for(var j=0;j<arr.length;j++){
                            for(var k=0;k<aa.length;k++){
                                if(arr[j]*1==aa[k].lnum*1){
                                    var obj={};
                                    obj.lnum=aa[k].lnum;
                                    obj.lname=aa[k].lname;
                                    arr[j]=obj;
                                }
                            }
                        }
                        results[i].lable=aa;
                        results[i].lnum=arr;
                    }
                }
                res.end(JSON.stringify( results))
            })

        }
    })
})
/*角色添加*/
router.get("/api/addrole",function (req, res) {
    var name=(req.query.name);
    var num=(req.query.num);
    mysql.query(`insert into role (rname,lnum) values ('${name}','${num}')`,function (err,results) {
        if(err){
            res.end('err');
        }else {
            if(results.affectedRows>0){
                res.end('ok')
            }else {
                res.end('err')
            }
        }
    })
})
/*角色修改*/
router.get("/api/updaterole",function (req,res) {
    var name=(req.query.name);
    var num=(req.query.num);
    var id=(req.query.id);
    mysql.query(`update role set rname='${name}',lnum='${num}' where rid=${id}`,function (err,results) {
        if(err){
            res.end("err")
        }else {
            if(results.affectedRows>0){
                res.end("ok")
            }else {
                res.end("err")
            }
        }
    })
})
/*角色删除*/
router.get("/api/delRole",function (req,res) {
    var id=(req.query.rid);
    var uid=req.query.uid;
    access(uid,4,function () {
        mysql.query("select * from admin where rid="+id,function (err,results1) {
            if(err){
                res.end("err")
            }else {
                if(results1.length){
                    for(var i=0;i<results1.length;i++){
                        var photo=results1[i].uphoto;
                        fs.unlinkSync(path.resolve(photo));
                    }
                    mysql.query(`delete from admin where rid=${id}`,function (err,results2) {
                        if(err){
                            res.end("err");
                        }else {
                            if(results2.affectedRows>0){
                                mysql.query(`delete from role where rid=${id}`,function (err,results) {
                                    if(err){
                                        res.end("err");
                                    }else {
                                        if (results.affectedRows>0){
                                            res.end("ok")
                                        }else {
                                            res.end("err");
                                        }
                                    }
                                })
                            }else{
                                res.end("err")
                            }
                        }
                    })
                }else {
                    res.end("err");
                }
            }
        })
    },function () {
        res.end("err1")
    })
})
/*
* 非阻塞 nodejs 运行在后台 javascript运行在浏览器
* */
/*登录*/
router.get("/api/login",function (req,res) {
  var name=(req.query.name).replace(/['"]/g,"");
  var pass=md5(req.query.pass);
  mysql.query(`select * from admin where uname='${name}' and upass='${pass}'`,function (err,results) {
    if(err){
        var obj={message:"err",date:{}}
        res.end(JSON.stringify(obj));
    }else {
        if(results.length>0){
            var obj={message:"ok",date:results}
            res.end(JSON.stringify(obj));
        }else {
            var obj={message:"err",date:{}}
            res.end(JSON.stringify(obj));
        }
    }
  })
})




/*部门查看*/
router.get("/api/partshow",function (req,res) {
    mysql.query(`select * from part`,function (err,results) {
        if (err){
            res.end("err")
        }else {
            res.end(JSON.stringify(results))
        }
    })
})
/*部门添加*/
router.post("/api/addPart",function (req, res) {
    var name=req.body.name;
    var parentid=req.body.parentid;
    mysql.query(`insert into part (pname,parentid) values ('${name}','${parentid}')`,function (err,results) {
        if(err){
            res.end('err');
        }else {
            if(results.affectedRows>0){
                res.end(JSON.stringify(results.insertId))
            }else {
                res.end('err')
            }
        }
    })
})
/*部门删除*/
router.get("/api/delpart/:id",function (req,res) {
    var id=(req.params.id);
    mysql.query(`delete from part where pid=${id}`,function (err,results) {
        if(err){
            res.end("err");
        }else {
            if (results.affectedRows>0){
                res.end("ok")
            }else {
                res.end("err");
            }
        }
    })
})
/*部门修改*/
router.post("/api/updatePart",function (req, res) {
    var name=req.body.name;
    var parentid=req.body.parentid;
    var pid=req.body.pid;
    mysql.query(`update part set pname='${name}',parentid=${parentid} where pid=${pid}`,function (err,results) {
        if(err){
            res.end('err');
        }else {
            if(results.affectedRows>0){
                res.end('ok')
            }else {
                res.end('err')
            }
        }
    })
})