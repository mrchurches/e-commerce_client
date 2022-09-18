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


  const handleClick = (e) => {
    e.preventDefault();
    console.log("HICISTE CLICK")
    console.log(e.target)
    console.log(e.target.name)
    if (e.target.name === "cart") {

      let fC = cart.filter(e => e === id);
      if (owned) {
        Swal.fire({
          icon: 'warning',
          text: 'You already own this game!',
        })
      }else if (fC.length > 0) {
        Swal.fire({
          icon: 'warning',
          text: 'Game is already in cart!',
        })
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




  let platformsArr = []
  if (platforms && platforms.length > 0) {
    let platformsSet = new Set();
    platforms.forEach(e => {
      if (e.name.includes('PlayStation')) platformsSet.add('PlayStation');
      if (e.name.includes('Xbox')) platformsSet.add('Xbox');
      if (e.name === 'PC') platformsSet.add('PC');
    });
    platformsSet.forEach(e => platformsArr.push(e))
  }

  let userOrders = useSelector(state=>state.userOrders);
  let owned = false;
  if (userOrders) {
    let gam = userOrders.filter((e)=> e.game_id === id)
    if (gam.length > 0) {
      owned = true;
    }
  }


  cart.forEach(e => { if (e === id) { foundCart = true } })


  return (
    <div class='bg-transparent cardBigContainer'>
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



      <div class="card-body headerContainer " style={{ width: '35rem', height: '15rem' }}>

        <div class="d-flex  justify-content-between mt-2 headerMatrics   ">
          <div class="mt-2 ">
            <h6 class="card-title fs-5 ">{name} </h6>
          </div>

          <div class="">
            <FavouriteButton class="heartButton" id={id} />
          </div>
        </div>

        <div /*class="card-body "*/>
          <Link class='decoration' to={fromApi || isDisabled ? `/home` : `/detail/${id}`}>
            <div class=" d-flex justify-content-around mt-2 cardBigContainer">
              <img class=" card-img-top d-flex justify-content-start align-items-center max-height-5" style={{ maxWidth: '50%', maxHeight: '10rem' }} src={img} alt="product img" />
              <div>

                {/* <span class="card-text bg-secondary m-2 p-2 text-light">
                  {rating}
                  </span> */}
                <div class="d-flex justify-content-around" >

                  {
                    platformsArr.map((e, i) => {
                      let img;
                      if (e === 'PC') img = pc
                      if (e === 'Xbox') img = xboxImg
                      if (e === 'PlayStation') img = playStation
                      return (
                        <img
                          class="platformPic"
                          style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px", marginLeft: "15px" }}
                          src={img}
                        />
                      )
                    })
                  }

                </div>
                <p class='d-flex justify-content-around pt-4'>
                  {genres.map((e, index) => <p key={index} class=" bg-transparent text1 d-flex p-1 justify-content-center  ">{e.name}</p>)}
                </p>
                <div class="align-items-center">
                  {isDisabled || fromApi ?
                    <span>No stock</span> :

                    (<h6 class="card-text  titleBg pt-4 pl-3">
                      Only: ${price}

                      <div name="cart" onClick={(e) => handleClick(e)}>

                        <button disabled={fromApi || isDisabled ? true : false} class=" text1 buttonCart">
                          <img src={shoppingCard} name="cart" alt="" style={{ maxWidth: '2rem', maxHeight: '2rem' }} /></button>
                      </div>
                    </h6>
                    )
                  }
                  {/* </div> */}
                </div>
              </div>
            </div>
          </Link>


          <div class="d-flex flex-row align-items-center justify-content-center">

            {foundCart && <button onClick={(e) => handleClick(e)} type="button" class="btn-close" value="remove" aria-label="Close"></button>}
          </div>
        </div>

      </div>

    </div>)

}