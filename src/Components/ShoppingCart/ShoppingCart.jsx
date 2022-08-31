import "./ShoppingCart.css";

import React from 'react'

export default function ShoppingCart(){
    let hardcodeo = [{name: "gtav", price: Math.floor(Math.random() * 5)},{name: "bloodborne", price: Math.floor(Math.random() * 5)},{name: "taxi", price: Math.floor(Math.random() * 5)}];
    let total=0;
    for(let i=0; i<hardcodeo.length; i++){
        total = hardcodeo[i].price + total;
    }
  return(
    <div>
        <div>
            <h1>My shopping cart</h1>
        </div>
        <div>
            {
                hardcodeo&&hardcodeo.map(e=>(
                    <div>
                        <h4>{e.name}</h4>
                        <h4>{e.price}</h4>
                    </div>
                ))
            }
        </div>
        <div>
            <h4>Total: ${total}</h4>
            
        </div>
        <div>
            <button>Purchase</button>
        </div>
    </div>
  )
}
