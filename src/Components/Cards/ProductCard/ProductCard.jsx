import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, removeWish, addWish, getUsers } from '../../../redux/actions.js' // CREAR UNA ACTION QUE DEPLOYE FAVORITO AL USUARIO
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
  // const [foundCart, setFoundCart] = useState(false)
  const [isRemove, setIsRemove] = useState(false)
  const dispatch = useDispatch(),
  token = sessionStorage.getItem('token');


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



      <div class="card-body" style={{ width: '35rem', height: '15rem' }}>

        <div class="d-flex justify-content-around mt-2">
          <h6 class=" flex-end card-title justify-content-center fs-5 ">{name} </h6>
          <FavouriteButton class="heartButton" id={id} />
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
                  <img class="platformPic" src={xboxImg} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px", marginLeft: "15px" }} />
                  <img class="platformPic" src={playStation} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px" }} />
                  <img class="platformPic" src={pc} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px" }} />
                  <img class="platformPic" src={pc} style={{ maxWidth: '1.5rem', maxHeight: '1.5rem', marginRight: "15px" }} />
                </div>
                <p class='d-flex justify-content-around pt-4'>
                  {genres?.map((e, index) => <p key={index} class=" bg-transparent text1 d-flex p-1 justify-content-center  ">{e.name}</p>)}
                </p>
                <div>
                  {isDisabled || fromApi ?
                    <span>No stock</span> :
                    <h6 class="card-text  titleBg pt-4 pl-3">
                      Only: ${price}
                      <button disabled={fromApi || isDisabled ? true : false} onClick={(e) => handleClick(e)} value="cart" class=" text1 buttonCart"><img src={shoppingCard} alt="" style={{ maxWidth: '2rem', maxHeight: '2rem' }} /></button>
                    </h6>
                  }
                  {/* </div> */}
                </div>
              </div>
            </div>
          </Link>

          {/* <div class='d-flex fluid-content justify-content-between mt-1 '> */}






          <div class="d-flex flex-row align-items-center justify-content-center">

            {foundCart && <button onClick={(e) => handleClick(e)} type="button" class="btn-close" value="remove" aria-label="Close"></button>}
          </div>
        </div>

      </div>

    </div>)

}