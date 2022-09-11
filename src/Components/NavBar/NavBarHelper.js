import axios from "axios";

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