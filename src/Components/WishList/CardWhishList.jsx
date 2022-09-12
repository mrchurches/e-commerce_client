import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeWish, addToCart, removeFromCart } from '../../redux/actions';
import { deleteFavorite } from '../FavouriteButton/FavoriteButton';
import Swal from 'sweetalert2';

export default function CardWhishList({ id, name, background_image }) {
    const wishList= useSelector(state => state.wishlist);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    const token = sessionStorage.getItem('token'),
        [inShopCart, setInShopCart] = useState(false),
        cart = useSelector(state => state.cart),
        dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        const cartLS = JSON.parse(localStorage.getItem("cart"));
        for (const e of cartLS) {
            if (e === id) {
                setInShopCart(true)
                return
            }
        }
        setInShopCart(false)
    })

    useEffect(() => {
        console.log(wishList)
    },[wishList])

    async function handleClose() {
        dispatch(removeWish(id));
        await deleteFavorite(id, token);
        window.location.reload()
    }

    function handleShopCart(e) {
        if (e.target.id === 'addShop') {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Succesfully added to your cart',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(addToCart(id));
        } else {
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
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            })
        }
    }
    return (
        <div class="list-group-item list-group-item-action gap-3" aria-current="true">
            <button onClick={() => handleClose()} type="button" class="btn-close " aria-label="Close"></button>
            <Link to={'/detail/' + id} class="list-group-item gap-3" aria-current="true" >
                <div style={{ width: "20rem" }}>
                    <h2>{name}</h2>
                    <img src={background_image} class="card-img-top img-thumbnail" alt={name} />
                    <br />
                </div>
            </Link>
            {inShopCart ?
                <small id='deleteShop' class="btn btn-danger flex-end " onClick={(e) => handleShopCart(e)}>Delete to Shopping Cart.</small> :
                <small id='addShop' class="btn btn-primary flex-end " onClick={(e) => handleShopCart(e)}>Add to Shopping Cart.</small>}
        </div>
    );
};
