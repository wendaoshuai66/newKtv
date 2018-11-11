var crypto=require("crypto");
function md5(str){
    var hash = crypto.createHash("md5");

    return hash.digest("hex");
}
/*function md5(str) {
    const hash = crypto.createHmac('sha256', str)
    hash.update('I love cupcakes')
    hash.digest('hex');
}*/
console.log(md5(123456));