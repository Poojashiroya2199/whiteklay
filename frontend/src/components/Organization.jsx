import React,{useState,useEffect} from  "react";
import axios from "axios";
export default function Organization(){
    const [organization,setorganization]=useState({name:"",size:"",description:""});
    const [error,seterror]=useState("");
    const [organizationlist,setorganizationlist]=useState([]);
    const handlechange=(property,e)=>{
        const copyorganization={...organization};
        copyorganization[property]=e.target.value;
        setorganization(copyorganization);
    }
    const adduser=()=>{
        if(!organization.name || !organization.size || !organization.description){
            seterror("please enter valid username or email");
        }
        else{
            const organizationdata={
                name:organization.name,
               size:organization.size,
               description:organization.description
            }
            console.log(organizationdata);
            axios.post("http://localhost:5000/organization",organizationdata)
            .then(function(response){
                console.log(response);
                listusers();
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
    const listusers=()=>{
        axios.get("http://localhost:5000/organizationlist")
        .then(function(response){
            console.log(response.data);
            setorganizationlist(response.data);
        })
        .catch(function(error){
            console.log(error)
        });
    }
    useEffect(() => {
        listusers();
    }, []);
    
    const handledelete=(id)=>{
        // const user=organizationlist.filter(organization=>organization._id===id);
        console.log(id);
        axios.delete("http://localhost:5000/deleteorganization/"+id)
        .then(function(response){
            console.log(response);
            listusers();
        })
        .catch(function(error){
            console.log(error);
        });
    }
    return (
        <div className="organization">
            <div>{error}</div>
            <div className="organizationname">
                <p>Name</p>
                <input type="text" value={organization.name} onChange={(e)=>handlechange("name",e)}/>
            </div>
           
            <div className="organizationrole">
                <p>Size</p>
                <input type="number" value={organization.size} onChange={(e)=>handlechange("size",e)} />
            </div>
            <div className="organizationorganization">
                <p>Organization</p>
                <input type="text" value={organization.description} onChange={(e)=>handlechange("description",e)} />
            </div>
            <div className="add">
               <button onClick={adduser}>Add</button>
            </div>
            <div className="organizationlist">
                <ul>{
                    organizationlist.map(organization=>(
                        <li key={organization._id} type="none">
                            <div >{organization.name} </div>
                            <button onClick={()=>handledelete(organization._id)}>delete</button>
                        </li>
                    ))
                }</ul>
            </div>
        </div>
    )
}