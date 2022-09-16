import React, { useState } from 'react'
import "./ChangePass.css"

function ChangePass() {


    function handleSubmit(e) {
        e.preventDefault()
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
            <div class="mt-5 card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
                <h3 id="pleaseLogIn" class=" inputLabel pt-3 mb-1">Restore Password</h3>
                <form onSubmit={(e) => handleSubmit(e)} method='post'>

                    s{/* NEW PASSWORD */}
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