import React,{useState,useEffect} from  "react";
import axios from "axios";
export default function Role(){
    const [role,setrole]=useState({name:"",description:""});
    const [error,seterror]=useState("");
    const [rolelist,setrolelist]=useState([]);
    const handlechange=(property,e)=>{
        const copyrole={...role};
        copyrole[property]=e.target.value;
        setrole(copyrole);
    }
    const adduser=()=>{
        if(!role.name || !role.description ){
            seterror("please enter valid username or email");
        }
        else{
            const roledata={
                name:role.name,
               description:role.description
            }
            console.log(roledata);
            axios.post("http://localhost:5000/roles",roledata)
            .then(function(response){
                console.log(response);
                setrole({name:"",description:""})
                listusers();
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
  
    const listusers=()=>{
        axios.get("http://localhost:5000/roleslist")
        .then(function(response){
            console.log(response.data);
            setrolelist(response.data);
        })
        .catch(function(error){
            console.log(error)
        });
    }
    useEffect(() => {
        listusers();
    }, []);
    
    const handledelete=(id)=>{
        // const user=rolelist.filter(role=>role._id===id);
        console.log(id);
        axios.delete("http://localhost:5000/deleterole/"+id)
        .then(function(response){
            console.log(response);
            listusers();
        })
        .catch(function(error){
            console.log(error);
        });
    }
    return (
        <div className="role">
            <div>{error}</div>
            <div className="rolename">
                <p>Name</p>
                <input type="text" value={role.name} onChange={(e)=>handlechange("name",e)}/>
            </div>
            <div className="rolerole">
                <p>Description</p>
                <input type="text" value={role.description} onChange={(e)=>handlechange("description",e)} />
            </div>
            <div className="add">
               <button onClick={adduser}>Add</button>
            </div>
            <div className="rolelist">
                <ul>{
                    rolelist.map(role=>(
                        <li key={role._id} type="none">
                            <div >{role.name} </div>
                            <button onClick={()=>handledelete(role._id)}>delete</button>
                        </li>
                    ))
                }</ul>
            </div>
        </div>
    )
}