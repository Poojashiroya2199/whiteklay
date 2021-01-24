import React,{useState} from  "react";
import axios from "axios";
export default function Employee(){
    const [employee,setemployee]=useState({name:"",email:"",role:"",organization:""});
    const [error,seterror]=useState("");
    const [employeelist,setemployeelist]=useState([]);
    const handlechange=(property,e)=>{
        const copyemployee={...employee};
        copyemployee[property]=e.target.value;
        setemployee(copyemployee);
    }
    const adduser=()=>{
        if(!employee.name || !employee.email || !employee.role ||!employee.organization){
            seterror("please enter valid username or email");
        }
        else{
            const employeedata={
                name:employee.name,
                email:employee.email,
                role:employee.role,
                organization:employee.organization
            }
            console.log(employeedata);
            axios.post("http://localhost:5000/employee",employeedata)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
    const deleteuser=()=>{
        console.log("delete");
    }
    const listusers=()=>{
        axios.get("http://localhost:5000/employeelist")
        .then(function(response){
            console.log(response.data);
            setemployeelist(response.data);
        })
        .catch(function(error){
            console.log(error)
        });
    }
    const handledelete=(id)=>{
        const user=employeelist.filter(employee=>employee._id===id);
        console.log(user);
        axios.delete("http://localhost:5000/deleteemployee",user)
        .then(function(response){
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }
    return (
        <div className="employee">
            <div>{error}</div>
            <div className="employeename">
                <p>Name</p>
                <input type="text" value={employee.name} onChange={(e)=>handlechange("name",e)}/>
            </div>
            <div className="employeeemail">
                <p>Email</p>
                <input type="email" value={employee.email} onChange={(e)=>handlechange("email",e)}/>
            </div>
            <div className="employeerole">
                <p>Role</p>
                <input type="text" value={employee.role} onChange={(e)=>handlechange("role",e)} />
            </div>
            <div className="employeeorganization">
                <p>Organization</p>
                <input type="text" value={employee.organization} onChange={(e)=>handlechange("organization",e)} />
            </div>
            <div className="add">
               <button onClick={adduser}>Add</button>
               <button onClick={deleteuser}>Delete</button>
               <button onClick={listusers}>
                   All employee
               </button>
            </div>
            <div className="employeelist">
                <ul>{
                    employeelist.map(employee=>(
                        <li key={employee._id}>
                            <div >{employee.name} </div>
                            <div>{employee.role}</div>
                            <button onClick={()=>handledelete(employee._id)}>delete</button>
                        </li>
                    ))
                }</ul>
            </div>
        </div>
    )
}