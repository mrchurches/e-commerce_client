
import style from "./Login.module.css"

import React, { useEffect } from 'react'
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import gLogo from './btn_google.svg'
import { useDispatch } from "react-redux";

import { postUsers } from "../../redux/actions";
import { findEmail } from "../CreateUser/CreateUserHelper";
import { useSelector } from "react-redux";
const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" }),
    [disabled, setDisabled] = useState(true);

  const { userAuth } = useSelector(state => {
    return { userAuth: state.users }
  })

  useEffect(() => {
    console.log(userAuth)
  }, [userAuth])

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value })
  }
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault();
    const userExist = await findEmail(user.username);
    if (userExist.isBanned) {
      alert("you're banned");
      return;
    }
    await dispatch(postUsers(user));
    setUser({ username: "", password: "" })
  }
  // {userAuth.user && <Redirect to='/'/>}
  function handleSubmit(e){
    e.preventDefault();
    alert("Login ok");
    setUser({email:"", password:""});
  }
  return (
    <div class="d-flex justify-content-center ">
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