import axios from "axios";
const {REACT_APP_URL} = process.env

export async function verifyEmail(email){
    try {
        const response = await axios.get(REACT_APP_URL+'user/verify?email='+email)
        return response.data
    } catch (error) {
        return {message: error}
    }
} 