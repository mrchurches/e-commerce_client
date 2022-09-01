import React from 'react'
import { Link } from 'react-router-dom'

{/* <Link to={`/RUTA PARA BUSCAR POR EL DETALLE DEL JUEGO/${id}`}> 
<div>
    <img src={img} alt="Not Found" width='300' height='200'/>
    <p>{name}</p>
    <p>Price: {parseInt(Math.random() * 100)} U$d</p>
    <p>{"20% descuento"}</p>
</div>
</Link> */}


function CardForSale({id, name, img,}) {

  return (
     <div /* className='w-full select-none relative' */>
        <img src={img} alt="" />
        <div className='absolute w-full top-1/2 transform -translate-y-1/2 py-2 px-3 flex justify-between items center'></div>
        <button>Next</button>
        <button>Previous</button>
     </div>
  )
}

export default CardForSale