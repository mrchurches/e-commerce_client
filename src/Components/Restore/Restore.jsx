import React, { useState } from 'react'
import "./Restore.css"

function Restore() {

    function handleChange(e) {
        e.preventDefault()
    }
    function handleSubmit(e) {
        e.preventDefault()
    }

    function handlePasswordChange(e) {
        e.preventDefault();
    }
    let [disabledEmail, setDisabledEmail] = useState(false)
    let [disabledNewPassword, setDisabledNewPassword] = useState(false)
    let [disabledConfirmNewPassword, setDisabledConfirmNewPassword] = useState(false)
    let [confirmNewPassword, setConfirmNewPassword] = useState(false)
    let [newPassword, setNewPassword] = useState(false)
    let [disabledCode, setDisabledCode] = useState(false)




    return (
        <div class="d-flex justify-content-center align-items-center restoreContainer">
            {/* {isSubmit && <Redirect to={'/login'} />} */}
            <div class="mt-5 card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
                <h3 id="pleaseLogIn" class=" inputLabel pt-3 mb-1">Restore Password</h3>
                <form onSubmit={(e) => handleSubmit(e)} method='post'>

                    {/* E-MAIL */}
                    <div class="relative z-0 mb-7 w-full group">
                        <small onClick={(e) => setDisabledEmail(!disabledEmail)}
                            for="exampleInputEmail1"
                            class="inputLabel form-label"> follow the steps:
                        </small><br />
                        <br />
                        <small onClick={(e) => setDisabledEmail(!disabledEmail)}
                            for="exampleInputEmail1"
                            class="inputLabel form-label"> 1- E-Mail:
                        </small>

                        <input type="email"
                            onChange={e => handleChange(e)}
                            // value={}
                            name="email"
                            id="email"
                            class={`form-control`}
                            placeholder={`your@mail.com`}
                            required=""

                            disabled={disabledEmail} />
                        <br />
                        <button class="btn-primary btn-info btn" >2- Send</button>

                        <small class="form-laber inputLabel" hidden={true}>Email Address is incorrect</small><br />
                        <small class="form-laber inputLabel" hidden={true}>Email Address already exists</small>
                    </div>

                    {/* CODE */}
                    <div class="relative z-0 mb-6 w-full group">
                        <br />
                        <small onClick={(e) => setDisabledCode(!disabledCode)}
                            for="exampleInputEmail1"
                            class="inputLabel form-label">CODE:
                        </small>
                        <br />
                        <input type="text"
                            name="identifier form-control"
                            class="field"
                            onChange={e => handleChange(e)}
                            // value={}
                            disabled={disabledCode}
                            id="code"
                            required=""
                            placeholder={`3- put the CODE here`}
                            pattern="[a-zA-Z0-9]+" />


                        <small class="form-laber inputLabel" hidden={true}>Email Address is incorrect</small>
                        <small class="form-laber inputLabel" hidden={true}>Email Address already exists</small>
                    </div>

                    s{/* NEW PASSWORD */}
                    <div class="relative z-0 mb-6 w-full group">
                        <small onClick={(e) => setDisabledNewPassword(!disabledNewPassword)} for="password" class="form-label inputLabel">4- New Password</small><br />

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
                        <small onClick={(e) => setDisabledConfirmNewPassword(!disabledConfirmNewPassword)} for="confirm password" class="form-label inputLabel">5- Confirm New Password</small>

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
                    <br /> <button type="submit" class="btn-info btn btn-primary" >6- Submit</button>
                </form>
            </div >
        </div >
    )
}

export default Restore