import React from 'react'
import ProductCard from '../Cards/ProductCard/ProductCard.jsx'
import CardForSale from '../Cards/CardForSale/CardForSale'
import CardSlider from '../Cards/CardsSlider/CardsSlider.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './cardsContainer.module.css'
import { getAllProducts, getUsedGenres, getUsedPlatforms } from '../../redux/actions.js'
import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner.jsx'
import CardLanding from '../CardLanding/CardLanding.jsx'
import banner2 from "../../images/banner2.png"
import downArrow from '../Footer/downArrow.png'
import { shadow } from '@cloudinary/url-gen/actions/effect.js'

const CardContainer = () => {

  const Allproducts = useSelector((state) => state.products)
  const searchered = useSelector((state) => state.searchered)
  /* const AllGenres = useSelector((state) => state.usedGenres).map(e => e.name)
  const AllPlataforms = useSelector((state) => state.usedPlatforms).map(e => e.name) */
  const AllGenres = [...new Set(Allproducts.map(e => e.genres).flat().map(e => e.name))]
  const AllPlataforms = [...new Set(Allproducts.map(e => e.platforms).flat().map(e => e.name))]

  const prueba = ["Puzzle", "Action", "Adventure", "Shooter"]
  const prueba2 = ["PC", "Linux", "Xbox One", "Nintendo Switch"]
  const years = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]

  const [randomGen, setRandomGen] = useState("Puzzle")
  const [randomPlat, SetRandomPLat] = useState("PC")
  const [randomYear, SetRandomYear] = useState()

  useEffect(() => {
    setInterval(() => {
      var genre = prueba[Math.floor(Math.random() * prueba.length)]
       setRandomGen(genre)
    }, 10000);
  },[setInterval])

  useEffect(() => {
    setInterval(() => {
      var plataf = prueba2[Math.floor(Math.random() * prueba.length)]
      SetRandomPLat(plataf)  
    }, 10000);
  },[setInterval])

  const [start, setStart] = useState(0)
  const [finish, setFinish] = useState(9)

  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    ramYear()
  }, [])

  /* useEffect(() => {
    setTimeout(() => {
      SetRandomGen(AllGenres[Math.floor(Math.random() * AllGenres.length)])
      
    }, 2000)
  }, [setTimeout]) */

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

  const forSale = Allproducts.filter((e) => e.released.slice(0, 4) > randomYear)
  const genres = Allproducts.filter((c) => c.genres.find((c) => c.name === randomGen))
  const platforms = Allproducts.filter((c) => c.platforms.find((c) => c.name === randomPlat))
  
  return (
        <div className='d-flex flex-column mb-3'>

          {Allproducts.length>0?<CardForSale forSale={forSale.slice(0,8)}/>:<Spinner />}
          
              {/* Plataforms */}
              {platforms.length>0?(<div className={styles.box} >
              <h5 className="text-light"> Recomended: ({randomPlat}) </h5>
                <CardSlider platforms={platforms} i={1}/>
              </div>): <Spinner />}
              
              {/* Genres */}
              {genres.length>0?(<div className={styles.box}>
              <div ><h5 className="text-light"> Recomended: ({randomGen}) </h5></div>
                <CardSlider platforms={genres} i={2}/>
              </div>) : <Spinner />}

              {/* <img src={downArrow} alt="" width='80' className={styles.btnDown}/> */}
      </div>
  )
}

export default CardContainer
