import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT"

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
};

export function getGenres(){
    return function (dispatch){
        axios.get("ruta")
        .then((res)=>{
            dispatch({
                type: GET_GENRES,
                payload:res.data
            })
        })
    }
};

export function getPlatforms(){
    return function (dispatch){
        axios.get("ruta")
        .then((res)=>{
            dispatch({
                type: GET_PLATFORMS,
                payload:res.data
            })
        })
    }
};

export function searchProduct(name){
   if(name){
    return function (dispatch){
        axios.get("ruta + name")
        .then((res)=>{
            dispatch({
                type: SEARCH_PRODUCT,
                payload:res.data
            })
        })
    }
}else {return"No tiene nombre"}};

export function filterByGenres(value){
    return{
        type:"FILTER_BY_GENRES",
        payload: value
    }
}