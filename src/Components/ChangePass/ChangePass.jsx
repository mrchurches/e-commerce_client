import axios from 'axios';
import React, { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import "./ChangePass.css"
import { useHistory } from 'react-router-dom'

function ChangePass() {
    let history = useHistory();
    let { id, token } = useParams();
    // console.log("🚀 ~ file: ChangePass.jsx ~ line 7 ~ ChangePass ~ id", id)
    // console.log("🚀 ~ file: ChangePass.jsx ~ line 7 ~ ChangePass ~ token", token)

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

    function handlePasswordChange(e) {
        e.preventDefault();
    }

    let [disabledNewPassword, setDisabledNewPassword] = useState(false)
    let [disabledConfirmNewPassword, setDisabledConfirmNewPassword] = useState(false)
    let [confirmNewPassword, setConfirmNewPassword] = useState(false)
    let [newPassword, setNewPassword] = useState(false)




    return (
        <div class="d-flex justify-content-center align-items-center restoreContainer mt-5 pb-5">
            {/* {isSubmit && <Redirect to={'/login'} />} */}
            <div class="mt-5 card shadow-lg p-3 mb-5 rounded cardProperties" style={{ width: '18rem' }}>
                <h3 id="pleaseLogIn" class=" inputLabel pt-3 mb-1">Restore Password</h3>
                <form onSubmit={(e) => handleSubmit(e)} method='post'>

                    {/* NEW PASSWORD */}
                    <div class="relative z-0 mb-6 w-full group">
                        <small onClick={(e) => setDisabledNewPassword(!disabledNewPassword)} for="password" class="form-label inputLabel">New Password</small><br />

                        <input type="password"
                            onChange={e => { setNewPassword(e.target.value); handlePasswordChange(e) }}
                            // value={newPassword}
                            name="password"
                            id="password"
                            class={`form-control`}
                            placeholder="New Password"
                            required=""
                            disabled={disabledNewPassword} />

                        <small class="form-laber inputLabel" hidden={true}>Password Must be Contain: number, symbol, uppercase and 8 digits</small>
                    </div>

                    {/* CONFIRM NEW PASSWORD */}
                    <div class="relative z-0 mb-6 w-full group">
                        <br />
                        <small onClick={(e) => setDisabledConfirmNewPassword(!disabledConfirmNewPassword)} for="confirm password" class="form-label inputLabel">Confirm New Password</small>

                        <input class={`form-control inputLabel`}
                            type="password"
                            onChange={e => { setConfirmNewPassword(e.target.value); handlePasswordChange(e) }}
                            // value={confirmNewPassword}
                            name="cPassword"
                            id="cPassword"
                            placeholder="Confirm New password"
                            required=""
                            disabled={disabledConfirmNewPassword} />

                        {newPassword !== confirmNewPassword && <small class="form-label inputLabel" hidden={true}>Passwords don't match</small>}
                    </div>


                    {/* SUBMIT BUTTON */}
                    <br /> <button type="submit" class="btn-info btn btn-primary" >Submit</button>
                </form>
            </div >
        </div >
    )
}

export default ChangePass