import React from 'react'
import { asc, desc, orderRating, orderEsrb, Orderby } from '../../redux/actions.js'
import {useDispatch, useSelector} from 'react-redux'
import styles from './filters.module.css'


function Filters() {

  const class_esrb = useSelector((state) => state.products).map(e => e.esrb_rating)
  
  const newClassEsrb = [...class_esrb]
  let esrbX = newClassEsrb.filter((item,index)=>{
      return newClassEsrb.indexOf(item) === index;
    })

  const esrbMock = [ "Teen", "Mature", "Not rated", "Adults Only", "Everyone", "Everyone 10+", "Rating Pending" ]


  const dispatch = useDispatch()

  function abcOrder(event) {

    event.preventDefault()
    console.log(event.target.value)
      let value = event.target.value
      value === "A-Z" 
      ? dispatch(asc())
      : dispatch(desc())
  }

  
  function byRating(event) {
    event.preventDefault()
    let value = event.target.value
    dispatch(orderRating(value))
  }
  
  function esrbContent(event) {
    event.preventDefault()
    let value = event.target.value
    console.log(value)
    dispatch(orderEsrb(value))
  }
  
  let handlerChange = (e)=>{
    console.log(e.target.value)
    switch(e.target.value){
        case  "A-Z":
            dispatch(Orderby((a, b) => { return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1 })); break //si es menor -1
        case "Z-A":
            dispatch(Orderby((a, b) => { return b.name.toUpperCase() < a.name.toUpperCase() ? -1 : 1 })); break
        case "higher":
            dispatch(Orderby((a,b)=>{return b.rating - a.rating })); break //si el puntaje es menor lo mueve al fondo
        case "lower":
            dispatch(Orderby((a,b)=>{return a.rating - b.rating })); break
        case "Highest_Price":
            dispatch(Orderby((a,b)=>{return b.price - a.price})); break
        case "Lowest_Price":
            dispatch(Orderby((a,b)=>{return a.price - b.price})); break
        default: break;
    };
};

  return (
    <div class="d-flex justify-content-end" style={{marginTop: '15px', marginBottom: '15px'}}>
      <div className={styles.posicion}>
        Sort by:
        <select  onChange={(e) => handlerChange(e)}> {/* propuesta rango de precio */}
        <option disabled={true} value="default">Order by name</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="higher">Higher Rating</option>
          <option value="lower">Lower Rating</option>
          <option value="Lowest_Price">Lowest Price</option>
          <option value="Highest_Price">Highest Price</option>
        </select>
      </div>
      <div>
{/*         <select onChange={(e) => byRating(e)}>
          <option>Rating</option>
          <option>High to Low</option>
          <option>Low to High</option>
        </select> */}
      </div>
      {/* <div>
        <select>
          <option>Release date</option>  
        </select>
      </div> */}
    </div>
  )
}

export default Filters


{/* <div class="flex justify-center"> 
        <div>
            <select className={style.filters} name="" id="">
              <option disabled={false}> Order by...</option>
              <option onClick={(e) => asc_abc(e)}> Name: Asc </option>
              <option onClick={(e) => asc_abc(e)}> Name: Desc </option>
              <option onClick={(e) => orderOrderRating(e)}> Rating: high to low </option>
              <option onClick={(e) => orderOrderRating(e)}> Rating low to high </option>
              <option onClick={(e) => orderPrice(e)}> Price: high to low </option>
              <option onClick={(e) => orderPrice(e)}> Price: Low to high </option>
            </select>

            <select  name="" id="">
                <option> By ERSB...</option>
                  {esrbMock.map((ersb, index) => {
                  return <option onClick={(e) => esrbContent(e)} key={index}> {ersb} </option>
                 })}
            </select>

        </div>
    </div> */}