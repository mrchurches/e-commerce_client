import axios from "axios";
import { deleteCookies } from "../Components/NavBar/NavBarHelper";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const FILTER_BY_PLATFORMS = "FILTER_BY_PLATFORMS";
export const GET_USERS = "GET_USERS"
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const ADD_WISH = "ADD_WISH";
export const REMOVE_WISH= "REMOVE_WISH";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const CLEAR = "CLEAR";
export const ORDER_ASC = "ORDER_ASC"
export const ORDER_DESC = "ORDER_DESC"
export const ORDER_BY_RATING = "ORDER_BY_RATING"
export const ORDER_BY_ESRB = "ORDER_BY_ESRB"
export const Order_By = "Orderby", 
RESET_USER = 'RESET_USER';
export const GET_ALL_USERS = "GET_ALL_USERS"
export const USER_BY_NAME = "USER_BY_NAME"
const {REACT_APP_URL} = process.env;

export function getAllProducts(){
    return function(dispatch){
        axios.get(`${REACT_APP_URL}videogames/`)
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
        axios.get(`${REACT_APP_URL}genres`)
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
        axios.get(`${REACT_APP_URL}platforms`)
        .then((res)=>{
            dispatch({
                type: GET_PLATFORMS,
                payload: res.data
            })
        })
        .catch(err=>console.log(err))
    }
};


export function searchProduct(name){
   if(name){
    return function (dispatch){
        axios.get(`${REACT_APP_URL}videogames?name=${name}`)
        .then((res)=>{
            dispatch({
                type: SEARCH_PRODUCT,
                payload:res.data
            })
        })
        .catch(err=>console.log(err))
    }
}else {return"No tiene nombre"}};


export function getUsers(token){
    return async function (dispatch){
        try {
            const response = await axios.get(`${REACT_APP_URL}user?tkn=${token}`)
            dispatch({
                type: GET_USERS,
                payload:response.data
            })
            return response.data
        } catch (error) {
            window.sessionStorage.removeItem('token');
            return;
        }

    }
};

// export function filterByGenres(value){
//     return{
//         type:FILTER_BY_GENRES,
//         payload: value
//     }
// } //esto me parece que no funciona asi

export function filterByGenres(value){
    return function(dispatch){
        dispatch({
            type: FILTER_BY_GENRES,
            payload: value
            
        })
    }
}

export function filterByPlatforms(value){
    return function(dispatch){
        dispatch({
            type: FILTER_BY_PLATFORMS,
            payload: value
        })
    }
}

export function addToCart(id){
    return function(dispatch){
        dispatch({
            type: ADD_TO_CART,
            payload: id
        })
}
}

export function removeFromCart(id){
    return function(dispatch){
        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        })
    }
}

export function addWish(id){
    return function(dispatch){
        dispatch({
            type: ADD_WISH,
            payload: id
        })
    }
}


export function setCurrentPage(number){
    return function(dispatch){
        dispatch({
            type: SET_CURRENT_PAGE,
            payload: number
        })
    }
}

export function clear(){
    return function(dispatch){
        dispatch({
            type: CLEAR,
            payload: []
        })
    }
};

export function asc(payload) {
    return {
        type: ORDER_ASC,
        payload
    }
};

export function desc(payload) {
    return {
        type: ORDER_DESC,
        payload
    }
};

export function orderRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
};

export function orderEsrb(payload) {
    return {
        type: ORDER_BY_ESRB,
        payload
    }

};

export function Orderby(payload){
    return{
        type: Order_By,
        payload
    };
};

export function Post_Game(payload){
    return async function (dispatch){
        try{
            let json = await axios.post(`${REACT_APP_URL}videogames/create`, payload)
            console.log(json)
            alert("Videogame Created Succesfully!")
            return json;
        }catch(e){
            console.error(e);
            alert(e.message)
        };
    };
};

export function Edit_Game(payload){
    return async function (dispatch){
        try{
            let json = await axios.put(`${REACT_APP_URL}videogames/edit`, payload)
            console.log(json)
            alert("Videogame Edited Succesfully!")
            return json;
        }catch(e){
            console.error(e);
            alert(e.message)
        };
    };
};

export function resetUser(){
    return{
        type: RESET_USER
    };
};

export function removeWish(id){
    return{
        type: REMOVE_WISH,
        payload: id
    }
};

export function getAllUsers(id){
    let url = id ? url = id : "all"
    return async function (dispatch){
        try {
            const response = await axios.get(`${REACT_APP_URL}users/${url}`)
            dispatch({
                type: GET_ALL_USERS,
                payload:response.data
            });
        }
        catch (error) {
            console.log(error.response)
        }

    };
};

export function byUserName(payload) {
    return function(dispatch){
        dispatch({
            type: USER_BY_NAME,
            payload
        })
    }
}
