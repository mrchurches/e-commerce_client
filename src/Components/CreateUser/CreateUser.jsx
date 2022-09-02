import "./CreateUser.css"

import React from 'react'
import { useState, useEffect } from "react";

import { getUsers, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./CreateUserHelper";
import { styleInput, submit } from "./CreateUserStyles";

const CreateUser = () => {
  const [user, setUser] = useState(userFormat),
  [usernames, setUserNames] = useState([]),
  [disabledBtn, setDisabled] = useState(true);
  
  useEffect(async ()=>{
    await setUserNames(getUsers())
  }, []);
  
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
    if(e.target.id === 'username'){
      validatedFormat[e.target.id] = validatedFunctions[e.target.id](usernames, e.target.value);
    }
    if (e.target.id !== 'username' && e.target.id !== 'cPassword') {
      validatedFormat[e.target.id] = validatedFunctions[e.target.id](e.target.value);
    }
  };

  useEffect(()=>{
    if(user.cPassword){
      validatedFormat.cPassword = validatedFunctions.cPassword(user.cPassword, user.password);
    }
  }, [user.cPassword])

  useEffect(()=>{
    if(Object.values(validatedFormat).includes(false)){
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    const getUser = await findEmail(user.email);
    if(!getUser){
      await createNewUser(user)
    } else {
      setDisabled(true)
    }
  };
  return (
    <div>
      <div>Create your account</div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)} method='post'>
          <div class="relative z-0 mb-6 w-full group">
            <input type="email" onChange={e => handleChange(e)} value={user.email} name="email" id="email" class={`${styleInput}`} placeholder="Email address*" required="" />
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input type="password" onChange={e=> handleChange(e)} value={user.password} name="password" id="password" class={`${styleInput}`} placeholder="Password*" required="" />
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input type="password" onChange={e => handleChange(e)} value={user.cPassword} name="cPassword" id="cPassword" class={`${styleInput}`} placeholder="Confirm password*" required="" />
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" onChange={e => handleChange(e)} value={user.name} name="name" id="name" class={`${styleInput}`} placeholder="First name" required="" />
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" onChange={e => handleChange(e)} value={user.lastname} name="lastname" id="lastname" class={`${styleInput}`} placeholder="Last name" required="" />
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" class={`${styleInput}`} placeholder="Username*" required="" />
            </div>
          </div>
          <div>Fields marked with * are required</div>
          <button type="submit" class={`${submit}`} disabled={disabledBtn}>Submit</button>
        </form>
      </div>
    </div>
  )
};

export default CreateUser;