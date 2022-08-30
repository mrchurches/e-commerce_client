import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export function getAllVideogames(){
    return function(dispatch){
        axios.get("ruta")
        .then((res)=>{
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload:res
            })
        })
    }
}