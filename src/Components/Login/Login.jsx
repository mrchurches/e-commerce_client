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
    }
    else if (userExist.isBanned) {
      setUserGet((i) => ({ ...i, userBan: true }));
      // } else if (!userExist.isVerified) {
      //   setUserGet((i) => ({ ...i, isVerified: true }));
    } else {
      const info = await postUsers(user);
      info.message?.search('login') && setUserGet((i) => ({ ...i, failedLog: true }));
      info.token && dispatch(getUsers(info.token)) && window.sessionStorage.setItem('token', info.token);
    }
  }

  return (
    <div class="d-flex justify-content-center align-items-center mt-5">
      {userAuth.user && <Redirect to='/home' />}
      <div class="card shadow-lg p-3 h-75 mb-5 rounded loginContainer w-25" style={{ width: '18rem'}}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3 id="pleaseLogIn" class=" pt-3 mb-4">Please Log-In</h3>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" id="username" class={`form-control ${(userGet.userNExists || userGet.userBan) && "is-invalid"}`} aria-describedby="emailHelp" placeholder="example@examplemail.com" onChange={handleChange} value={user.username} name="username" />
            {userGet.userNExists && <p>Email address invalid</p>}
            {userGet.userBan && <p>Email address are banned</p>}
            {userGet.isVerified && <p>Email address not verified</p>}
            <small id="emailHelp" class="inputLabel form-text inputLabel">We'll never share your email with anyone else.</small>
          </div>
          <div class="mb-1">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" onChange={handleChange} value={user.password} name="password" />
            {userGet.failedLog && <p>Invalid Password</p>}
            <Link class="linkA" to="/restore">
              <small class="form-label ">Forgot your password?</small><br />
            </Link>
          </div>
          <input disabled={disabled} type="submit" class="btn btn-primary btn-info mb-3" value="Login" />
        </form>
          <small class="">Don't have an account?</small><br />
        <div class="d-flex justify-content-center align-items-center">
          <div class="p-1">
          <Link to="/create_user">
            <span class="btn-primary btn-info btn">Create one!</span>
          </Link>
        </div>
        <small class="p-2">OR</small>
        <div class="btnLogo">
          <a class={"btn btn-secondary"} href={`${REACT_APP_URL}login/auth/google`}>
            <img src={gLogo} class="" id='' alt='googleButton' />
            <small class="form-label">Sign in with google</small>
          </a>
        </div>

          </div>
      </div>
    </div>
  )
}

export default Login
