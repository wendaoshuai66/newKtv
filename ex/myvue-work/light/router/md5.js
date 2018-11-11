var crypto=require("crypto");
function md5(pass) {
    var aa=crypto.createHash("md5").update(pass).digest("hex");
    return aa;
}
module.exports=md5;