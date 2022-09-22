import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, removeWish, addWish } from '../../redux/actions.js'
import './cardLanding.css'
import FavouriteButton from '../FavouriteButton/FavouriteBurron.jsx'
import Swal from 'sweetalert2'
import { isDisabled } from '@testing-library/user-event/dist/utils/index.js'


export default function CardLanding({ id, name, img, price, fromApi, isDisabled }) {
  let cart = useSelector(state => state.cart);
  const { user } = useSelector(state => state.users);
  const [remove, setRemove] = useState(false);
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

    cart?.length && localStorage.setItem('cart', JSON.stringify(cart));

  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [remove]);

  /*  useEffect(() => {
     dispatch(getScreenShots(id_api))
   },[])

   console.log(screenShots) */



  const handleClick = (e) => {
    e.preventDefault();
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
          dispatch(removeFromCart(id));
          setRemove(true);
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
    <div >

      <div class="card  image" style={{ maxWidth: "18rem", marginBottom: '25px', maxHeight: '18rem' }}>
        <div class="image">
          <Link to={fromApi || isDisabled ? `/home` : `/detail/${id}`}>
            <img class="card-img-top" src={img} alt="product img" />
          </Link>
        </div>
        <div class="card-body" >
          <Link to={fromApi || isDisabled ? `/home` : `/detail/${id}`} style={{ textDecoration: "none" }}>
            <h6 class="card-title">{name.slice(0, 25)} {name.length > 25 ? "..." : ""}</h6>
          </Link>

          <div class="d-flex flex-row align-items-center justify-content-center">
            {user?.id && <FavouriteButton class="heartButton" id={id} />}
            <div>
              {isDisabled || fromApi ?
                <span>No stock</span> :
                <span class="card-text bg-secondary m-2 p-2 text-light">
                  ${price}
                </span>}
            </div>
            <div>
              <button disabled={fromApi || isDisabled ? true : false} onClick={(e) => handleClick(e)} value="cart" class="btn btn-primary">Cart</button>
            </div>
            {foundCart && <button onClick={(e) => handleClick(e)} type="button" class="btn-close" value="remove" aria-label="Close"></button>}
          </div>
        </div>
      </div>

    </div>)

}