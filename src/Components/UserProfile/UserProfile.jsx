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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

import { existsUsername, userFormat, validatedFormat, validatedFunctions, findEmail, editUser } from "./UserProfileHelper";
import { Redirect, useHistory } from "react-router-dom";
import NoWorkResult from "postcss/lib/no-work-result";
import { getUsers, putUser } from "../../redux/actions";

const CreateUser = () => {
    let actualUser = useSelector(state => state.users.user)
    let dispatch = useDispatch();
    let history = useHistory();
    // let actualUser = {
    //     id: 1,
    //     username: "prueba1",
    //     name: "prueba",
    //     lastname: "prueba",
    //     email: "prueba1@p.com",
    //     password: "$2b$10$5ZZZKdDGg3ZWuenDkHsyKeU9.w25o5bhn0tz3N/XCxXdSRTnsFry.",
    //     profile_pic: "https://play.nintendo.com/images/profile-mk-koopa.27049d38.png",
    //     isBanned: false,
    //     isAdmin: true,
    //     isVerified: true,
    //     createdAt: "2022-09-10T19:15:06.819Z",
    //     Products: []
    // }
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
        const token = window.sessionStorage.getItem('token');
        token && (user === undefined) && dispatch(getUsers(token));
        console.log("🚀 ~ file: UserProfile.jsx ~ line 101 ~ useEffect ~ token", token)
    }, [user, dispatch])

    useEffect(() => {
        if (Object.values(validate).includes(false) || userGet.usernameExists || userGet.userExist) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [user, isChange, userGet.usernameExists])

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     console.log("🚀 ~ file: UserProfile.jsx ~ line 113 ~ handleSubmit ~ e", e)

    //     if (user !== undefined) {
    //         const response = await existsUsername(user.username);
    //         if (response) {
    //             setUserNames((i) => ({ ...i, usernameExists: true }))
    //             return
    //         }
    //         const getUser = await findEmail(user?.email);
    //         if (getUser) {
    //             setUserNames((i) => ({ ...i, userExist: true }));
    //             return
    //         } else if (!getUser) {
    //             await createNewUser(user)
    //         } else {
    //             setDisabled(true)
    //             setvalidate({
    //                 ...validate,
    //                 email: false
    //             });
    //         }
    //         setChange(validatedFormat);
    //         setUser(userFormat);
    //         setvalidate(validatedFormat);
    //         setDisabled(true)
    //         setIsSubmit(true);
    //     }
    // };


    async function handleSubmit(e) {
        e.preventDefault()
        //manda "user" al back
        await editUser(user)

        //manda "user" a redux
        dispatch(putUser(user))

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Profile Edited!',
            showConfirmButton: true,
            timer: 1500
        })
        history.push("/home");

        // window.location.reload()
    }


    //botón cloudinary
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
                // setPath(result.info.url)
                // user.profile_pic = path
                setUser((i) => ({ ...i, profile_pic: result.info.url }))
            }
        });

        widget.open()
    };




    //comprobación de passwords
    let [oldPassword, setOldPassword] = useState("")
    let [newPassword, setNewPassword] = useState("")
    let [confirmNewPassword, setConfirmNewPassword] = useState("")

    async function handlePasswordChange(e) {

        let oldPass = await bcrypt.compare(oldPassword, user.password)
        console.log(" 🚀 ~ file: UserProfile.jsx ~ line 164 ~ handlePasswordChange ~ oldPass", oldPass)
        let confirmation = validatedFunctions.password(newPassword)
        let newConfirmedPass = "";
        if (oldPass === true) {
            if (newPassword !== "" && confirmNewPassword !== "") {
                if (confirmation) {
                    if (newPassword === confirmNewPassword) {
                        let hashedPassword = bcrypt.hashSync(newPassword, process.env.REACT_APP_KEY_SALT)
                        newConfirmedPass = hashedPassword
                    }
                }
            }
        }
        if (confirmation && newConfirmedPass !== "") {
            user.password = newConfirmedPass
        }
    }
    let [disabledEmail, setDisabledEmail] = useState(true)
    let [disabledOldPassword, setDisabledOldPassword] = useState(true)
    let [disabledNewPassword, setDisabledNewPassword] = useState(true)
    let [disabledConfirmNewPassword, setDisabledConfirmNewPassword] = useState(true)
    let [disabledName, setDisabledName] = useState(true)
    let [disabledLastname, setDisabledLastname] = useState(true)
    let [disabledUsername, setDisabledUsername] = useState(true)



    return (
        <div class="d-flex justify-content-center align-items-center ">
            {isSubmit && <Redirect to={'/login'} />}
/////
            <div class="mt-5 card shadow-lg p-3 mb-5 rounded createUserContainer btp" style={{ width: '18rem' }}>
                <h3 class="text-info">Edit Your Profile</h3>
                <button class={'form-control '} onClick={showWidget}> Upload Image </button><br />
                <form onSubmit={(e) => handleSubmit(e)} method='post'>
                    <div class="relative z-0 mb-6 w-full group">

                        <img src={user.profile_pic} id={"uploadedImage"} alt={"selectedPic"} onClick={() => setPath("")} />
                    </div>
//////

                    {/* E-MAIL */}
                    <div class="relative z-0 mb-6 w-full group"><br />
                        <small onClick={(e) => setDisabledEmail(!disabledEmail)}
                            for="exampleInputEmail1"
                            class="inputLabel form-label">Click Here to edit E-Mail
                        </small>

                        <input type="email"
                            onChange={e => handleChange(e)}
                            // value={}
                            name="email"
                            id="email"
                            class={`form-control ${isChange.email && !validate.email && "is-invalid"}`}
                            placeholder={`${actualUser && actualUser.email}`}
                            required=""

                            disabled={disabledEmail} />

                        {isChange.email && !validate.email && <small>Email Address is incorrect</small>}
                        {userGet.userExist && <small>Email Address already exists</small>}
                    </div>

                    {/* OLD PASSWORD */}
                    {/* <div class="relative z-0 mb-6 w-full group">
                        <small onClick={(e) => setDisabledOldPassword(!disabledOldPassword)} for="password" class="form-label">Old Password</small><br />

                        <input type="password"
                            onChange={e => { setOldPassword(e.target.value); handlePasswordChange(e) }}
                            value={oldPassword}
                            name="oldpassword" id="password"
                            class={`form-control ${isChange.password && !validate.password && "is-invalid"}`}
                            placeholder="Old Password"
                            required=""
                            disabled={disabledOldPassword} />

                        {isChange.password && !validate.password && <small>Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
                    </div> */}

                    {/* NEW PASSWORD */}
                    {/* <div class="relative z-0 mb-6 w-full group">
                        <small onClick={(e) => setDisabledNewPassword(!disabledNewPassword)} for="password" class="form-label">New Password</small><br />

                        <input type="password"
                            onChange={e => { setNewPassword(e.target.value); handlePasswordChange(e) }}
                            value={newPassword}
                            name="password"
                            id="password"
                            class={`form-control ${isChange.password && !validate.password(newPassword) && "is-invalid"}`}
                            placeholder="New Password"
                            required=""
                            disabled={disabledNewPassword} />

                        {isChange.password && !validate.password && <small>Password Must be Contain: number, symbol, uppercase and 8 digits</small>}
                    </div> */}

                    {/* CONFIRM NEW PASSWORD */}
                    {/* <div class="relative z-0 mb-6 w-full group">
                        <small onClick={(e) => setDisabledConfirmNewPassword(!disabledConfirmNewPassword)} for="confirm password" class="form-label">Confirm New Password</small>

                        <input class={`form-control ${isChange.cPassword && user.cPassword !== user.password && "is-invalid"}`}
                            type="password"
                            onChange={e => { setConfirmNewPassword(e.target.value); handlePasswordChange(e) }}
                            value={confirmNewPassword}
                            name="cPassword"
                            id="cPassword"
                            placeholder="Confirm New password"
                            required=""
                            disabled={disabledConfirmNewPassword} />

                        {isChange.cPassword && user.cPassword !== user.password && <small>Passwords don't match</small>}
                    </div> */}

                    {/* NAME */}
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 mb-6 w-full group"><br />
                            <small onClick={(e) => setDisabledName(!disabledName)} for="name" class="inputLabel form-label">Click Here to edit Name</small><br />

                            <input class={`form-control ${isChange.name && !validate.name && "is-invalid"}`}
                                type="text"
                                onChange={e => handleChange(e)}
                                // value={actualUser && actualUser.name}
                                name="name"
                                id="name"
                                placeholder={`${actualUser && actualUser.name}`}
                                required=""
                                disabled={disabledName} />

                            {isChange.name && !validate.name && <small>Characters Invalid</small>}
                        </div>

                        {/* LASTNAME */}
                        <div class="relative z-0 mb-6 w-full group"><br />
                            <small onClick={(e) => setDisabledLastname(!disabledLastname)} for="lastname" class="inputLabel form-label"> Click Here to edit Lastname</small><br />

                            <input class={`form-control ${isChange.lastname && !validate.lastname && "is-invalid"}`}
                                type="text"
                                onChange={e => handleChange(e)}
                                // value={actualUser && actualUser.lastname}
                                name="lastname"
                                id="lastname"
                                placeholder={`${actualUser && actualUser.lastname}`}
                                required=""
                                disabled={disabledLastname} />

                            {isChange.lastname && !validate.lastname && <small>Characters Invalid</small>}
                        </div>

                        {/* USERNAME */}
                        <div class="relative z-0 mb-6 w-full group"><br />
                            <small onClick={(e) => setDisabledUsername(!disabledUsername)} for="username" class="form-label inputLabel">Click Here to edit Username</small>

                            <input type="text"
                                onChange={(e) => handleChange(e)}
                                // value={actualUser && actualUser.username}
                                name="username"
                                id="username"
                                class={`form-control ${isChange.username && !validate.username && "is-invalid"}`}
                                placeholder={`${actualUser && actualUser.username}`}
                                required=""
                                disabled={disabledUsername} />

                            {isChange.username && !validate.username && <small>Username Invalid</small>}
                            {userGet.usernameExists && <small>Username already exists</small>}
                        </div>
                    </div><br />
                    {/* <div>All fields are required</div> */}

                    {/* SUBMIT BUTTON */}
                    <button type="submit" class=" btn-info btn" >Submit</button>
                </form>
            </div>
        </div>
    )
};

export default CreateUser;