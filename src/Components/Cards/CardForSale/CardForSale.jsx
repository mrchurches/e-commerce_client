import React from 'react'
import { Link } from 'react-router-dom'


function CardForSale(props) {
  return (
    <Link to={`/RUTA PARA BUSCAR POR EL DETALLE DEL JUEGO/${props.id}`}> 
        <div>
            <p>{props.name}</p>
            <img src={props.img} alt="Not Found"/>
            <p>{props.price}</p>
            <p>{"PROPS.OFERTAS"}</p>
        </div>
    </Link>
  )
}

export default CardForSale