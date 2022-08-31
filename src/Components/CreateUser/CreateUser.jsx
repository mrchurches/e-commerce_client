import "./CreateUser.css"
import React from 'react'
import { useState } from "react";
// import { getUsers, postUsers } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";




function validate (user){
    let errors = {};

    if(!user.name){
        errors.name = "Los campos con (*) son obligatorios"
    }
    if(user.lastname.length > 10){
        errors.lastname = "El lastname no puede contener mas de 10 caracteres"
    }
    if(!user.username){
        errors.username = "Los campos con (*) son obligatorios"
    }
    if(!user.email){
        errors.email = "Los campos con (*) son obligatorios"
    }

    return errors
}

const CreateUser = () => {
let [user, setUser] = useState({name:"",lastname:"",username:"",email:"",password:"",Cpassword:""});
let [disabled, setDisabled] = useState(true);
const users = useSelector((state=>state.users))
const [errors, setErrors] = useState({});
const dispatch = useDispatch()

// useEffect(()=>{
//     dispatch(getUsers());
// },[dispatch])



    function handleChange(e){          
        e.preventDefault()
        if(e.target.value){
            setUser({...user, [e.target.name]: e.target.value})
            setErrors(validate({
                ...user,
                [e.target.name]: e.target.value
            }))
        }
        if(user.name && user.lastname && user.username && user.email && user.password === user.Cpassword) setDisabled(false);
    }
    
    function handleSubmit(e){
        e.preventDefault()
        const usernameDuplicado = users.filter(e=>e.username === user.username)
        const emailDuplicado = users.filter(e=>e.email === user.email)
        if(usernameDuplicado.length < 0 && emailDuplicado.length < 0){
        // dispatch(postUsers(user))
        alert("User creado con exito")
        setUser({
            name:"",
            lastname:"",
            username:"",
            email:"",
            password:"",
            Cpassword:""
        })
        } else { alert("El Username o el Email ya se encuentra registrado")}
        // history.push("/");
    }
    return (
    <div>
        <div>Create your account</div>
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name * </label>
                <input type="text"  onChange={handleChange} value={user.name} name="name"/>{errors.name&&(<p>{errors.name}</p>)}
                <br />
                <label>Lastname </label>
                <input type="text"  onChange={handleChange} value={user.lastname} name="lastname"/>{errors.lastname&&(<p>{errors.lastname}</p>)}
                <br />
                <label>Username * </label>
                <input type="text" onChange={handleChange} value={user.username} name="username"/> {errors.username&&(<p>{errors.username}</p>)}
                <br />
                <label>Email * </label>
                <input type="email" placeholder=" example@examplemail.com" onChange={handleChange} value={user.email} name="email"/>
                <br />
                <label>Password * </label>
                <input type="password" onChange={handleChange} value={user.password} name="password"/> 
                <br />
                <label>Confirm your password * </label>
                <input type="password" onChange={handleChange} value={user.Cpassword} name="Cpassword"/> 
                <br />
                <input disabled={disabled} type="submit" value="Create" />
            </form>
        </div>
    </div>
  )
}

export default CreateUser