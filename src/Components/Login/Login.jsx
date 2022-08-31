import "./Login.css"
import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  let [user,setUser] = useState({email:"", password:""});
  let [disabled, setDisabled] = useState(true);

  function handleChange(e){
    e.preventDefault();
    
    if(e.target.value){
      setUser({...user, [e.target.name]: e.target.value})
    
    }
    if(user.email && user.password) setDisabled(false);
  }

  function handleSubmit(e){
    e.preventDefault();
    alert("Login ok");
    setUser({});
  }
  
  return (
    <div>
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" placeholder="example@examplemail.com" onChange={handleChange} value={user.email} name="email"/>
        <br />
        <label>Password:</label>
        <input type="password" onChange={handleChange} value={user.password} name="password"/> 
        <br />
        <input disabled={disabled} type="submit" value="Log in" />
        </form>
      </div>
      <div>
        <h4>don't have an account?</h4>
        <Link to="/create_user"><span>Create one!</span></Link>
      </div>
    </div>
    
  )
}

export default Login