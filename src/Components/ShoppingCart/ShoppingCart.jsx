import "./ShoppingCart.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import Checkout from '../Checkout/Checkout'
import ProductCard from "../Cards/ProductCard/ProductCard";
import { addToCart, getAllProducts } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
let cart = useSelector(state=>state.cart);
let games = useSelector(state=>state.products2);
let users = useSelector(state=>state.users);
let filterGames=[];
let [cartLS, setCartLS] = useState([]);
let fg;
let gamesCO;
let forCheckout;
let dispatch=useDispatch();

useEffect(()=>{
    dispatch(getAllProducts())
    let cartLS2 = JSON.parse(localStorage.getItem("cart"));
    //localStorage.setItem('cart',JSON.stringify(cart));
    if(cart.length<1){
        cartLS2.forEach(e=> dispatch(addToCart(e)));
    }
    if(cartLS2){
        setCartLS(cartLS2)
    }
},[dispatch])


cartLS &&( cartLS.forEach(LS=>{
           fg = games.filter( games => LS === games.id);
           console.log(fg)
           if(fg.length>0){
               filterGames.push(fg[0])}
           }
           ))

if(filterGames.length>0){gamesCO= filterGames.map(e=>{
    return {
        title: e.name,
        unit_price: e.price,
        quantity: 1
    }
})
forCheckout = { items: gamesCO };
}


if(!cartLS && cart.length>0){
    cart.forEach(e=>{fg = games.filter((f)=>e===f.id)
filterGames.push(fg[0])
})}


console.log(forCheckout)

    return (
        <div class="d-flex flex-column vh-100  align-items-center">
            <div class="alert alert-dark w-50">
                <h1>My shopping cart</h1>
            </div>
            <div class="d-flex flex-row justify-content-evenly flex-wrap">
                {   filterGames.length>0?
                    (filterGames.map(e=>(
                        <div class="d-flex m-2">
                        <ProductCard id={e.id} name={e.name} img={e.background_image} rating={e.rating} platforms={e.platforms} price={e.price}
                        inStock={e.inStock}/>
                        </div>
                    ))): <h4>No products yet... </h4>
                }
            </div>
            <div>
                {users.user?
                    <div>
                        <h1 class="text-light">Pay with MercadoPago</h1>
                        {forCheckout && <Checkout games={forCheckout}/>}
                    </div>:
                    <Link to="/login">
                    <h2>You must be logged in..</h2>
                    </Link>
            
            }

            </div>
        </div>
    )
}
