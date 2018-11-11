var light=require("ueklight");
var router=light.Router();
var mysql=require('./mysql');
/*
router.get("/",function(req,res){
    mysql.query('select * from demo', function (error, results, fields) {
        if (error) {
            console.log('接受错误');
            res.end();
        }else {
            res.render('admin.html', { title: results });
        }
    });
})*/
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});

})
