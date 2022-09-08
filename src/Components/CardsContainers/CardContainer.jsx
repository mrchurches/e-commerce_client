import React from 'react'
import ProductCard from '../Cards/ProductCard/ProductCard.jsx'
import CardForSale from '../Cards/CardForSale/CardForSale'
import CardSlider from '../Cards/CardsSlider/CardsSlider.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './cardsContainer.module.css'
import { getAllProducts, getGenres, getPlatforms } from '../../redux/actions.js'
import { Link } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner.jsx'


const CardContainer = () => {

  const Allproducts = useSelector((state) => state.products)
  const searchered = useSelector((state) => state.searchered)
  const AllGenres = useSelector((state) => state.genres).map(e => e.name)
  const AllPlataforms = useSelector((state) => state.platforms).map(e => e.name)

  /* const topSeller = useSelector((state) => state.topSeller()) */ // más vendidos

  const [randomGen, SetRandomGen] = useState("Adventure")
  const [randomPlat, SetRandomPLat] = useState("PC")
  const [randomYear, SetRandomYear] = useState()

  const [start, setStart] = useState(0)
  const [finish, setFinish] = useState(9)

  const years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getGenres())
    dispatch(getPlatforms())
    ramYear()
    /*  ramGen()
     ramPlat() */
  }, [dispatch])

  /* useEffect(() => {
    ramGen()
    ramPlat()
    SetRandomYear(ramYear())
  }, []) */

  /*   const ramGen = async () => {
      let randGen = Math.floor(Math.random() * AllGenres.length)
      const x = await AllGenres[randGen]
      SetRandomGen(x)
    };
  
   const ramPlat = async () => {
      let randPlat = Math.floor(Math.random() * AllPlataforms.length)
      const y = await AllPlataforms[randPlat]
      SetRandomPLat(y)
    }; */

  const ramYear = () => {
    let randYear = Math.floor(Math.random() * years.length)
    const x = years[randYear]
    SetRandomYear(x)

  };

  const forSale = Allproducts.filter((e) => e.released.slice(0, 4) > randomYear).slice(start, finish)
  const genres = Allproducts.filter((c) => c.genres.find((c) => c.name === randomGen)).slice(start, finish)
  const platforms = Allproducts.filter((c) => c.platforms.find((c) => c.name === randomPlat)).slice(start, finish)


  return (

    <section className='section'>
      
        <div className='bigContainer'>

          {Allproducts.length>0?<CardForSale forSale={forSale}/>:<Spinner />}
          
           {platforms.length>0?(<div className={styles.box} >
          <h5 className="text-light"> {randomPlat} </h5>
            <CardSlider platforms={platforms} i={1}/>
          </div>): <Spinner />}

          {genres.length>0?(<div className={styles.box}>
          <h5 className="text-light"> {randomGen} </h5>
            <CardSlider platforms={genres} i={2}/>
          </div>): <Spinner />}

      </div>
      

    </section>
  )
}

export default CardContainer