import React from 'react'
import axios from 'axios';
import style from './editProducts.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllProducts, filterByGenres, filterByPlatforms } from '../../../../redux/actions.js'
import { products } from '../../../../redux/products.js'
import SearchBar from '../../../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
const {REACT_APP_URL} = process.env;

function EditProducts({setRender, setGame}) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const handleClick = (event) => {
    event.preventDefault()
    /*setTimeout(() => {
      axios.get(`${REACT_APP_URL}videogames/${id}`)
        .then(res => setGame(res.data))
        .catch(err => console.log(err))
    }, "500");*/
  };

  const filterPlatforms = (event) => {
    event.preventDefault()
    console.log(event.target.value)
     dispatch(filterByPlatforms(event.target.value))
  };

  const filterGenre = (event) => {
      event.preventDefault()
      console.log(event.target.value)
      dispatch(filterByGenres(event.target.value))
  };

  const handleEdit = async (event) => {
    console.log(event.target.id)
    setTimeout(() => {
      axios.get(`${REACT_APP_URL}videogames/${event.target.id}`)
        .then(res => {
          setGame(res.data)
          setRender({dash: false, add: false, edit: false, user: false, editForm: true});
        })
        .catch(err => console.log(err))
    }, "500");
  }


  const products = useSelector((state) => state.products)
  let platforms = [...new Set(products.map(e => e.platforms).flat().map(e => e.name))]
  let genres = [...new Set(products.map(e => e.genres).flat().map(e => e.name))]
  //console.log(products);
  const searchered = useSelector((state) => state.searchered);
  const games = searchered.length ? searchered : products
  console.log(platforms);


  var color = 'white'

  return (
    <div class='container' className={style.bigContainer}>
      
      <h1> Edit Product </h1>
      
      
      <div class='d-flex' style={{justifyContent: 'center'}}><SearchBar button={'admin'}/></div>
      

      <div class='d-flex mb-3 mt-3' style={{justifyContent: 'center'}}>
      {/*<div class="dropdown1">
        <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginBottom: '15px' }}>
          Products
        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {platforms.length && platforms.map((plat, index) => {
            return <li key={index} style={{ cursor: 'pointer' }}>
              <button class="dropdown-item tx-sm"
                onClick={(e) => { filterPlatforms(e) }}
                value={plat}>{plat}
              </button>
            </li>
          })}
        </ul>

        </div>*/}
        <div>
          <select  class="form-select" aria-label="Default select example" style={{ }} onChange={(e) => filterPlatforms(e)}>
            <option value="default">Platforms</option>
            {platforms.length && platforms.map(e => (
              <option key={e.name} value={e}>{e}</option>
            ))}
          </select>
        </div>

      {/*<div class="dropdown2">
        <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginBottom: '15px' }}>
          Genres
        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {genres.length && genres.map((plat, index) => {
            return <li key={index} style={{ cursor: 'pointer' }}>
              <button class="dropdown-item tx-sm"
                onClick={(e) => { filterGenre(e) }}
                value={plat}>{plat}
              </button>
            </li>
          })}
        </ul>

      </div>*/}

      <div>
          <select class="form-select" aria-label="Default select example" style={{marginLeft: '20px' }} onChange={(e) => filterGenre(e)}>
            <option value="default">Genres</option>
            {genres.length && genres.map(e => (
              <option key={e.name} value={e}>{e}</option>
            ))}
          </select>
        </div>

      </div>

      {/*<div className={style.text}>

        <select class="form-select" multiple aria-label="multiple select example" className={style.games}>
          {games.length && games.map((product, index) => {
            return <option
              key={index}
              onClick={(e) => handleClick(e)}
              value={product.id}>
              {product.name}
            </option>
          })};
        </select>

      </div>*/}

      <div className={style.verticalScrollable}>
        {games.length && games.map((product, index) => {
          if (color === 'white') {
            color = 'rgba(140, 144, 147, 0.138)'
          }else{color = 'white'}
            return <div className={style.productName} style={{backgroundColor:  color}} class='d-flex'>
              <div id={product.id} className={style.name} onClick={(e) => handleEdit(e)}>{product.name}</div>
              {product.price ? <div className={style.iconContainer} onClick={(e) => handleEdit(e)}><i id={product.id} class="bi bi-pencil"></i></div> :
              <div className={style.iconContainer} onClick={(e) => handleEdit(e)}><i id={product.id} class="bi bi-plus-circle"></i></div>}
            </div>
        })}
      </div>

      </div>
  )
}

export default EditProducts