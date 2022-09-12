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
    Order_By,
    RESET_USER,
    REMOVE_FROM_CART,
    REMOVE_WISH,
    GET_ALL_USERS,
    USER_BY_NAME,
    USERS_FILTRED,
    GET_USER_REVIEWS,
    GET_USED_GENRES,
    GET_USED_PLATFORMS,
    GET_USER_REPORTED_REVIEWS,
    GET_ALL_ORDERS,
    FILTRED_PRICE,
    GET_USER_ORDERS,
    CLEAR_CART


   } from "./actions.js";
import { products } from "./products.js";
/* import { products } from "./products.js" */



let initialState = {
products: [],
products2: [],
platforms: [],
genres: [],
searchered: [],
users: {},
cart: [],
wishlist:[],
currentPage: 1,
allUsers: [],
allUsersCopy: [],
reviewsUser: [],
usedGenres: [],
usedPlatforms: [],
reviewsUser: [],
reviewsUserRep: [],
allOrders:[],
userOrders:[],
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
    case GET_USED_GENRES:

        return{
            ...state,
            usedGenres: action.payload
        }

   case GET_PLATFORMS:
       
       return{
           ...state,
           platforms: action.payload
       }
    case GET_USED_PLATFORMS:
        return{
            ...state,
            usedPlatforms: action.payload
        }
   case GET_USERS:
       return{
           ...state,
           users: action.payload
           }

   case FILTER_BY_GENRES:
       let filtered_genres = state.products.filter((e) => {
           var arr = e.genres.map(e => {
               if (e.name === action.payload) {
                   return true;
               }else{return false}
           });
           if (arr.includes(true)) {
               return true;
           }else{return false}
       });
       
       console.log(state.searchered)

       let filtered_searchered = state.searchered.filter((e) => {
        var arr = e.genres && e.genres.map(e => {
            if (e.name === action.payload) {
                return true;
            }else{return false}
        });
        console.log(arr)
        if (arr.includes(true)) {
            return true;
        }else{return false}
    });
       //console.log(state.products2)
   return{
           ...state,
           products: filtered_genres,
           searchered: filtered_searchered
       }
   case SEARCH_PRODUCT:
       //console.log(action.payload)
       return{
           ...state,
           searchered: action.payload,
           //products: action.payload
       }

   case FILTER_BY_PLATFORMS:
       let filtered_platforms = state.products.filter((e) => {
           var arr = e.platforms.map(e => {
               if (e.name === action.payload) {
                   return true;
               }else{return false}
           });
           if (arr.includes(true)) {
               return true;
           }else{return false}
       });
    
       let filtered_searchered_plat = state.searchered.filter((e) => {
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
           products: filtered_platforms,
           searchered: filtered_searchered_plat
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
           searchered: [],
           products: state.products2
       };

   case ORDER_ASC: 
       function ascend(a, b) {
           if ( a.name < b.name ) { return -1; }
           if ( a.name > b.name ) { return 1; }
           return 0;
       }
   let asc = state.products.sort(ascend)
   let ascSerch = state.searchered.sort(ascend);
       return {
           ...state,
           products: [...asc],
           searchered: [...ascSerch]
       };

   case ORDER_DESC:
           function desc(a, b) {
               if ( a.name > b.name ) { return -1; }
               if ( a.name < b.name ) { return 1; }
               return 0;
           }
           let oderDesc = state.products.sort(desc)
           let oderDescSerch = state.searchered.sort(desc)

       return {
               ...state,
               products: [...oderDesc],
               searchered: [...oderDescSerch]
       };

   case ORDER_BY_RATING:
           let rat;
           let ratSerch
           const producRating = state.products
           
           action.payload === 'High to Low'
           ?  rat = producRating.sort((a, b) => b.rating - a.rating)
           :  rat = producRating.sort((a, b) => a.rating - b.rating)

           action.payload === 'High to Low'
           ?  ratSerch = state.searchered.sort((a, b) => b.rating - a.rating)
           :  ratSerch = state.searchered.sort((a, b) => a.rating - b.rating)

               return {
                   ...state,
                   products: [...rat],
                   searchered: [...ratSerch]
       };
       case Order_By:
           console.log(action.payload)
           return{
               ...state,
               products:[...state.products].sort(action.payload),
               searchered:[...state.searchered].sort(action.payload)
           };
       case ORDER_BY_ESRB:
           const esrb = state.products.filter(e => e.esrb_rating === action.payload)
           const esrbSerch = state.searchered.filter(e => e.esrb_rating === action.payload)
               return {
                   ...state,
                   products: [...esrb],
                   searchered: [...esrbSerch]
       };
   case RESET_USER :
       return{
          ...state,
          users: {}
       }
    case REMOVE_FROM_CART:
    let cartF= state.cart.filter(e=>e!==action.payload); //filtrados sin el id pasado
        return{
            ...state,
            cart: cartF
        }
    case REMOVE_WISH:
    let wishF = state.wishlist.filter(e=>e!==action.payload); // filtra con el id del juego de favs
        return{
            ...state,
            wishlist: wishF
        };

    case GET_ALL_USERS: 
        return {
            ...state,
            allUsers: action.payload,
            allUsersCopy: action.payload
        };

    case USER_BY_NAME:
        const userSearchered = state.allUsersCopy.filter(e => e.username === action.payload)
        return {
            ...state,
            allUsers: [...userSearchered]
        };

    case USERS_FILTRED: {
        let user_filtred;

        if (action.payload === "All") {
            user_filtred = state.allUsersCopy 

        }
        else if (action.payload === 'Admin') {
            user_filtred = state.allUsersCopy.filter(e => e.isAdmin === true)
        }

        else {
            user_filtred = state.allUsersCopy.filter(e => e.isBanned === true)
        }

        return {
            ...state,
            allUsers: [...user_filtred]
        }
    };

    case GET_USER_REVIEWS:

        let enabled_reviews = action.payload.filter((e) => !e.reported);

        return{
            ...state,
            reviewsUser: enabled_reviews,
        }
    case GET_USER_REPORTED_REVIEWS:
        let disabled_reviews = action.payload.filter((e) => e.reported);
        return{
            ...state,
            reviewsUserRep:disabled_reviews
        };

    case GET_ALL_ORDERS:
        return {
            ...state,
            allOrders: action.payload
        };
    case GET_USER_ORDERS:
        return {
            ...state,
            userOrders: action.payload
        }
    case CLEAR_CART:
        return{
            ...state,
            cart: []
        }

    case FILTRED_PRICE: 
        const filtred_prices = state.products.filter((e) => e.price <= action.payload)
        return {
            ...state,
            products: [...filtred_prices]
        };

   default: 
   return state;
}
}
