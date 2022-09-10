import "./ShoppingCart.css";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import Checkout from '../Checkout/Checkout'
import ProductCard from "../Cards/ProductCard/ProductCard";

export default function ShoppingCart() {
let cart = useSelector(state=>state.cart);
let games = useSelector(state=>state.products2);
let [saludo, setSaludo]=useState("hola")
const cartLocal = JSON.parse(localStorage.getItem("item" || "[]"))
let [carrito, setCarrito]=useState(cartLocal)
let filterGames=[]; //juewgos dentro del carrito.
cart.forEach(e=>{ //los juegos añadidos al carrito, los separa de los 120 juegos y los mete en filtergames
    let fg = games.filter((f)=>e===f.id); //compara la id de cart con las id de db pushea las que matchean a filtergames
    filterGames.push(fg[0])
})

//carga los juegos al estado local item, luego los va a setear en local storage
//cuando nuestro estado cambie, va a añadir al local storage
useEffect(()=>{ 
    localStorage.setItem("item", JSON.stringify(carrito))
    typeof id_user === "string" ? filterGames : cartLocal
    cart.forEach(e=>{
        let fg = games.filter((f)=>e===f.id);
        fg.forEach(e=>setItem(e))
    })
    //console.log(item) //vacio //vacio // encuentra
},[item]);

//trae los juegos de local storage
useEffect(()=>{
    const items = JSON.parse(localStorage.getItem("item"));
    console.log(items)
    if(item){
        setItem(items)
    }
},[])
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

//console.log(filterGames)
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
