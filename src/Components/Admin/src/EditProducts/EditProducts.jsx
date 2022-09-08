import React from 'react'
import style from './editProducts.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllProducts, filterByGenres, filterByPlatforms } from '../../../../redux/actions.js'
import { products } from '../../../../redux/products.js'

function EditProducts() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const handleClick = (event) => {
    event.preventDefault()
    alert(event.target.value)
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


   const products = useSelector((state) => state.products)
   const platforms = [...new Set(products.map(e => e.plataforms).flat())]
   const genres = [...new Set(products.map(e => e.genres).flat())]

  return (
    <div className={style.container}>

      <h1> Edit Product </h1>
      
      <input type="text" /> Search

      <div class="dropdown1">
        <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginBottom: '15px' }}>
          Products
        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {platforms.map((plat, index) => {
            return <li key={index} style={{ cursor: 'pointer' }}>
              <button class="dropdown-item tx-sm"
                onClick={(e) => { filterPlatforms(e) }}
                value={plat}>{plat}
              </button>
            </li>
          })}
        </ul>

      </div>

      <div class="dropdown2">
        <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginBottom: '15px' }}>
          Genres
        </button>

        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {genres.map((plat, index) => {
            return <li key={index} style={{ cursor: 'pointer' }}>
              <button class="dropdown-item tx-sm"
                onClick={(e) => { filterGenre(e) }}
                value={plat}>{plat}
              </button>
            </li>
          })}
        </ul>

      </div>

      <div className={style.text}>

        <select class="form-select" multiple aria-label="multiple select example">
          {products.map((product, index) => {
            return <option
              key={index}
              onClick={(e) => handleClick(e)}
              value={product.id}>
              {product.name}
            </option>
          })};
        </select>

      </div>

    </div>
  )
}

export default EditProducts