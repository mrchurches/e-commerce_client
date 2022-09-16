import React from 'react'
import axios from 'axios';
import style from './editProducts.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllProducts, filterByGenres, filterByPlatforms } from '../../../../redux/actions.js'
import { products } from '../../../../redux/products.js'
import SearchBar from '../../../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import styles from "./editProducts.module.css"
const {REACT_APP_URL} = process.env;

function EditProducts({setRender, setGame}) {

  const [render, setRender1] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const addToDb = (event) => {
    event.preventDefault()
    setRender1('game added')
    let add = event.currentTarget.querySelector('#add')
    let icon = add.querySelector('i')
    if (icon.className === 'bi bi-pencil') {
      handleEdit(event)
    }else{
      let loading = event.currentTarget.querySelector('#loading')
      add.style.display = 'none'
      loading.style.display = 'block'
      let sus = event.currentTarget.id
      console.log(sus)
      setTimeout(() => {
        axios.get(`${REACT_APP_URL}videogames/add_api/${sus}`)
          .then(res => {
            console.log(res);
            icon.className = 'bi bi-pencil'
            add.style.display = 'block'
            loading.style.display = 'none'
          })
          .catch(err => {
            console.log(err);
            if (err.response.data === 'Game already in DB') {
              icon.className = 'bi bi-pencil'
              add.style.display = 'block'
              loading.style.display = 'none'
            }else{
              add.style.display = 'block'
              loading.style.display = 'none'
            }
          });
      }, "500");
    }
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
    let id;
    if (event.currentTarget.id) {
      id = event.currentTarget.id
    }else{
      id = event.target.id
    }
    console.log(id)
    setTimeout(() => {
      axios.get(`${REACT_APP_URL}videogames/${id}`)
        .then(res => {
          setGame(res.data)
          setRender({editForm: true});
        })
        .catch(err => console.log(err));
    }, "500");
  }


  const products = useSelector((state) => state.products)
  let platforms = [...new Set(products.map(e => e.platforms).flat().map(e => e.name))]
  let genres = [...new Set(products.map(e => e.genres).flat().map(e => e.name))]
  //console.log(products);
  const searchered = useSelector((state) => state.searchered);
  const games = searchered.length ? searchered : products


  var color = 'black'

  return (
    <div class='container' className={style.bigContainer}>
      
      <h1 className={styles.font}> Edit Product </h1>
      
      
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
              <div id={product.id} className={style.name} style={{color: "black"}} onClick={(e) => handleEdit(e)}>{product.name}</div>
              {!product.fromApi ? <div className={style.iconContainer1} style={{color: "black"}} onClick={(e) => handleEdit(e)}><i id={product.id} class="bi bi-pencil"></i></div> :
              <div id={product.id} className={style.bigIconContainer} style={{color: "black"}} onClick={(e) => addToDb(e)} ><div id='add' className={style.iconContainer} style={{display: 'block'}}><i class="bi bi-plus-circle"></i></div><div id='loading' className={style.ldsDualRing} style={{display: 'none'}}></div></div>}
            </div>
        })}
      </div>

      </div>
  )
}

export default EditProducts