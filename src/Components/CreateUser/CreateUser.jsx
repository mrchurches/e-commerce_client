import "./CreateUser.css"

import React from 'react'
import { useState, useEffect } from "react";

import { getUsers, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./CreateUserHelper";
import { styleInput, submit } from "./CreateUserStyles";

const CreateUser = () => {
  const [user, setUser] = useState(userFormat),
  [usernames, setUserNames] = useState([]),
  [disabledBtn, setDisabled] = useState(true),
  [isChange, setChange] = useState(validatedFormat),
  [validate, setvalidate] = useState(validatedFormat);
  
  useEffect( ()=>{
     (async ()=> { 
      setUserNames(await getUsers())
    })()
  }, []);
  
  function handleChange(e) {
    setChange({
      ...isChange,
      [e.target.id]: true
    });
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
    if(e.target.id === 'username'){
      setvalidate({
        ...validate,
        [e.target.id] : validatedFunctions[e.target.id](usernames, e.target.value)
      })
    }else if (e.target.id !== 'cPassword') {
      setvalidate({
        ...validate,
        [e.target.id] : validatedFunctions[e.target.id](e.target.value)
      })
    }
  };

  useEffect(()=>{
    if(Object.values(validate).includes(false)){
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  }, [user, isChange])

  async function handleSubmit(e) {
    e.preventDefault()
    const getUser = await findEmail(user.email);
    if(!getUser){
      console.log(getUser)
      // await createNewUser(user)
    } else {
      setDisabled(true)
      setvalidate({
        ...validate,
        email : false
      });
    }
    setChange(validatedFormat)
    setUser(userFormat);
    setvalidate(validatedFormat)
  };

  return (
    <div>
      <div>Create your account</div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)} method='post'>
          <div class="relative z-0 mb-6 w-full group">
            <input type="email" onChange={e => handleChange(e)} value={user.email} name="email" id="email" class={`${styleInput}`} placeholder="Email address" required="" />
            {isChange.email && !validate.email  && <p>Email Address is incorrect</p>}
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input type="password" onChange={e=> handleChange(e)} value={user.password} name="password" id="password" class={`${styleInput}`} placeholder="Password" required="" />
            {isChange.password && !validate.password  && <p>Password Must be Contain: number, symbol, uppercase and 8 digits</p>}
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input type="password" onChange={e => handleChange(e)} value={user.cPassword} name="cPassword" id="cPassword" class={`${styleInput}`} placeholder="Confirm password" required="" />
            {isChange.cPassword && user.cPassword !== user.password && <p>Passwords don't match</p>}
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" onChange={e => handleChange(e)} value={user.name} name="name" id="name" class={`${styleInput}`} placeholder="First name" required="" />
              {isChange.name && !validate.name && <p>Characters Invalid</p>}
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" onChange={e => handleChange(e)} value={user.lastname} name="lastname" id="lastname" class={`${styleInput}`} placeholder="Last name" required="" />
              {isChange.lastname && !validate.lastname && <p>Characters Invalid</p>}
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" class={`${styleInput}`} placeholder="Username" required="" />
              {isChange.username && !validate.username && <p>Username Invalid</p>}
            </div>
          </div>
          <div>All fields are required</div>
          <button type="submit" class={`${submit}`} disabled={disabledBtn}>Submit</button>
        </form>
      </div>
    </div>
  )
};

export default CreateUser;