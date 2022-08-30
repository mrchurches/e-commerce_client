import React from 'react'
import ProductCard from '../Cards/ProductCard'
import CardForSale from '../Cards/CardForSale/CardForSale'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const CardContainer = (props) => {

const products = useSelector((state) => state.products)
const dispatch = useDispatch()

useEffect(() => {
    dispatch("FUNCION A DISPATCH")
}, [dispatch,])

  return (
    <>
    <div>
       {products && products.map((product) => {
            <ProductCard 
                id={product.id}
                name={product.name}
                img={product.img}
            />
       })} 
    </div>
  
  </>
  )
}

export default CardContainer