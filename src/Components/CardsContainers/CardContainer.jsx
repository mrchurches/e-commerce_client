import React from 'react'
import ProductCard from '../Cards/ProductCard/ProductCard.jsx'
import CardForSale from '../Cards/CardForSale/CardForSale'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import style from './cardsContainer.module.css'

import { getAllProducts, searchProduct, topSeller } from '../../redux/actions.js'


const CardContainer = (props) => {

  const products = useSelector((state) => state.products)
  const searchered = useSelector((state) => state.searchered)
  const AllGenres = /* useSelector((state) => state.genres) */  ["Action", "Adventure", "RPG", "Shooter", "Puzzle"]
  const AllPlataforms = /* useSelector((state) => state.plataforms) */ ["Xbox 360", "macOS", "Xbox One", "PlayStation 3", "PlayStation 5"]
  const years = [2011, 2013, 2014, 2015, 2016, 2017, 2018]
  /* const topSeller = useSelector((state) => state.topSeller()) */ // más vendidos

  const dispatch = useDispatch()

  const [randomGen, SetRandomGen] = useState()
  const [randomPlat, SetRandomPLat] = useState()
  const [randimYear, SetRandomYear] = useState()

  const [start, setStart] = useState(0)
  const [finish, setFinish] = useState(5)
  
const ramGen = () => {
    let randGen = Math.floor(Math.random() * AllGenres.length)
    return AllGenres[randGen]
  };

 const ramPlat = () => {
    let randPlat = Math.floor(Math.random() * AllPlataforms.length)
    return AllPlataforms[randPlat]
  };

  const ramYear = () => {
    let randYear = Math.floor(Math.random() * years.length)
    return years[randYear]
  };


  useEffect(() => {
    SetRandomGen(ramGen())
    SetRandomPLat(ramPlat())
    SetRandomYear(ramYear())
  }, [])

  useEffect(() => {
       dispatch(getAllProducts())
  }, [dispatch,])

  const forSale = products.filter(e => e.released.slice(0, 4) > randimYear).slice(start, finish)
  const platforms = products.filter(e => e.plataforms.includes(randomPlat)).slice(start, finish)
  const genres = products.filter(e => e.genres.includes(randomGen)).slice(start, finish)

  return (

    <section className={style.section}>

      {searchered && (
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
      )}

      

      {products && (
         <div className={style.bigContainer}>

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

          <div className={style.box}>
            <h6> {randomPlat} </h6>
            <div className={style.container}>

              {platforms && platforms.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product.id}
                  name={product.name}
                  img={product.img}
                  rating={product.rating}
                />
              ))}
            </div>
          </div>

          <div className={style.box}>
            <h6> {randomGen} </h6>
            <div className={style.container}>

              {genres && genres.map((product, index) => (
                <ProductCard
                  key={index}
                  id={product.id}
                  name={product.name}
                  img={product.img}
                  rating={product.rating}
                />
              ))}
            </div>
          </div>
      </div>
      )}



    </section>
  )
}

export default CardContainer