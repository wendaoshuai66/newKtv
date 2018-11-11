var light=require("ueklight");
var mysql=require("./mysql");
var router=light.Router();
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});
})
router.get("/tableA",function (req,res) {
    setTimeout(function () {
        mysql.query('select * from demo', function (error, results, fields) {
            if (error) {
                console.log('接受错误');
                res.end();
            }else {
                res.end(JSON.stringify(results))
            }
        });
    },2000)
})
router.get("/add",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    mysql.query(`insert into demo (name,age,sex) values ('${name}','${age}','${sex}')`,function (err,results) {
        if(err){
            console.log("添加错误");
            res.end()
        }else {
            if(results.affectedRows>0){
                res.end("ok");
            }else {
                res.end("err");
            }
        }
    })
})
router.get("/del",function (req,res) {
    var id=req.query.id;
    setTimeout(function () {
        mysql.query(`delete from demo where id=${id}`,function (err,result) {
            if(err){
                res.end();
            }else {
                if(result.affectedRows>0){
                    res.end("ok")
                }else {
                    res.end("err")
                }
            }
        })
    },2000)
})
router.get("/query/:id",function (req,res) {
    var id=req.params.id;
    mysql.query("select * from demo where id="+id,function (err,result) {
        if(err){
            res.end();
        }else {
            res.end(JSON.stringify(result))
        }
    })
})
router.get("/updata",function (req,res) {
    var name=req.query.name;
    var age=req.query.age;
    var sex=req.query.sex;
    var id=req.query.id;
    mysql.query(`update demo set name='${name}',age='${age}',sex='${sex}' where id=${id}`,function (err,results) {
        if(err){
            console.log("修改错误");
            res.end("err")
        }else {
            if(results.affectedRows>0){
                res.send("ok");
            }else {
                res.send("err")
            }
        }
    })
})
router.get('/login',function(req,res){
    var name=(req.query.name);
    var pass=(req.query.pass);
    mysql.query(`select * from `)
})