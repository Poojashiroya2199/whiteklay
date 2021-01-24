const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const User=require("./usermodel");
const Role=require("./rolemodel");
const Organization=require("./organizationmodel");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 

const url="mongodb://localhost/user";
mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser:true,useCreateIndex: true,
	useFindAndModify: false})
    .then(()=>console.log("connected"))
    .catch((error)=>console.log(error))
const hostname="localhost";

//organization
app.post("/organization",function(req,res){
    console.log("...",req.body);
   var User1=new Organization({
         name:req.body.name,
         size:req.body.size,
         description:req.body.description
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
app.delete("/deleteorganization/:id",(req,res)=>{
    console.log(req.params.id);
    console.log("delete");
    const result=Organization.deleteOne({_id:req.params.id}).exec();
    res.send(result);
})
app.get("/organizationlist",(req,res)=>{
    Organization.find({}, function(err, data){
        console.log(">>>> " + data );
        res.send(data);
    });
})


// role
app.post("/roles",function(req,res){
    console.log("...",req.body);
   var User1=new Role({
         name:req.body.name,
         description:req.body.description
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
app.delete("/deleterole/:id",(req,res)=>{
    console.log(req.params.id);
    console.log("delete");
    const result=Role.deleteOne({_id:req.params.id}).exec();
    res.send(result);
})
app.get("/roleslist",(req,res)=>{
    Role.find({}, function(err, data){
        console.log(">>>> " + data );
        res.send(data);
    });
})

// employee
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
app.delete("/deleteemployee/:id",(req,res)=>{
    console.log(req.params.id);
    console.log("delete");
    const result=User.deleteOne({_id:req.params.id}).exec();
    res.send(result);
    
})
app.get("/employeelist",(req,res)=>{
    User.find({}, function(err, data){
        console.log(">>>> " + data );
        res.send(data);
    });
})

app.listen(5000,hostname,()=>console.log("server started at http://localhost:5000"));
