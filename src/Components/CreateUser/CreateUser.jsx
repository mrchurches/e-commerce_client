import "./CreateUser.css"

import React from 'react'
import { useState, useEffect } from "react";
import { existsUsername, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./CreateUserHelper";
import { Redirect, useHistory } from "react-router-dom";

const CreateUser = () => {
  const [user, setUser] = useState(userFormat),
    [userGet, setUserNames] = useState({ userExist: false, usernameExists: false }),
    [disabledBtn, setDisabled] = useState(true),
    [isChange, setChange] = useState(validatedFormat),
    [isSubmit, setIsSubmit] = useState(false),
    [validate, setvalidate] = useState(validatedFormat);

  let history = useHistory();

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
      setvalidate({
        ...validate,
        [e.target.id]: validatedFunctions.username(e.target.value)
      })
    } else if (e.target.id !== 'cPassword') {
      setvalidate({
        ...validate,
        [e.target.id]: validatedFunctions[e.target.id](e.target.value)
      })
    }
  };

  useEffect(() => {
    if (Object.values(validate).includes(false) || userGet.usernameExists || userGet.userExist) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [user, isChange, userGet.usernameExists])

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await existsUsername(user.username);
    if (response) {
      setUserNames((i) => ({ ...i, usernameExists: true }))
      return
    }
    const getUser = await findEmail(user.email);
    if (getUser.user !== undefined && getUser.user === null) {
      await createNewUser(user);
    } else {
      setUserNames((i) => ({ ...i, userExist: true }));
      setDisabled(true);
      return;
    }
    setChange(validatedFormat);
    setUser(userFormat);
    setvalidate(validatedFormat);
    setDisabled(true)
    setIsSubmit(true);
  };

  return (
    <div class="d-flex justify-content-center align-items-center vh-50 ">
      {isSubmit && <Redirect to={'/login'} />}
      <div class="mt-5 card shadow-lg p-3 mb-5  rounded w-25 createUserContainer" style={{ width: '18rem' }}>
        <h1 class="inputLabel">Register</h1><br />
        <form onSubmit={(e) => handleSubmit(e)} method='post'>
          <div class="relative z-0 mb-6 w-full group">
            <small for="exampleInputEmail1" class="form-label inputLabel">Email address</small><br />
            <input type="email" onChange={e => handleChange(e)} value={user.email} name="email" id="email" class={`form-control ${isChange.email && !validate.email && "is-invalid"}`} placeholder="your@email.com" required="" /><br /><br />
            {isChange.email && !validate.email && <small>Email Address is incorrect</small>}
            {userGet.userExist && <small class="inputLabel">Email Address already exists</small>}
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <small for="password" class="form-label inputLabel">Password</small><br />
            <input type="password" onChange={e => handleChange(e)} value={user.password} name="password" id="password" class={`form-control ${isChange.password && !validate.password && "is-invalid"}`} placeholder="Your Password" required="" /><br /><br />
            {isChange.password && !validate.password && <small class="inputLabel">Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <small for="confirm password" class="form-label inputLabel">Confirm Password</small><br />
            <input class={`form-control ${isChange.cPassword && user.cPassword !== user.password && "is-invalid"}`} type="password" onChange={e => handleChange(e)} value={user.cPassword} name="cPassword" id="cPassword" placeholder="Confirm password" required="" /><br /><br />
            {isChange.cPassword && user.cPassword !== user.password && <small class="inputLabel">Passwords don't match</small>}
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <small for="name" class="form-label inputLabel">Name</small><br />
              <input class={`form-control ${isChange.name && !validate.name && "is-invalid"}`} type="text" onChange={e => handleChange(e)} value={user.name} name="name" id="name" placeholder="First name" required="" /><br /><br />
              {isChange.name && !validate.name && <small class="inputLabel">Characters Invalid</small>}
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <small for="lastname" class="form-label inputLabel">Lastname</small><br />
              <input class={`form-control ${isChange.lastname && !validate.lastname && "is-invalid"}`} type="text" onChange={e => handleChange(e)} value={user.lastname} name="lastname" id="lastname" placeholder="Last name" required="" /><br /><br />
              {isChange.lastname && !validate.lastname && <small class="inputLabel">Characters Invalid</small>}
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <small for="username" class="form-label inputLabel">Username:  </small><br />
              <input type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" class={`form-control ${isChange.username && !validate.username && "is-invalid"}`} placeholder="Username" required="" /><br /><br />

              {isChange.username && !validate.username && <small class="inputLabel">Username Invalid</small>}
              {userGet.usernameExists && <small class="inputLabel">Username already exists</small>}
            </div>
          </div>
          <div class="inputLabel">All fields are required</div>
          <button type="submit" class="btn btn-primary" disabled={disabledBtn}>Submit</button>
        </form><br /><br />
        <button onClick={() => history.push("/login")} type="text" class="btn btn-secondary w-50 align-self-center m-2" >Go back</button>
      </div>
    </div>
  )
};

export default CreateUser;