
import style from "./Login.module.css"
import { btnGLogo } from "./LoginStyle";

import React, { useEffect } from 'react'
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import gLogo from './btn_google.svg'
import { postUsers } from "../../redux/actions";
import { REACT_APP_URL } from "../CreateUser/CreateUserHelper";
import { findEmail } from "../CreateUser/CreateUserHelper";
import { useSelector } from "react-redux";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" }),
  [userGet, setUserGet] = useState({ userNExists: false, failedLog:false, userBan:false }),
  [disabled, setDisabled] = useState(true),
   dispatch = useDispatch()

  const { userAuth } = useSelector(state => {
    return { userAuth: state.users }
  })

  function resetStates(){
    setUser({ username: "", password: "" });
    setDisabled(true)
  }
  
  useEffect(() => {
    if (user.username && user.password) {
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }, [user])

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value })
    if (e.target.id === 'email') {
      setUserGet((i) => ({...i,  userNExists: false, userBan:false}))
    }else{
      setUserGet((i) => ({...i, failedLog:false}))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userExist = await findEmail(user.username);
    if(!userExist){
      setUserGet((i) => ({...i, userNExists: true}));
    } else if(userExist.isBanned){
      setUserGet((i) => ({...i, userBan: true}));
    }else{
      const info = await dispatch(postUsers(user));
      !info.includes('Welcome') && setUserGet((i) => ({...i, failedLog: true}));
    }
    resetStates()
  }
  return (
    <div class="d-flex justify-content-center ">
      {userAuth.user && <Redirect to='/'/>}
      <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" id="username" class="form-control" aria-describedby="emailHelp" placeholder="example@examplemail.com" onChange={handleChange} value={user.username} name="username" />
            {userGet.userNExists && <p>Email addres invalid</p> }
            {userGet.userBan && <p>Email addres are banned</p> }
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" onChange={handleChange} value={user.password} name="password" />
            {userGet.failedLog && <p>Password are invalid</p> }
          </div>
          <input disabled={disabled} type="submit" class="btn btn-primary" value="Login" />
        </form>
        <div>
          <p class="form-label">don't have an account?</p>
          <Link to="/create_user">
            <span class="btn btn-primary">Create one!</span>
          </Link>
        </div>
        <p>OR</p>
        <div>
          <a href={`${REACT_APP_URL}/login/auth/google`} class={btnGLogo} >
            <button type="button"
              viewBox="0 0 320 512"><img src={gLogo} class="h-px inline-block" id='' />
              Sign in with google
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login