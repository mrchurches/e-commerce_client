import "./CreateUser.css"

import React from 'react'
import { useState, useEffect } from "react";

import { getUsers, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./CreateUserHelper";
import { Redirect } from "react-router-dom";

const CreateUser = () => {
  const [user, setUser] = useState(userFormat),
    [userGet, setUserNames] = useState({ usernames: [], userExist: false, usernameExists: false }),
    [disabledBtn, setDisabled] = useState(true),
    [isChange, setChange] = useState(validatedFormat),
    [isSubmit, setIsSubmit] = useState(false),
    [validate, setvalidate] = useState(validatedFormat);

  useEffect(() => {
    (async () => {
      const users = await getUsers()
      setUserNames((i) => ({ ...i, usernames: users }))
    })()
  }, []);

  useEffect(() => {
    console.log(userGet)
  }, [userGet]);

  function handleChange(e) {
    setUserNames((i) => ({
      ...i, userExist: false, usernameExists: false
    }));
    setChange({
      ...isChange,
      [e.target.id]: true
    });
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
    if (e.target.id === 'username') {
      setUserNames((i) => ({ ...i, usernameExists: validatedFunctions.username.existsUsername(userGet.usernames, e.target.value) }))
      setvalidate({
        ...validate,
        [e.target.id]: validatedFunctions.username.validateUsername(e.target.value)
      })
    } else if (e.target.id !== 'cPassword') {
      setvalidate({
        ...validate,
        [e.target.id]: validatedFunctions[e.target.id](e.target.value)
      })
    }
  };

  useEffect(() => {
    if (Object.values(validate).includes(false) || userGet.usernameExists) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [user, isChange, userGet.usernameExists])

  async function handleSubmit(e) {
    e.preventDefault()
    const getUser = await findEmail(user.email);
    if (getUser) {
      setUserNames((i) => ({ ...i, userExist: true }));
      return
    } else if (!getUser) {
      await createNewUser(user)
    } else {
      setDisabled(true)
      setvalidate({
        ...validate,
        email: false
      });
    }
    setChange(validatedFormat);
    setUser(userFormat);
    setvalidate(validatedFormat);
    setDisabled(true)
    setIsSubmit(true);
  };

  return (
    <div class="d-flex justify-content-center align-items-center">
      {isSubmit && <Redirect to={'/login'} />}
      <div class="mt-5 card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
        <h4>Create your account</h4>
        <form onSubmit={(e) => handleSubmit(e)} method='post'>
          <div class="relative z-0 mb-6 w-full group">
          <small for="exampleInputEmail1" class="form-label">Email address</small>
            <input type="email" onChange={e => handleChange(e)} value={user.email} name="email" id="email" class={`form-control`} placeholder="your@email.com" required="" />
            {isChange.email && !validate.email && <small>Email Address is incorrect</small>}
          </div>
          <div class="relative z-0 mb-6 w-full group">
          <small for="password" class="form-label">Password</small><br />
          <input type="password" onChange={e => handleChange(e)} value={user.password} name="password" id="password" class={`form-control`} placeholder="Your Password" required="" />
          {isChange.password && !validate.password && <small>Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
          </div>
          <div class="relative z-0 mb-6 w-full group">
          <small for="confirm password" class="form-label">Confirm Password</small>
            <input class="form-control" type="password" onChange={e => handleChange(e)} value={user.cPassword} name="cPassword" id="cPassword" placeholder="Confirm password" required="" />
            {isChange.cPassword && user.cPassword !== user.password && <small>Passwords don't match</small>}
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
            <small for="name" class="form-label">Name</small><br />
              <input class="form-control" type="text" onChange={e => handleChange(e)} value={user.name} name="name" id="name" placeholder="First name" required="" />
              {isChange.name && !validate.name && <small>Characters Invalid</small>}
            </div>
            <div class="relative z-0 mb-6 w-full group">
            <small for="lastname" class="form-label">Lastname</small><br />
              <input class="form-control" type="text" onChange={e => handleChange(e)} value={user.lastname} name="lastname" id="lastname" placeholder="Last name" required="" />
              {isChange.lastname && !validate.lastname && <small>Characters Invalid</small>}
            </div>
            <div class="relative z-0 mb-6 w-full group">
            <small for="username" class="form-label">Username:  </small>
              <input type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" class="form-control" placeholder="Username" required="" />
              {isChange.username && !validate.username && <small>Username Invalid</small>}
            </div>
          </div>
          <div>All fields are required</div>
          <button type="submit" class="btn btn-primary" disabled={disabledBtn}>Submit</button>
        </form>
      </div>
    </div>
  )
};

export default CreateUser;