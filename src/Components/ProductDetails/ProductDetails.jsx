import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addToCart, addWish } from '../../redux/actions';
// const URL = "https://e-commerce-api-pf.herokuapp.com/";
const URL = "http://localhost:3001/";
export default function ProductDetails() {
const [game, setGame] = useState({});
const [disabled, setDisabled] = useState(true); // si no esta logueado desabilita addwish
let user = useSelector(state=>state.users); // se trae el usuario logueado para permitir agregar a wishlist
let {id} = useParams();
let dispatch = useDispatch(); 
  useEffect(()=>{
    if(user.length)setDisabled(false); //si cuando se monta el componente hay usuario logueado habilita el addwish
    axios.get(`${URL}videogames/${id}`)
    .then(res=>setGame(res.data))
    .catch(err=>console.log(err))
  },[id, user])
  function handleClick(e){ // eso se ejecuta cuando se le hace click al boton de add to cart o wishlist
    e.preventDefault();
    if(e.target.value==="cart"){
      dispatch(addToCart(game.id)) // dispacha al carrito de compras con el id del game en la db
    }else{
      dispatch(addWish(game.id))
    }
  }

  return (
    <div>
      {game&&(
        <div className='flex'>
          <div>
          <h3 class="font-medium leading-tight text-3xl">
          {game.name}
            <small class="text-gray-500">{game.genres?.map(e=>(
              <span> {e.name} </span>
            ))}</small>
          </h3>
            <h4 class="text-center">{game.description}</h4>
            <h4>Rating: {game.rating}</h4>
            <h4>Metacritic: {game.metacriticRating}</h4>
            <h4>Esrb: {game.esrb_rating}</h4>
            <h4>Released: {game.released}</h4>
            {game.platforms?.map(e=>(
              <span> {e.name} </span>
            ))}
            <h4>${game.price}</h4>
            
            <div class="flex space-x-2 justify-center">
              <button value="cart" onClick={handleClick} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Add to cart
                </button>
            </div>
            <div class="flex space-x-2 justify-center">
              <button value="whish" disabled={disabled} onClick={handleClick} type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Add to wishlist
                </button>
            </div>
                <br/>
                {!user.length&&(<span>You must be login in to add in a wishlist</span>)}
          </div>
          <div>
            <img src={game.background_image} alt="bg-img"/>
          </div>
          
        </div>
      )}
    </div>
  )
}

