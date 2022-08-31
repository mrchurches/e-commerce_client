import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const FILTER_BY_PLATFORMS = "FILTER_BY_PLATFORMS";

const URL = "http://localhost:3001/";

export function getAllProducts(){
    return function(dispatch){
        axios.get(`${URL}videogames`)
        .then((res)=>{
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload:res.data
            })
        }
        )
        .catch(err=>console.log(err))
    }
};

export function getGenres(){
    return function (dispatch){
        axios.get(`${URL}genres`)
        .then((res)=>{
            dispatch({
                type: GET_GENRES,
                payload:res.data
            })
        })
        .catch(err=>console.log(err))
    }
};

export function getPlatforms(){
    return function (dispatch){
        axios.get(`${URL}platforms`)
        .then((res)=>{
            dispatch({
                type: GET_PLATFORMS,
                payload:res.data
            })
        })
        .catch(err=>console.log(err))
    }
};

export function searchProduct(name){
   if(name){
    return function (dispatch){
        axios.get(`${URL}videogames?name=${name}`)
        .then((res)=>{
            dispatch({
                type: SEARCH_PRODUCT,
                payload:res.data
            })
        })
        .catch(err=>console.log(err))
    }
}else {return"No tiene nombre"}};

export function filterByGenres(value){
    return{
        type:FILTER_BY_GENRES,
        payload: value
    }
}

export function filterByPlatforms(value){
    
    return{
        type:FILTER_BY_PLATFORMS,
        payload: value
    }
}