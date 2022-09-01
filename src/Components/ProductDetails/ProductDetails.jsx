import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
const URL = "https://e-commerce-api-pf.herokuapp.com/";
export default function ProductDetails() {
const [game, setGame] = useState({});
let {id} = useParams();
  
  useEffect(()=>{
    axios.get(`${URL}videogames/${id}`)
    .then(res=>setGame(res.data))
    .catch(err=>console.log(err))
  },[id])
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
              <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Add to chart
                </button>
            </div>
            <div class="flex space-x-2 justify-center">
              <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Add to wishlist
                </button>
            </div>
          </div>
          <div>
            <img src={game.background_image} alt="bg-img"/>
          </div>
          
        </div>
      )}
    </div>
  )
}

