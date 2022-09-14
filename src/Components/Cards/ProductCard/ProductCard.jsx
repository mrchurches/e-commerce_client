import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, removeFromCart, removeWish, addWish, /* getScreenShots */ } from '../../../redux/actions.js' // CREAR UNA ACTION QUE DEPLOYE FAVORITO AL USUARIO

import './ProductCard.css'
import FavouriteButton from '../../FavouriteButton/FavouriteBurron.jsx'
import Swal from 'sweetalert2'
import { isDisabled } from '@testing-library/user-event/dist/utils/index.js'
import xboxImg from '../../../images/Xbox.png'
import playStation from '../../../images/PlayStation.png'
import pc from '../../../images/PC.png'
import shoppingCard from '../../../images/shopping-cart.png'




export default function ProductCard({ id, id_api, name, img, rating, platforms, price, fromApi, isDisabled, genres }) {
  let cart = useSelector(state => state.cart);
  /* let screenShots = useSelector(state => state.screenShots) */
  let foundCart = false;   //aca encontraria el juego si esta agregado al carrito
  const dispatch = useDispatch()


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  useEffect(() => {

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(localStorage.getItem("cart"))

  }, [cart]);

  /*  useEffect(() => {
     dispatch(getScreenShots(id_api))
   },[])
   console.log(screenShots) */



  const handleClick = (e) => {
    e.preventDefault();
    console.log("HICISTE CLICK")
    if (e.target.value === "cart") {

      let fC = cart.filter(e => e === id);
      if (fC.length > 0) {
        alert("Juego ya agregado al carrito anteriormente!")
      } else {
        dispatch(addToCart(id)) // dispacha al carrito de compras con el id del game en la db
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Succesfully added to your cart',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else if (e.target.value === "remove") {

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your product has been deleted from the cart.',
            'success'
          );
          dispatch(removeFromCart(id))
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your product is still in the cart ',
            'error'
          )
        }
      })
    }
  }


  cart.forEach(e => { if (e === id) { foundCart = true } })


  return (
    <div class=''>
      {

        /*<div class="card hover-overlay hover-zoom" style={{ maxWidth: "18rem", marginBottom: '25px', maxHeight: '18rem' }}>
          <Link to={fromApi || isDisabled ? `/home` : `/detail/${id}`}>*/

        /*  <div class="card hover-overlay hover-zoom" style={{ maxWidth: "18rem", marginBottom: '25px', maxHeight: '18rem' }}>
           <Link  to={fromApi || isDisabled ?`/home`:`/detail/${id}`}>
             <img class="card-img-top" style={{ maxWidth: '18rem', maxHeight: '10rem' }} src={img} alt="product img" />
           </Link>
           <div class="card-body" >
             <Link to={fromApi || isDisabled ? `/home` : `/detail/${id}`} style={{ textDecoration: "none" }}>
               <h6 class="card-title">{name}</h6>
             </Link>
             <div class="d-flex flex-row align-items-center justify-content-center">
               <FavouriteButton id={id} />
               <div>
                 {isDisabled || fromApi ?
                   <span>No stock</span> :
                   <span class="card-text bg-secondary m-2 p-2 text-light">
                     ${price}
                   </span>}
                 </div>
                 <div>
                   <button disabled={fromApi || isDisabled?true:false} onClick={(e) => handleClick(e)} value="cart" class="btn btn-primary">Cart</button>
                 </div>
               {foundCart&&<button onClick={(e) => handleClick(e)} type="button" class="btn-close" value="remove" aria-label="Close"></button>}
             </div>
           </div>
         </div> */
      }


      {
        <div class="card-body" style={{ width: '35rem', height: '15rem' }}>

          <div>
            <h6 class=" titleBg card-header d-flex justify-content-between ">{name} <FavouriteButton id={id} /> </h6>
          </div>

          <div class="card ">
            <Link class='decoration' to={fromApi || isDisabled ? `/home` : `/detail/${id}`}>
              <div class="d-flex justify-content-between">
                <img class="card-img-top d-flex justify-content-start" style={{ maxWidth: '15rem', maxHeight: '12rem' }} src={img} alt="product img" />
                <div>

                  {/* <span class="card-text bg-secondary m-2 p-2 text-light">
                  {rating}
                  </span> */}
                  {isDisabled || fromApi ?
                    <span>No stock</span> :
                    <h6 class="card-text bg-secondary decoration ">
                      Price: ${price}
                    </h6>
                  }
                  <div /* class="d-flex justify-content-between" */>
                    <img src={xboxImg} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px", marginLeft: "15px" }} />
                    <img src={playStation} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px" }} />
                    <img src={pc} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px" }} />
                    <img src={pc} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px" }} />
                  </div>
                </div>
              </div>
            </Link>

            <div class='d-flex justify-content-between mt-1 '>

              <p class='d-flex justify-content-start '>
                {genres.map((e, index) => <p key={index} class=" bg-secondary text1 d-flex p-1 justify-content-center bg-secondary m-1 mt-1">{e.name}</p>)}
              </p>

              <div>
                <button disabled={fromApi || isDisabled ? true : false} onClick={(e) => handleClick(e)} value="cart" class="bg-secondary text1 p-2"><img src={shoppingCard} alt="" style={{ maxWidth: '1.3rem', maxHeight: '1.3rem' }} /></button>
              </div>
            </div>


            {/*   */}

            <div class="d-flex flex-row align-items-center justify-content-center">

              {foundCart && <button onClick={(e) => handleClick(e)} type="button" class="btn-close" value="remove" aria-label="Close"></button>}
            </div>
          </div>

        </div>
      }
    </div>)

}