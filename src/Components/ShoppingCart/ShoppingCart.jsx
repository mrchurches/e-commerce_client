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
console.log(filterGames)
    return (
        <div>
            <div>
                <h1>My shopping cart</h1>
            </div>
            <div>
                {
                    filterGames.map(e=>(
                        <ProductCard id={e.id} name={e.name} img={e.background_image} rating={e.rating} platforms={e.platforms} price={e.price}
                        inStock={e.inStock}/>
                    ))
                }
            </div>
            <div>
                <h1>pagar</h1>
                <Checkout />
            </div>
        </div>
    )
}
