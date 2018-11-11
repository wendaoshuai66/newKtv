var mysql=require("./myql");
function access(aid,num,successFun,errFun) {
    var sql=`select * from admin,role where admin.uid=${aid} and admin.rid=role.rid and find_in_set("${num}",role.lnum)`;
    /* var sql = `select * from admin,role  where admin.aid=${aid} and admin.rid=role.rid and find_in_set("${num}",role.lnum)`;*/
    mysql.query(sql,function (err,results) {
        if(err){
            errFun()
        }else {
            if(results.length>0){
                successFun()
            }else {
                errFun();
            }
        }
    })
}
module.exports=access;