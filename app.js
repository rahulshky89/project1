const express=require("express");
const app=express();
const ejsmate=require("ejs-mate");
const path=require("path");

const port=8080;

app.engine("ejs",ejsmate);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"))

app.listen(port,function(){
    console.log("Server is started----");
})
app.get("/",function(req,res){
   res.render("listing/index.ejs");

})
