import React, { useEffect, useState } from 'react'
import { Link, NavLink} from 'react-router-dom'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, removeWish, addWish} from '../../../redux/actions.js' // CREAR UNA ACTION QUE DEPLOYE FAVORITO AL USUARIO
import './ProductCard.css'
import FavouriteButton from '../../FavouriteButton/FavouriteBurron.jsx'



export default function ProductCard({ id, name, img, rating, platforms, price, inStock}) {
  let cart = useSelector(state=>state.cart);
  let foundCart=false;   //aca encontraria el juego si esta agregado al carrito
  const dispatch = useDispatch()
  
  
  
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.value === "cart") {
       let fC = cart.filter(e=>e===id);
       if(fC.length>0){
        alert("Juego ya agregado al carrito anteriormente!")
       }else{
         dispatch(addToCart(id)) // dispacha al carrito de compras con el id del game en la db
       }
    }else if(e.target.value==="remove"){
      dispatch(removeFromCart(id))
    }
}

  cart.forEach(e=>{if(e===id){foundCart=true}})

  return (
    <div>
      {
        <div class="card hover-overlay hover-zoom" style={{ maxWidth: "18rem", marginBottom: '25px', maxHeight: '18rem' }}>
          <Link  to={price?`/detail/${id}`:`/home`}>
            <img class="card-img-top" style={{ maxWidth: '18rem', maxHeight: '10rem' }} src={img} alt="product img" />
          </Link>
          <div class="card-body" >
            <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
              <h6 class="card-title">{name}</h6>
            </Link>
            {/* <div class="ratings">
              <svg aria-hidden="true" class="fa fa-star rating-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" class="fa fa-star rating-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" class="fa fa-star rating-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><tit<Navlink></Navlink>le>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" class="fa fa-star rating-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg aria-hidden="true" class="fa fa-star rating-color" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{rating}</span>
            </div> */}

            {/* <input type="image" onClick={(e)=>handleClick(e)} value="favourite"  src={heart} class="m-2" style={{width:"2vw", filter:`${brigthness}`}}  alt="heart"/> */}
            <FavouriteButton id={id}/>
            {price?
            
            <span class="card-text m-4 bg-secondary p-2 text-light">
              ${price}
              </span>
              :<span>No stock</span>}
            <button disabled={price?false:true} onClick={(e) => handleClick(e)} value="cart" class="btn btn-primary">Carrito</button>
            {foundCart&&<button onClick={(e) => handleClick(e)} type="button" class="btn-close" value="remove" aria-label="Close"></button>}
          </div>
        </div>

      }

    </div>)
}

