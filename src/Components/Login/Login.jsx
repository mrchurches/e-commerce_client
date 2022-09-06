
import "./Login.css"

import React, { useEffect } from 'react'
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import gLogo from './btn_google.svg'
import { postUsers } from "../../redux/actions";
import { REACT_APP_URL } from "../CreateUser/CreateUserHelper";
import { findEmail } from "../CreateUser/CreateUserHelper";
import { useSelector } from "react-redux";
// const REACT_APP_URL = 'https://e-commerce-api-pf.herokuapp.com'

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" }),
    [userGet, setUserGet] = useState({ userNExists: false, failedLog: false, userBan: false }),
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
    if (user.username && user.password) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])

  useEffect(() => {
    return () => resetStates()
  }, [])

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value })
    if (e.target.id === 'username') {
      setUserGet((i) => ({ ...i, userNExists: false, userBan: false }))
    } else {
      setUserGet((i) => ({ ...i, failedLog: false }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userExist = await findEmail(user.username);
    if (!userExist) {
      setUserGet((i) => ({ ...i, userNExists: true }));
    } else if (userExist.isBanned) {
      setUserGet((i) => ({ ...i, userBan: true }));
    } else {
      const info = await dispatch(postUsers(user));
      info === 'Not Autheticaded' && setUserGet((i) => ({ ...i, failedLog: true }));
    }
    resetStates()
  }
  return (
    <div class="mt-5 d-flex justify-content-center ">
      {userAuth.user && <Redirect to='/home' />}
      <div class="card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" id="username" class={`form-control ${(userGet.userNExists ||userGet.userBan )&&"is-invalid"}`} aria-describedby="emailHelp" placeholder="example@examplemail.com" onChange={handleChange} value={user.username} name="username" />
            {userGet.userNExists && <p>Email addres invalid</p>}
            {userGet.userBan && <p>Email addres are banned</p>}
            <small id="emailHelp" class="form-text">We'll never share your email with anyone else.</small>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" onChange={handleChange} value={user.password} name="password" />
            {userGet.failedLog && <p>Password are invalid</p>}
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