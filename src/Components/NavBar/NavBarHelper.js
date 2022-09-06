import axios from "axios";

import { REACT_APP_URL } from "../CreateUser/CreateUserHelper";
// const REACT_APP_URL = 'https://e-commerce-api-pf.herokuapp.com'

export function logout(){
    try {
        axios.get(`${REACT_APP_URL}/logout`, {
            withCredentials: true
        });
    } catch (error) {
        console.log(error)
    }
}