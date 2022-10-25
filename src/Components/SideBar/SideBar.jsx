import React, { useState } from "react";
import { getAllProducts, filterByGenres, filterByPlatforms, getGenres, getPlatforms, setCurrentPage, orderEsrb, clear, priceFilter } from '../../redux/actions';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SideBar.css"
import MessageParser from '../Chatbot/MessageParser/MessageParser';
import ActionProvider from '../Chatbot/ActionProvider/ActionProvider';
import config from '../Chatbot/Config/config';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'
import MyChatBot from "../Chatbot/chatbot";

/* const esrbMock = [ "Teen", "Mature", "Not rated", "Adults Only", "Everyone", "Everyone 10+", "Rating Pending" ] */

export default function SideBar() {

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products)
  let genres = [...new Set(products.map(e => e.genres).flat().map(e => e.name))]
  let platforms = [...new Set(products.map(e => e.platforms).flat().map(e => e.name))]
  let esrb = [...new Set(products.map(e => e.esrb_rating))]
  let prices = [...new Set(products.map(e => e.price).sort((a, b) => a - b))]


  let min = prices[0]
  let max = prices[prices.length - 1]

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  // console.log(maxPrice)
  /*   const minprice = (e) => {
      e.preventDefault() 
      setMinPrice(parseInt(e.target.value))
    };
   */
  const hanleChange = (e) => {
    e.preventDefault()
    setMaxPrice(parseInt(e.target.value))
  };

  useEffect(() => {
    setMaxPrice(max)
    setMinPrice(min)
  }, [products])



  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  function handleFilterByGenre(e) {
    e.preventDefault();
    if (e.target.value !== "default") {
      dispatch(filterByGenres(e.target.value));
      dispatch(setCurrentPage(1))
    }
  };

  function handleFilterByPlatforms(e) {
    e.preventDefault();
    if (e.target.value !== "default") {
      dispatch(filterByPlatforms(e.target.value));
      dispatch(setCurrentPage(1))
    }
  };

  function applyPrice(e) {
    e.preventDefault()
    dispatch(priceFilter(maxPrice))
  }

  function esrbContent(e) {
    e.preventDefault()
    let value = e.target.value
    if (value !== "default") {
      /* console.log(value) */
      dispatch(orderEsrb(value))
    };
  };

  function handleClick(e) {
    /*  setMaxPrice(max)
     setMinPrice(min) */
    dispatch(clear())
  };

  return (
    <div class='container_sideBar'>
      <div >
        <small>Genres</small>
        <select class="form-select" aria-label="Default select example" style={{ fontSize:"15px",marginRight: 'auto', marginLeft: 'auto', backgroundColor:"#212529", color: "white"}} onChange={(e) => handleFilterByGenre(e)}>
          <option value="default">Genres</option>
          {genres.length && genres.map(e => (
            <option key={e.name} value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div style={{marginTop: "0.6rem"}}>
        <small>Platforms</small>
        <select class="form-select" aria-label="Default select example" style={{ fontSize:"15px", marginRight: 'auto', marginLeft: 'auto', backgroundColor:"#212529", color: "white"}} onChange={(e) => handleFilterByPlatforms(e)}>
          <option value="default">Platforms</option>
          {platforms.length && platforms.map(e => (
            <option key={e.name} value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div style={{marginTop: "0.6rem"}}>
        <small>ESRB</small>
        <select class="form-select" aria-label="Default select example" style={{fontSize:"15px", marginRight: 'auto', marginLeft: 'auto', backgroundColor:"#212529", color: "white" }} onChange={(e) => esrbContent(e)}>
          <option value="default">ESRB Rating</option>
          {esrb?.map((esrb, index) => (
            <option key={index} value={esrb}> {esrb} </option>
          ))}
        </select>
      </div>

      <div  style={{ width: "185px" }}>
        {maxPrice > 1 ? <label  for='rangeMax' class='text-white form-label fs-6 pt-4'> Under ${maxPrice - 1} </label> : <label for='rangeMax' class='text-white form-label fs-6 pt-4'> {" "}${minPrice}</label>}
        <input  class="form-range" id='rangeMax' value={maxPrice} onChange={(e) => hanleChange(e)} type="range" min={min} max={max} step='10' />
      </div>

      {/* <div>
          <label for='rangeMin' class='text-white form label'> Low Price ${minPrice}</label>
          <input id='rangeMin' class='form-range' onChange={(e) => minprice(e)} type="range" min={min} max={maxPrice} step='1'/>
        </div> */}

      <button class="btn btn-dark w-100" style={{ fontSize:"15px",marginTop: '15px', marginRight: 'auto', marginLeft: 'auto' }} onClick={applyPrice}>Apply Price</button>


      <div className="clear">
        <button class="btn btn-dark w-100" style={{ fontSize:"15px",marginTop: '15px', marginRight: 'auto', marginLeft: 'auto' }} onClick={handleClick}>Reset Filters</button>
      </div>
      <br></br>
      <br />
     {/*  <MyChatBot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      /> */}
    </div>
  )
}
