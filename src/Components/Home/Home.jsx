import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { getAllProducts, setCurrentPage } from '../../redux/actions';
import ProductCard from '../Cards/ProductCard/ProductCard';
import Pagination from '../Pagination/Pagination';
import "./Home.css"

function Home() {
let games = useSelector(state=> state.products);
let searchered = useSelector(state=> state.searchered);
let dispatch = useDispatch();
let currentPage = useSelector((state)=> state.currentPage);
let [gamesPerPage, setgamesPerPage] = useState(10);
const indexOfLastGame = currentPage * gamesPerPage;
const indexOfFirstGame = indexOfLastGame - gamesPerPage;
const currentGames = searchered.length? searchered.slice(indexOfFirstGame, indexOfLastGame): games.slice(indexOfFirstGame, indexOfLastGame);
// const [show, setShow] = useState(false);

const paginado = (number) => {
    dispatch(setCurrentPage(number))
}


  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])
    return (
        <div>
            <Pagination currentPage={currentPage} gamesPerPage={gamesPerPage} games={searchered.length? searchered.length : games.length} paginado={paginado}/>
            <div class="flex flex-wrap content-around justify-center">
                {currentGames.length && currentGames.map(e=>(
                    <div >
                        <ProductCard name={e.name} id={e.id_api} img={e.background_image} rating={e.rating} platform={e.platform} />
                    </div>
                ))}
                
            </div>
        </div>
    
  )
}

export default Home