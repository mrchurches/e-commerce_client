import "./CreateUser.css"
import React from 'react'
import { useState, useEffect } from "react";
// import { getUsers, postUsers } from "../../redux/actions";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

    function validate (user){
        let errors = {};

        if(user.password !== user.Cpassword){
            errors.password = "La contraseña no coincide"
        }
        if(user.lastname.length > 10){
            errors.lastname = "El lastname no puede contener mas de 10 caracteres"
        }
        if(!user.email || !user.email.includes("@")){
            errors.email = "El Email debe contener @"
        }
        return errors
    }

    const CreateUser = () => {
    let [user, setUser] = useState({
        name:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        Cpassword:""
    });
    let [disabled, setDisabled] = useState(true);
    const users = useSelector((state=>state.users))
    const [errors, setErrors] = useState({});
    // const dispatch = useDispatch()

    useEffect(()=>{
        console.log(user)
    },[user])



        function handleChange(e){          
            e.preventDefault()
            if(e.target.value){
                setUser({
                    ...user,
                    [e.target.name]: e.target.value
                    })
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
            if(usernameDuplicado.length > 0 && emailDuplicado.length > 0){
                alert("El Username o el Email ya se encuentra registrado")}
            if(!errors.name && !errors.lastname && !errors.username && !errors.email && !errors.password && !errors.Cpassword){
            // dispatch(postUsers(user))
            alert("User creado con exito")
            setUser({
                name:"",
                lastname:"",
                username:"",
                email:"",
                password:"",
                Cpassword:""
            })}else{ alert("Campos incompletos o con errores")}
            
            // history.push("/");
        }
        return (
        <div>
            <div>Create your account</div>
            <div>
                
    <form>
    <div class="relative z-0 mb-6 w-full group">
        <input type="email" onChange={e=> handleChange(e)} value={user.email} name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Email address*" required=""/>
    </div>
    <div class="relative z-0 mb-6 w-full group">
        <input type="password" onChange={e=> handleChange(e)} value={user.password} name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Password*" required=""/>
    </div>
    <div class="relative z-0 mb-6 w-full group">
        <input type="password" onChange={e=> handleChange(e)} value={user.Cpassword} name="Cpassword" id="Cpassword" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Confirm password*" required=""/>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 mb-6 w-full group">
            <input type="text" onChange={e=> handleChange(e)} value={user.name} name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="First name" required=""/>        
        </div>
        <div class="relative z-0 mb-6 w-full group">
            <input type="text" onChange={e=> handleChange(e)} value={user.lastname} name="lastname" id="lastname" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Last name" required=""/>
        </div>
        <div class="relative z-0 mb-6 w-full group">
            <input type="text" onChange={e=> handleChange(e)} value={user.username} name="username" id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Username*" required=""/>
        </div>
    </div>
        <div>Los campos marcados con * son obligatorios</div>
    <button type="submit" onClick={(e)=> handleSubmit(e)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
            </div>
        </div>
    )
    }

    export default CreateUser