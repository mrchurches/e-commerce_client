import React from 'react'
import ProductCard from '../Cards/ProductCard/ProductCard.jsx'
import CardForSale from '../Cards/CardForSale/CardForSale'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import style from './cardsContainer.module.css'

const CardContainer = (props) => {

const products = useSelector((state) => state.products)

const dispatch = useDispatch()

const [start, setStart] = useState(0)
const [finish, setFinish] = useState(5)


const forSale = products.filter(e => e.released.slice(0, 4) > 2010).slice(4, 8)
const genres = products.filter(e => e.genres.includes("Indie")).slice(start, finish)
const platforms = products.filter(e => e.plataforms.includes("PlayStation 5")).slice(start, finish)


/* useEffect(() => {
    dispatch("FUNCION A DISPATCH")
}, [dispatch,]) */

  return (
    <section className={style.section}>

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
  
  </section>
  )
}

export default CardContainer