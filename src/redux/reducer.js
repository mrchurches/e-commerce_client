import { GET_ALL_PRODUCTS,
         FILTER_BY_GENRES,
         GET_GENRES,
         GET_PLATFORMS,
         SEARCH_PRODUCT,
         FILTER_BY_PLATFORMS,
         GET_USERS,
         ADD_TO_CART,
         ADD_WISH,
         SET_CURRENT_PAGE
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
    wishlist:[],
    currentPage: 1
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
            let filtered_genres = state.products2.filter((e) => {
                var arr = e.genres.map(e => {
                    if (e.name === action.payload) {
                        return true;
                    }else{return false}
                });
                if (arr.includes(true)) {
                    return true;
                }else{return false}
            });
            console.log(state.products2)
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
            let filtered_platforms = state.products2.filter((e) => {
                var arr = e.platforms.map(e => {
                    if (e.name === action.payload) {
                        return true;
                    }else{return false}
                });
                if (arr.includes(true)) {
                    return true;
                }else{return false}
            });
        
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
        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
        default: 
        return state;
    }
}