import "./ShoppingCart.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import Checkout from '../Checkout/Checkout'
import ProductCard from "../Cards/ProductCard/ProductCard";
import { getAllProducts } from "../../redux/actions";

export default function ShoppingCart() {
let cart = useSelector(state=>state.cart);
let games = useSelector(state=>state.products2);
let filterGames=[];
let [cartLS, setCartLS] = useState();
let fg;
let dispatch=useDispatch();

useEffect(()=>{
    dispatch(getAllProducts())
    setCartLS(localStorage.getItem("cart").split(","))
    
    //console.log(cartLS)
    //localStorage.clear()
},[])

useEffect(()=>{
   cartLS?.forEach(e=>{
        console.log("id de cartLS")
        console.log(e)
        console.log("id de base")
       fg = games.filter((f)=>{return e===f.id});
       console.log(fg[0])
       filterGames.push(fg[0])})

       console.log(filterGames)
},[cartLS])


if(!cartLS && cart.length>0){cart.forEach(e=>{fg = games.filter((f)=>e===f.id)
filterGames.push(fg[0])
})}

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
                {forCheckout.items.length>0 && <Checkout games={forCheckout}/>}
            </div>
        </div>
    )
}
