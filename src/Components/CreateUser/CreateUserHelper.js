import axios from 'axios'

export async function  validateUserRegister(username, name, lastname, email, password){ 
    
    // const getEmail = await axios.get() get email and verify if exist on the DB
    // const getUsername = await axios.get() get username ||

    // const usernameValidate = username === getUsername ? false : true,

    // emailValidate = email === getEmail ? false:
    // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),

    const emailValidate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),

    nameValidate = /(^[a-zA-Z]{0,20}$)/.test(name),

    lastnameValidate = /(^[a-zA-Z]{0,20}$)/.test(lastname),
    
    passwordValidate = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,8}$/.test(password);
    
    if(usernameValidate && emailValidate && nameValidate && lastnameValidate && passwordValidate) return true
    
    return false
}