const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const User=require("./usermodel");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 

const url="mongodb://localhost/user";
mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser:true,useCreateIndex: true,
	useFindAndModify: false})
    .then(()=>console.log("connected"))
    .catch((error)=>console.log(error))
const hostname="localhost";

app.post("/employee",function(req,res){
    console.log("...",req.body);
   var User1=new User({
         name:req.body.name,
    email:req.body.email,
    role:req.body.role,
    organization:req.body.organization
    });
    User1.save(function(err,data){
        if(err){
            res.send({status:0,result:err});
        }
        else{
            console.log(data);
            res.send({status:1,result:data});
        }
    })
});
app.delete("/deleteemployee",(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})
app.get("/employeelist",(req,res)=>{
    User.find({}, function(err, data){
        console.log(">>>> " + data );
        res.send(data);
    });
    
})

app.listen(5000,hostname,()=>console.log("server started at http://localhost:5000"));
