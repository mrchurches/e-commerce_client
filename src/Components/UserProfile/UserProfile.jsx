import "./CreateUser.css"

import bcrypt from 'bcryptjs';



// import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
// import { Transformation } from "@cloudinary/url-gen";

// // Import required actions.
// import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
// import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
// import { sepia } from "@cloudinary/url-gen/actions/effect";
// import { source } from "@cloudinary/url-gen/actions/overlay";
// import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
// import { byAngle } from "@cloudinary/url-gen/actions/rotate"

// // Import required qualifiers.
// import { image } from "@cloudinary/url-gen/qualifiers/source";
// import { Position } from "@cloudinary/url-gen/qualifiers/position";
// import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import CloudinaryUploadWidget from "./CloudinaryUploadWidget";










import React from 'react'
// import cloudinary from 'cloudinary'
// cloudinary = cloudinary.v2
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { existsUsername, userFormat, validatedFormat, validatedFunctions, findEmail, createNewUser } from "./UserProfileHelper";
import { Redirect } from "react-router-dom";
import NoWorkResult from "postcss/lib/no-work-result";

const CreateUser = () => {
    let actualUser = useSelector(state => state.users.user)
    const [user, setUser] = useState(actualUser),
        [userGet, setUserNames] = useState({ userExist: false, usernameExists: false }),
        [disabledBtn, setDisabled] = useState(true),
        [isChange, setChange] = useState(validatedFormat),
        [isSubmit, setIsSubmit] = useState(false),
        [validate, setvalidate] = useState(validatedFormat);

    // let userState = useSelector(state => state.user)


    function handleChange(e) {
        setUserNames((i) => ({
            ...i, userExist: false, usernameExists: false
        }));
        setChange({
            ...isChange,
            [e.target.id]: true
        });
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
        if (e.target.id === 'username') {
            setvalidate({
                ...validate,
                [e.target.id]: validatedFunctions.username(e.target.value)
            })
        } else if (e.target.id !== 'cPassword') {
            setvalidate({
                ...validate,
                [e.target.id]: validatedFunctions[e.target.id](e.target.value)
            })
        }
    };

    useEffect(() => {
        if (Object.values(validate).includes(false) || userGet.usernameExists || userGet.userExist) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [user, isChange, userGet.usernameExists])

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await existsUsername(user.username);
        if (response) {
            setUserNames((i) => ({ ...i, usernameExists: true }))
            return
        }
        const getUser = await findEmail(user.email);
        if (getUser) {
            setUserNames((i) => ({ ...i, userExist: true }));
            return
        } else if (!getUser) {
            await createNewUser(user)
        } else {
            setDisabled(true)
            setvalidate({
                ...validate,
                email: false
            });
        }
        setChange(validatedFormat);
        setUser(userFormat);
        setvalidate(validatedFormat);
        setDisabled(true)
        setIsSubmit(true);
    };


    // let [profilePic, setProfilePic] = useState("");
    // let [picPreview, setPicPreview] = useState("");

    // async function handleFile(e) {
    //     let file = e.target.files[0];
    //     preview(file)
    //     const data = new FormData();
    //     data.append('file', file)
    //     data.append('upload_preset', 'videogamespf')

    //     fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
    //         method: "POST",
    //         body: data
    //     })
    //     // .then((response) => {
    //     //     console.log(response.json())
    //     //     return response.text();
    //     // })

    // }

    let [path, setPath] = useState("");
    function showWidget() {

        let widget = window.cloudinary.openUploadWidget({
            cloudName: `vgpf`,
            uploadPreset: `videogamespf`,
            sources: ['local', 'url']
        }, (error, result) => {
            // console.log("----------------------------------------ERROR")
            // console.log(error)
            // console.log("----------------------------------------RESULT")
            // console.log(result.event)
            // console.log(result.info)
            if (!error && result.event === "success") {
                setPath(result.info.url)
            }
        });

        widget.open()
        // console.log(profilePic)
    };



    let [oldPassword, setOldPassword] = useState("")
    let [newPassword, setNewPassword] = useState("")
    let [confirmNewPassword, setConfirmNewPassword] = useState("")
    async function handlePasswordChange(e) {
        setOldPassword(e.target.value)
        let oldPass = await bcrypt.compare(e.target.value, user.password)
        if (oldPass === true) {
            if (newPassword !== "" && confirmNewPassword !== "") {
                if (newPassword === confirmNewPassword) {

                    newPassword = bcrypt.hashSync(newPassword, process.env.REACT_APP_KEY_SALT)
                    user.password = newPassword
                }
            }

        }

    }



    // function preview(p) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(p);
    //     reader.onloadend = () => {
    //         setPicPreview(reader.result)
    //     }
    //     console.log(picPreview)
    // }
    // function handlePic(e) {
    //     setPicPreview("")
    // }

    return (
        <div class="d-flex justify-content-center align-items-center">
            {isSubmit && <Redirect to={'/login'} />}
            <div class="mt-5 card shadow-lg p-3 mb-5 bg-body rounded" style={{ width: '18rem' }}>
                <h3>Edit Your Profile</h3>
                <form onSubmit={(e) => handleSubmit(e)} method='post'>
                    <div class="relative z-0 mb-6 w-full group">

                        <button class={'form-control'} onClick={showWidget}> Upload Image </button>
                        <img src={path} id={"uploadedImage"} alt={"selectedPic"} />

                    </div>


                    <div class="relative z-0 mb-6 w-full group">
                        <small for="exampleInputEmail1" class="form-label">E-Mail:</small>
                        <input type="email" onChange={e => handleChange(e)} value={user.email} name="email" id="email" class={`form-control ${isChange.email && !validate.email && "is-invalid"}`} placeholder={() => actualUser.email === undefined ? "New E-mail" : actualUser.email} required="" />
                        {isChange.email && !validate.email && <small>Email Address is incorrect</small>}
                        {userGet.userExist && <small>Email Address already exists</small>}
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <small for="password" class="form-label">Old Password</small><br />
                        <input type="password" onChange={e => handlePasswordChange(e)} value={oldPassword} name="password" id="password" class={`form-control ${isChange.password && !validate.password && "is-invalid"}`} placeholder="Old Password" required="" />
                        {isChange.password && !validate.password && <small>Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <small for="password" class="form-label">New Password</small><br />
                        <input type="password" onChange={e => setNewPassword(e)} value={user.password} name="password" id="password" class={`form-control ${isChange.password && !validate.password && "is-invalid"}`} placeholder="New Password" required="" />
                        {isChange.password && !validate.password && <small>Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
                    </div>
                    <div class="relative z-0 mb-6 w-full group">
                        <small for="confirm password" class="form-label">Confirm New Password</small>
                        <input class={`form-control ${isChange.cPassword && user.cPassword !== user.password && "is-invalid"}`} type="password" onChange={e => setConfirmNewPassword(e)} value={user.cPassword} name="cPassword" id="cPassword" placeholder="Confirm New password" required="" />
                        {isChange.cPassword && user.cPassword !== user.password && <small>Passwords don't match</small>}
                    </div>
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 mb-6 w-full group">
                            <small for="name" class="form-label">Name</small><br />
                            <input class={`form-control ${isChange.name && !validate.name && "is-invalid"}`} type="text" onChange={e => handleChange(e)} value={user.name} name="name" id="name" placeholder="First name" required="" />
                            {isChange.name && !validate.name && <small>Characters Invalid</small>}
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <small for="lastname" class="form-label">Lastname</small><br />
                            <input class={`form-control ${isChange.lastname && !validate.lastname && "is-invalid"}`} type="text" onChange={e => handleChange(e)} value={user.lastname} name="lastname" id="lastname" placeholder="Last name" required="" />
                            {isChange.lastname && !validate.lastname && <small>Characters Invalid</small>}
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                            <small for="username" class="form-label">Username:  </small>
                            <input type="text" onChange={(e) => handleChange(e)} value={user.username} name="username" id="username" class={`form-control ${isChange.username && !validate.username && "is-invalid"}`} placeholder={user.username} required="" />

                            {isChange.username && !validate.username && <small>Username Invalid</small>}
                            {userGet.usernameExists && <small>Username already exists</small>}
                        </div>
                    </div>
                    <div>All fields are required</div>
                    <button type="submit" class="btn btn-primary" disabled={disabledBtn}>Submit</button>
                </form>
            </div>
        </div>
    )
};

export default CreateUser;