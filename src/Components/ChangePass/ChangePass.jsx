import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import "./ChangePass.css"
import { useHistory } from 'react-router-dom'
import { existsUsername, userFormat, validatedFormat, validatedFunctions} from "../CreateUser/CreateUserHelper";

function ChangePass() {
    let [disabledNewPassword, setDisabledNewPassword] = useState(false)
    let [disabledConfirmNewPassword, setDisabledConfirmNewPassword] = useState(true)
    let [confirmNewPassword, setConfirmNewPassword] = useState("")
    let [newPassword, setNewPassword] = useState("")
    let [submit, setSubmit] = useState(true);


    let history = useHistory();
    let { id, token } = useParams();
    // console.log("🚀 ~ file: ChangePass.jsx ~ line 7 ~ ChangePass ~ id", id)
    // console.log("🚀 ~ file: ChangePass.jsx ~ line 7 ~ ChangePass ~ token", token)

    let [isChange, setChange] = useState(validatedFormat)

    async function handleSubmit(e) {
        e.preventDefault()

        if (confirmNewPassword === newPassword) {
            let salt = parseInt(process.env.REACT_APP_KEY_SALT)
            let hashedPass = await bcrypt.hash(newPassword, salt)
            console.log("🚀 ~ file: ChangePass.jsx ~ line 18 ~ handleSubmit ~ hashedPass", hashedPass)
            axios.put(`${process.env.REACT_APP_URL}restore/newpassword/${id}/${token}`, { newPassword: hashedPass })
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password Changed!',
            showConfirmButton: false,
            timer: 1500
        })
        history.push("/home")
    }
    let [validate, setValidate] = useState(false)
    
    useEffect(()=>{

        if(validatedFunctions.password(newPassword)){
            setDisabledConfirmNewPassword(false)
            setValidate(true)
        }
        if(!(validatedFunctions.password(newPassword))){
            setValidate(false)
        }
        if(newPassword !== "" && confirmNewPassword !== ""){
            if(newPassword === confirmNewPassword){
                setSubmit(false)
            }
        }

    },[newPassword, confirmNewPassword])

    function handlePasswordChange(e){
        e.preventDefault();
        if(e.target.name==="password"){
            setNewPassword(e.target.value)
        }
        if(e.target.name==="cPassword"){
            setConfirmNewPassword(e.target.value)
        }
        }
    

    



    return (
        <div class="d-flex justify-content-center align-items-center restoreContainer mt-5 pb-5">
            {/* {isSubmit && <Redirect to={'/login'} />} */}
            <div class="mt-5 card shadow-lg p-3 mb-5 rounded cardProperties" style={{ width: '18rem' }}>
                <h3 id="pleaseLogIn" class=" inputLabel pt-3 mb-1">Restore Password</h3>
                <form onSubmit={(e) => handleSubmit(e)} method='post'>

                    {/* NEW PASSWORD */}
                    <div class="relative z-0 mb-6 w-full group">
                        <small  for="password" class="form-label inputLabel">New Password</small><br />

                        {/* <input type="password" onChange={e => handleChange(e)} value={user.password} name="password" id="password" class={form-control ${isChange.password && !validate.password && "is-invalid"}} placeholder="Your Password" required="" /><br /><br />
    //     {isChange.password && !validate.password && <small class="inputLabel">Password Must be Contain: number, symbol, uppercase and 8 digits</small> */}

                        <input type="password"
                            onChange={e => handlePasswordChange(e)}
                            // value={newPassword}
                            name="password"
                            id="password"
                            class={`form-control ${!validate&& "is-invalid"}`}
                            placeholder="New Password"
                            required=""
                             />

                        {!validate && (<small class="form-laber inputLabel" >Password Must be Contain: number, symbol, uppercase and 8 digits</small>)}
                    </div>

                    {/* CONFIRM NEW PASSWORD */}
                    <div class="relative z-0 mb-6 w-full group">
                        <br />
                        <small for="confirm password" class="form-label inputLabel">Confirm New Password</small>

                        <input class={`form-control inputLabel ${newPassword !== confirmNewPassword && "is-invalid"}`}
                            type="password"
                            onChange={e => handlePasswordChange(e)}
                            // value={confirmNewPassword}
                            name="cPassword"
                            id="cPassword"
                            placeholder="Confirm New password"
                            required=""
                            disabled={!validate} />

                        {newPassword !== confirmNewPassword && <small class="form-label inputLabel">Passwords don't match</small>}
                    </div>


                    {/* SUBMIT BUTTON */}
                    <br /> <button disabled={submit} type="submit" class="btn-info btn btn-primary" >Submit</button>
                </form>
            </div >
        </div >
    //     <div class="relative z-0 mb-6 w-full group">
    //     <small for="password" class="form-label inputLabel">Password</small><br />
    //     <input type="password" onChange={e => handleChange(e)} value={user.password} name="password" id="password" class={form-control ${isChange.password && !validate.password && "is-invalid"}} placeholder="Your Password" required="" /><br /><br />
    //     {isChange.password && !validate.password && <small class="inputLabel">Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
    //   </div>
    )
}

export default ChangePass