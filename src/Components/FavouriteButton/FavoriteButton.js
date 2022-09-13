import axios from "axios";
const {REACT_APP_URL} = process.env

export async function addFavorite(idProduct, token){
    try {
        const response = await axios.get(REACT_APP_URL+'user/addFavorite/'+idProduct+'?tkn='+token);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteFavorite(idProduct, token){
    try {
        const response = await axios.get(REACT_APP_URL+'user/deleteFavorite/'+idProduct+'?tkn='+token);
        return response.data
    } catch (error) {
        console.log(error)
    }
}