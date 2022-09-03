import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addToCart, addWish } from '../../redux/actions';

const URL = "https://e-commerce-api-pf.herokuapp.com/";
/* const URL = "http://localhost:3001/"; */
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
          <div>
          <div id="carouselExampleCaptions" class="carousel slide relative" data-bs-ride="carousel">
  
 {/* /////////////////////////// CARRUSEL */}
  
  <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="0"
      class="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>
  <div class="carousel-inner relative w-full overflow-hidden">
    <div class="carousel-item active relative float-left w-full">
      <img
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
        class="block w-full"
        alt="..."
      />
      <div class="carousel-caption hidden md:block absolute text-center">
        <h5 class="text-xl">First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item relative float-left w-full">
      <img
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
        class="block w-full"
        alt="..."
      />
      <div class="carousel-caption hidden md:block absolute text-center">
        <h5 class="text-xl">Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item relative float-left w-full">
      <img
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
        class="block w-full"
        alt="..."
      />
      <div class="carousel-caption hidden md:block absolute text-center">
        <h5 class="text-xl">Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button
    class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev"
  >
    <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next"
  >
    <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
          </div>
          
        </div>
      )}
    </div>
  )
}

