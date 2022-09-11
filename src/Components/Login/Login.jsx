import "./Login.css"
import React, { useEffect } from 'react'
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import gLogo from './btn_google.svg'
import { postUsers } from "./LoginHelper";
import { findEmail } from "../CreateUser/CreateUserHelper";
import { useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
const { REACT_APP_URL } = process.env;

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" }),
    [userGet, setUserGet] = useState({ userNExists: false, failedLog: false, userBan: false, isVerified: false }),
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch()

  const { userAuth } = useSelector(state => {
    return { userAuth: state.users }
  })

  useEffect(() => {
    if (user.username && user.password) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [user])

  function handleChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value })
    if (e.target.id === 'username') {
      setUserGet((i) => ({ ...i, userNExists: false, userBan: false, isVerified: false }))
    } else {
      setUserGet((i) => ({ ...i, failedLog: false }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userExist = await findEmail(user.username);
    if (userExist.user === null) {
      setUserGet((i) => ({ ...i, userNExists: true }));
    } else if (userExist.isBanned) {
      setUserGet((i) => ({ ...i, userBan: true }));
   } else if (!userExist.isVerified) {
     setUserGet((i) => ({ ...i, isVerified: true }));
    } else {
      const info = await postUsers(user);
      info.message === 'Not Autheticaded' && setUserGet((i) => ({ ...i, failedLog: true }));
      info.token && dispatch(getUsers(info.token)) && window.sessionStorage.setItem('token', info.token);
    }
  }

  return (
    <div class="mt-5 d-flex justify-content-center vh-100">
      {userAuth.user && <Redirect to='/home' />}
      <div class="card shadow-lg p-3 mb-5 bg-body rounded h-50" style={{ width: '18rem' }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" id="username" class={`form-control ${(userGet.userNExists || userGet.userBan) && "is-invalid"}`} aria-describedby="emailHelp" placeholder="example@examplemail.com" onChange={handleChange} value={user.username} name="username" />
            {userGet.userNExists && <p>Email address invalid</p>}
            {userGet.userBan && <p>Email address are banned</p>}
            {userGet.isVerified && <p>Email address not verified</p>}
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
          <a class={"linkA"} href={`${REACT_APP_URL}login/auth/google`}>
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
