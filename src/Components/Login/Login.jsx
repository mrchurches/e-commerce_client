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
    <div class="">
      {/* <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="example@examplemail.com" onChange={handleChange} value={user.email} name="email"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" onChange={handleChange} value={user.password} name="password"/> 
            <input disabled={disabled} type="submit" value="Log in" />
          </div>
        </form>
      </div>
      <div>
        <h4>don't have an account?</h4>
        <Link to="/create_user"><span>Create one!</span></Link>
      </div> */}
<div class="card" style={{width: '18rem'}}>
  <div class="card-body">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>

  </div>
</div>
      
        {/* <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form> */}

    </div>
    
    )
}

export default Login