import "./ShoppingCart.css";
import { useSelector } from "react-redux";
import React from 'react'
import Checkout from '../Checkout/Checkout'
import ProductCard from "../Cards/ProductCard/ProductCard";

export default function ShoppingCart() {
let cart = useSelector(state=>state.cart);
let games = useSelector(state=>state.products2);
let filterGames=[];
cart.forEach(e=>{
let fg = games.filter((f)=>e===f.id);
filterGames.push(fg[0])
})
// asitiene que se el juego= {
//     title: "Mi producto",
//     unit_price: 100,
//     quantity: 1,
//   };
let gamesCO= filterGames.map(e=>{
    return {
        title: e.name,
        unit_price: e.price,
        quantity: 1
    }
});

let forCheckout = { items: gamesCO };

console.log(filterGames)
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
                {cart.length>0 && <h1 class="text-light">Pay with MercadoPago</h1>}
                <Checkout games={forCheckout}/>
            </div>
        </div>
    )
}
