const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const User=require("./usermodel");
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

const url="mongodb://localhost/user";
mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser:true}, (error)=>console.log(error));
const hostname="localhost";

app.post("/signup",function(req,res){
    console.log("...",req.body);
   var User1=new User({
         name:req.body.name,
    email:req.body.email,
    phoneno:req.body.phoneno,
    password:req.body.password
    });
    User1.save(function(err,data){
        if(err){
            res.send({status:0,result:err});
        }
        else{
            res.send({status:1,result:data});
        }
    })
});
app.get("/signup",function(req,res){
    console.log(req.body);
    res.send(req.body);
})


app.get("/",(req,res)=>{
    res.send("login");
})

app.listen(5000,hostname,()=>console.log("server started at http://localhost:5000"));
