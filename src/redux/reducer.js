import { GET_ALL_PRODUCTS } from "./actions.js";
import { products } from "./products.js"

let initialState = {
    products: products,

}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default: 
        return state;
    }
}