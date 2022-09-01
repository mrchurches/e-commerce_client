import { GET_ALL_PRODUCTS,
         FILTER_BY_GENRES,
         GET_GENRES,
         GET_PLATFORMS,
         SEARCH_PRODUCT,
         FILTER_BY_PLATFORMS,
         GET_USERS,
         ADD_TO_CART,
         ADD_WISH
        } from "./actions.js";
/* import { products } from "./products.js" */



let initialState = {
    products: [],
    products2: [],
    platforms: [],
    genres: [],
    searchered: [],
    users: [],
    cart: [],
    wishlist:[]
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
        case GET_USERS:
            return{
                ...state,
                users: action.payload
                }

        case FILTER_BY_GENRES:
            let filtered_genres = state.products2.filter(e=> e.genres.includes(action.payload));
        return{
               ...state,
               products: filtered_genres
              }
        case SEARCH_PRODUCT:
            
            return{
                ...state,
                searchered: action.payload
            }

        case FILTER_BY_PLATFORMS:
            let filtered_platforms = state.products2.filter(e=> e.platforms.includes(action.payload));
        
            return{
                ...state,
                products: filtered_platforms
            }
        case ADD_TO_CART:
            return{
                ...state,
                cart: [...state.cart, action.payload]
            }
        case ADD_WISH:
            return{
                ...state,
                wishlist: [...state.wishlist, action.payload]
            }
        default: 
        return state;
    }
}