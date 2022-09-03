import "./Login.css"

import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import gLogo from './btn_google.svg'
import { useDispatch } from "react-redux";

import { postUsers } from "../../redux/actions";
import { URL } from "../CreateUser/CreateUserHelper";
import { findEmail } from "../CreateUser/CreateUserHelper";


const Login = () => {
  let [user, setUser] = useState({ username: "", password: "" });

  function handleChange(e) {
    if (e.target.value) {
      setUser({ ...user, [e.target.id]: e.target.value })
    }
  }
  const dispatch = useDispatch()
  async function handleSubmit(e) {
    console.log(user)
    e.preventDefault();
  /*   const banned = await findEmail(user.username);
     if (banned) {
      alert("you're banned");
      return;
    } */
     const dataUser = await dispatch(postUsers(user));
    console.log(dataUser);
  }

  return (
    <section class="h-screen">
      <div class="container px-6 py-12 h-full">
        <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="w-full"
              alt="Phone image"
            />
          </div>
          <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={(e)=>handleSubmit(e)} method='post'>
              {/* <!-- Email input -->  */}
              <div class="mb-6">
                <input
                  id="username"
                  type="text" onChange={(e)=>handleChange(e)}
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                />
              </div>
              {/*  <!-- Password input --> */}
              <div class="mb-6">
                <input
                  id="password"
                  type="password" onChange={(e)=>handleChange(e)}
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">Login</button>
              <br />
              <h4>don't have an account?</h4>
              <span>Create one!</span>
              <div class="">
                {/*  <!-- Submit button --> */}
                <Link to="/create_user" class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                viewBox="0 0 320 512"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                <button
                  type="submit"
                >
                  SIGN IN
                </button>
                </Link>
                <div
                  class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p class="text-center font-semibold mx-4 mb-0">OR</p>
                </div> 
                <a href={`${URL}/login/auth/google`} class="inline-block px-7 py-3 h-2 text-black font-medium text-xs bg-white leading-snug uppercase rounded shadow-md hover:bg-slate-200 hover:shadow-lg focus:bg-slate-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-300 active:shadow-lg transition  duration-150 ease-in-out flex justify-center w-full" >
                <button type="button" 
                viewBox="0 0 320 512"><img src={gLogo} class="h-px inline-block" id='' />
                Sign in with google
                </button>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login