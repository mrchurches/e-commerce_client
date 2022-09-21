import styles from './CardWishList.module.css'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeWish, addToCart, removeFromCart, getUsers } from '../../redux/actions';
import { deleteFavorite } from '../FavouriteButton/FavoriteButton';
import Swal from 'sweetalert2';

export default function CardWhishList({ id, name, price, background_image }) {
    const token = sessionStorage.getItem('token'),
        [inShopCart, setInShopCart] = useState(false),
        [isClose, setIsClose] = useState(false),
        cart = useSelector(state => state.cart),
        dispatch = useDispatch();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

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
    });

    useEffect(() => {
        dispatch(getUsers(token))
    }, [isClose]);

    async function handleClose() {
        dispatch(removeWish(id));
        await deleteFavorite(id, token);
        setIsClose(true)
    };

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
            <div class=" list-group-item  gap-3 createUserContainer m-2" aria-current="true">
                <div class="d-flex w-100 justify-content-between">
                    <button onClick={() => handleClose()} type="button" class="btn-close btn-close-white " aria-label="Close"></button>
                </div>
                <div>
                    <Link to={'/detail/' + id} class="createUserContainer" style={{ textDecoration: 'none' }} aria-current="true" >
                        <img className={styles.imgCard} src={background_image} alt={name} />
                        <h5 class="mb-1" >{name}</h5>
                        {/* <p class="mb-1">Some placeholder content in a paragraph.</p> */}
                    </Link>
                    <small class="tex-muted">${price}</small>
                    <br />
                </div>
                {inShopCart ?
                    <small id='deleteShop' class="btn btn-danger btn" onClick={(e) => handleShopCart(e)}>Delete to Shopping Cart.</small> :
                    <small id='addShop' class="btn btn-info btn" onClick={(e) => handleShopCart(e)}>Add to Shopping Cart.</small>}
            </div>
    );
};
