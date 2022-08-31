import React from 'react'
import { Link } from 'react-router-dom'


export default function ProductCard({id, name, img}) {

  return (
    <Link to={`/RUTA PARA BUSCAR POR EL DETALLE DEL JUEGO/${id}`}> 
      <div>
        <img src={img} width='200' height='120' alt="Img de video Juego"/>
        <p>{name}</p>
      </div>
  </Link>
  )
}

