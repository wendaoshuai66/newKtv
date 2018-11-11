var crypto=require("crypto");
function md5(pass) {
    var ext=crypto.createHash("md5").update(pass).digest("hex");
    return ext;
}
md5("123456");
console.log(md5("123456"))