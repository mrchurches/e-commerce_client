import { GET_ALL_PRODUCTS,
         FILTER_BY_GENRES,
         GET_GENRES,
         GET_PLATFORMS,
         SEARCH_PRODUCT,
         FILTER_BY_PLATFORMS,
         GET_USERS,
         ADD_TO_CART,
         ADD_WISH,
         SET_CURRENT_PAGE,
         CLEAR,
         ORDER_ASC,
         ORDER_DESC,
         ORDER_BY_RATING,
         ORDER_BY_ESRB,
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
    currentPage: 1,
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
            console.log(action.payload)
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
        case CLEAR:
            return{
                ...state,
                searchered: []
            };

        case ORDER_ASC: 
            function ascend(a, b) {
                if ( a.name < b.name ) { return -1; }
                if ( a.name > b.name ) { return 1; }
                return 0;
            }
        let asc = state.products.sort(ascend)
        
            return {
                ...state,
                products: [...asc]
            };

        case ORDER_DESC:
                function desc(a, b) {
                    if ( a.name > b.name ) { return -1; }
                    if ( a.name < b.name ) { return 1; }
                    return 0;
                }
                let oderDesc = state.products.sort(desc)
    
            return {
                    ...state,
                    products: [...oderDesc]
            };

        case ORDER_BY_RATING:
                let rat;
                const producRating = state.products
                
                action.payload === 'High to Low'
                ?  rat = producRating.sort((a, b) => b.rating - a.rating)
                :  rat = producRating.sort((a, b) => a.rating - b.rating)
                    return {
                         ...state,
                         products: [...rat]
            };

            case ORDER_BY_ESRB:
               const esrb = state.products2.filter(e => e.esrb_rating === action.payload)
                    return {
                         ...state,
                         products: [...esrb]
            };


        default: 
        return state;
    }
}