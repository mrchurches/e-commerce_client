import axios from "axios";

//import { REACT_APP_URL } from "../CreateUser/CreateUserHelper";
const { REACT_APP_URL } = process.env;

export async function logout(){
    try {
        await axios.get(`${REACT_APP_URL}logout`, {
            withCredentials: true
        });
    } catch (error) {
        console.log(error)
    }
}

export function deleteCookies() {
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}