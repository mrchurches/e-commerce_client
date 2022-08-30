import { GET_ALL_PRODUCTS,
         FILTER_BY_GENRES,
         GET_GENRES,
         GET_PLATFORMS,
         SEARCH_PRODUCT
        } from "./actions.js";
import { products } from "./products.js"

let initialState = {
    products: products,
    products2: products,
    platforms: [],
    genres: []

}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                products2: action.payload
            }
        case GET_GENRES:
            
            return{
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            
            return{
                ...state,
                platforms: action.payload
            }

        case FILTER_BY_GENRES:

        return{
               ...state,
               products: action.payload
              }
        case SEARCH_PRODUCT:
            
            return{
                ...state,
                products: action.payload
            }
        default: 
        return state;
    }
}