import React from 'react'
import ProductCard from '../Cards/ProductCard/ProductCard.jsx'
import CardForSale from '../Cards/CardForSale/CardForSale'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import style from './cardsContainer.module.css'
import { getAllProducts, searchProduct } from '../../redux/actions.js'

const CardContainer = (props) => {

const products = useSelector((state) => state.products)
const searchered = useSelector((state) => state.searchered)

const dispatch = useDispatch()

const [start, setStart] = useState(0)
const [finish, setFinish] = useState(5)

const forSale = products.filter(e => e.released.slice(0, 4) > 2010).slice(4, 8)
const genres = products.filter(e => e.genres.includes("Action")).slice(start, finish)
const platforms = products.filter(e => e.plataforms.includes("PlayStation 5")).slice(start, finish)


useEffect(() => {
    dispatch(getAllProducts())
}, [dispatch,])

  return (

    <section className={style.section}>

    {
      searchered && (
        <div>
             <div className={style.container}>
       {searchered && searchered.map((product, index) => (
             <ProductCard 
                      key={index}
                      name={product.name}
                      img={product.img}
                      /// MOSTRAR PRECIO TAMBIEN
                    />
                    ))} 
        </div>

        </div>
      )
    }

      {
        products && (
          <div>

<div className={style.ForSale}>
       {forSale && forSale.map((product, index) => (
             <CardForSale 
                      key={index}
                      id={product.id}
                      name={product.name}
                      img={product.img}
                    />
                    ))} 
    </div>

    <div className={style.container}>
       {platforms && platforms.map((product, index) => (
             <ProductCard 
                      key={index}
                      id={product.id}
                      name={product.name}
                      img={product.img}
                    />
                    ))} 
    </div>

    <div className={style.container}>
       {genres && genres.map((product, index) => (
             <ProductCard 
                      key={index}
                      id={product.id}
                      name={product.name}
                      img={product.img}
                    />
                    ))} 
    </div>

          </div>
        )
      }

    
  
  </section>
  )
}

export default CardContainer