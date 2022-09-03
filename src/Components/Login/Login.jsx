import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.css"

const Login = () => {
  let [user,setUser] = useState({email:"", password:""});
  let [disabled, setDisabled] = useState(true);

  function handleChange(e){
    e.preventDefault();
      setUser({...user, [e.target.name]: e.target.value})
    if(user.email && user.password) setDisabled(false);
  }

  function handleSubmit(e){
    e.preventDefault();
    alert("Login ok");
    setUser({email:"", password:""});
  }
  
  return (
    <div class="d-flex justify-content-center " style={{marginTop: '10vh'}}>
      <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{width: '18rem'}}>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@examplemail.com" onChange={handleChange} value={user.email} name="email"/>
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" onChange={handleChange} value={user.password} name="password"/>
            </div>
            <input disabled={disabled} type="submit" class="btn btn-primary" value="Login"/>
          </form>
          <div>
            <p class="form-label">don't have an account?</p>
            <Link to="/create_user">
              <span class="btn btn-primary">Create one!</span>
            </Link>
          </div>
      </div>
    </div> 
    )
}

export default Login