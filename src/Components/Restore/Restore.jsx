import React, { useState } from 'react'
import "./Restore.css"
import axios from 'axios';

function Restore() {
    let [email, setEmail] = useState()

    function handleChange(e) {
        e.preventDefault()
        setEmail(e.target.value)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        await axios.get(`${process.env.REACT_APP_URL}restore/?email=${email}`)
    }


    let [disabledEmail, setDisabledEmail] = useState(false)





    return (
        <div class="d-flex justify-content-center align-items-center restoreContainer mt-5 pb-5">
            {/* {isSubmit && <Redirect to={'/login'} />} */}
            <div class="mt-5 card shadow-lg p-3 mb-5 rounded cardProperties"
                style={{ width: '18rem' }}
            >
                <h3 id="pleaseLogIn"
                    class=" inputLabel pt-3 mb-1"
                >Restore Password</h3>

                <form onSubmit={(e) => handleSubmit(e)}
                    method='post'>

                    {/* E-MAIL */}
                    <div class="relative z-0 mb-7 w-full group">
                        <small onClick={(e) => setDisabledEmail(!disabledEmail)}
                            for="exampleInputEmail1"
                            class="inputLabel form-label"> Put Your Registered E-Mail:
                        </small><br />

                        <input type="email"
                            onChange={e => handleChange(e)}
                            value={email}
                            name="email"
                            id="email"
                            class={`form-control`}
                            placeholder={`your@mail.com`}
                            required=""
                            disabled={disabledEmail} />
                        <br />
                        {/* SEND Button */}
                        <button class="btn-primary btn-info btn"
                        >Send</button>

                        <small class="form-laber inputLabel"
                            hidden={true}
                        >Email Address is incorrect</small><br />

                        <small class="form-laber inputLabel"
                            hidden={true}
                        >Email Address already exists</small>
                    </div>

                </form>
            </div >
        </div >
    )
}

export default Restore