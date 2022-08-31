import React from 'react'
import { Link } from 'react-router-dom'


function CardForSale({id, name, img, }) {
  return (
    <Link to={`/RUTA PARA BUSCAR POR EL DETALLE DEL JUEGO/${id}`}> 
        <div>
            <img src={img} alt="Not Found" width='300' height='200'/>
            <p>{name}</p>
            <p>Price: {parseInt(Math.random() * 100)} U$d</p>
            <p>{"20% descuento"}</p>
        </div>
    </Link>
  )
}

export default CardForSale