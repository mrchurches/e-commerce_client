import React from 'react'
import { asc, desc, orderRating, orderEsrb } from '../../redux/actions.js'
import {useDispatch, useSelector} from 'react-redux'


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


  return (
    <div class="flex justify-center">
      <div>
        <select>
          <option>Price</option> {/* en ProductCard Recibir la propiedad precio del api */}
                                 {/* Propuesta de filtro rango */}
        </select>
      </div>
      <div>
        <select onClick={(e) => abcOrder(e)}>
        <option disabled={false} value="default">Order by name</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>
      <div>
        <select onClick={(e) => byRating(e)}>
          <option>Rating</option>
          <option>High to Low</option>
          <option>Low to High</option>
        </select>
      </div>
      <div>
        <select>
          <option>Age(ESRB)</option>
          {esrbMock?.map((esrb, index) => {
                  return <option onClick={(e) => esrbContent(e)} key={index}> {esrb} </option>
                 })}
        </select>
      </div>
      <div>
        <select>
          <option>Release date</option> {/* crear filtro de rango */} 
        </select>
      </div>
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