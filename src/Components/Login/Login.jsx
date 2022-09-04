
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
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch()

  const { userAuth } = useSelector(state => {
    return { userAuth: state.users }
  })

  function resetStates() {
    setUser({ username: "", password: "" });
    setDisabled(true)
  }

  useEffect(() => {
    console.log(userAuth)
  }, [userAuth])

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userExist = await findEmail(user.username);
    if(!userExist){
      alert('this user not exist')
    }
    if (userExist.isBanned) {
      alert("you're banned");
    } else {
      await dispatch(postUsers(user));
    }
    resetStates()
  }
  return (
    <div class="mt-5 d-flex justify-content-center ">
      {userAuth.user && <Redirect to='/' />}
      <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" id="username" class="form-control" aria-describedby="emailHelp" placeholder="example@examplemail.com" onChange={handleChange} value={user.username} name="username" />
            <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" onChange={handleChange} value={user.password} name="password" />
          </div>
          <input disabled={disabled} type="submit" class="btn btn-primary" value="Login" />
        </form><br />
        <div>
          <small class="form-label">don't have an account?</small><br />
          <Link to="/create_user">
            <span class="btn btn-primary">Create one!</span>
          </Link>
        </div>
        <p>OR</p>
        <div class="btnLogo">
          <a class={"linkA"} href={`${REACT_APP_URL}/login/auth/google`}>


            <img src={gLogo} class="" id='' alt='googleButton' />
            <small class="form-label">Sign in with google</small><br />
            <br />


          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
