import "./CreateUser.css"
import React from 'react'
import { useState } from "react";

const CreateUser = () => {
let [user, setUser] = useState({username:"",email:"",password:"",Cpassword:""});
let [disabled, setDisabled] = useState(true);

    function handleChange(e){          
        e.preventDefault()
        if(e.target.value){
            setUser({...user, [e.target.name]: e.target.value})
        }
        if(user.username && user.email && user.password === user.Cpassword) setDisabled(false);
    }
    
    function handleSubmit(e){
        e.preventDefault()
    }
    return (
    <div>
        <div>Create your account</div>
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" onChange={handleChange} value={user.username} name="username"/> 
                <br />
                <label>Email:</label>
                <input type="email" placeholder="example@examplemail.com" onChange={handleChange} value={user.email} name="email"/>
                <br />
                <label>Password:</label>
                <input type="password" onChange={handleChange} value={user.password} name="password"/> 
                <br />
                <label>Confirm your password:</label>
                <input type="password" onChange={handleChange} value={user.Cpassword} name="Cpassword"/> 
                <br />
                <input disabled={disabled} type="submit" value="Create" />
            </form>
        </div>
    </div>
  )
}

export default CreateUser