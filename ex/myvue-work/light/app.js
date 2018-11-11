var light=require("ueklight");
require("./router/index")
require("./router/user")
require("./router/client/index")
var query=require("uekquery");
var body=require("uekpost");
var multer=require("uekmulter")
var cookie=require("uekcookie");
var app=light();
app.use(query());
app.use(body());
app.use(cookie("12312"));
app.use(multer({filename:function () {
    return new Date().getTime();
}}))
app.listen(7777);