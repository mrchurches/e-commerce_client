import "./CreateUser.css"

import React from 'react'
import { useState, useEffect } from "react";

import { getUsers, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./CreateUserHelper";
import { styleInput, submit } from "./CreateUserStyles";
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
    <div>
      {isSubmit && <Redirect to={'/login'} />}
      <div>Create your account</div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)} method='post'>
          <div class="relative z-0 mb-6 w-full group">
            <input type="email" onChange={e => handleChange(e)} value={user.email} name="email" id="email" class={`${styleInput}`} placeholder="Email address" required="" />
            {isChange.email && !validate.email && <p>Email Address is incorrect</p>}
            {userGet.userExist && <p>Email Address already exists</p>}
          </div>

          <div class="relative z-0 mb-6 w-full group">
            <input type="password" onChange={e => handleChange(e)} value={user.password} name="password" id="password" class={`${styleInput}`} placeholder="Password" required="" />
            {isChange.password && !validate.password && <p>Password Must be Contain: number, symbol, uppercase and 8 digits</p>}
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
              <input type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" class={`${styleInput}`} placeholder="Username" required="" />
              {isChange.username && !validate.username && <p>Username Invalid</p>}
              {userGet.userExist && <p>Username already exists</p>}
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