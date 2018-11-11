var light=require("ueklight");
var router=light.Router();
var mysql=require("../myql");
var md5=require("../md5");

router.get("/api/newSelect",function(req,res){
    var page=req.query.page;
    var num=req.query.num;
    var pages=page*num;
    mysql.query(`select * from news limit ${pages},${num}`,function(err,result){
        if(err){
            res.end("err");
        }else{
            res.send(JSON.stringify(result));
        }
    })
});
router.get("/api/conSelect",function(req,res){
    var nid=req.query.nid;
    mysql.query(`select * from news where nid=`+nid,function(err,result){
        if(err){
            res.end("err");
        }else{
            res.send(JSON.stringify(result[0]));
        }
    })
});
router.get("/api/phoneSelect",function(req,res){
    mysql.query(`select * from user`,function(err,result){
        if(err){
            res.end("err");
        }else{
            res.send(JSON.stringify(result));
        }
    })
});
