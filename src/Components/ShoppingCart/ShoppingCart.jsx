import "./ShoppingCart.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import Checkout from '../Checkout/Checkout'
import ProductCard from "../Cards/ProductCard/ProductCard";
import { addToCart, getAllProducts } from "../../redux/actions";
import { Link } from "react-router-dom";
import { REACT_APP_URL } from "../CreateUser/CreateUserHelper";

export default function ShoppingCart() {
    let cart = useSelector(state => state.cart);
    let games = useSelector(state => state.products2);
    let users = useSelector(state => state.users);
    let filterGames = [];
    let [cartLS, setCartLS] = useState([]);
    let fg;
    let gamesCO;
    let forCheckout;
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts())
        let cartLS2 = JSON.parse(localStorage.getItem("cart"));
        //localStorage.setItem('cart',JSON.stringify(cart));
        if (cart.length < 1 && cartLS2 !== null) {
            console.log(cartLS2)
            cartLS2.forEach(e => dispatch(addToCart(e)));
        }
        if (cartLS2) {
            setCartLS(cartLS2)
        }
    }, [dispatch])

    useEffect(() => {

    }, [cart])


    cartLS !== undefined && (cartLS.forEach(LS => {
        fg = games.filter(games => LS === games.id);
        console.log(fg)
        if (fg.length > 0) {
            filterGames.push(fg[0])
        }
    }
    ))

    //arreglo vacio. 
    if (!cartLS && cart.length > 0) {
        cart.forEach(e => {
            fg = games.filter((f) => e === f.id)
            filterGames.push(fg[0])
        })
    }


    if (filterGames.length > 0) {
        gamesCO = filterGames.map(e => {
            return {
                title: e.name,
                unit_price: e.price,
                quantity: 1
            }
        })
        forCheckout = {
            items: gamesCO,
            back_urls: {
                "success": "http://localhost:8080/feedback",
                "failure": "http://localhost:8080/feedback",
                "pending": "http://localhost:8080/feedback"
            },
            auto_return: "approved",
        };



    let string_user_id;
        if(users.user){
            string_user_id = JSON.stringify(users.user.id)
            string_user_id = string_user_id + "/"
            const carro = cart.map(e => e).join('*')
            string_user_id = string_user_id + carro
        }


        forCheckout = {
            items: gamesCO,
            external_reference: `${users.user?string_user_id:null}`, //el id de cada orden
            back_urls: {
                "success": `${process.env.REACT_APP_URL}cart/feedback`,
                "failure": `${process.env.REACT_APP_URL}cart/feedback`, //cambiar a mensaje de error
                "pending": `${process.env.REACT_APP_URL}cart/feedback` //x2
            },
            auto_return: "approved",
        };
    };

    console.log(forCheckout)

    return (
        <div class="d-flex flex-column vh-100  align-items-center">
            <div class="alert alert-dark w-50">
                <h1>My shopping cart</h1>
            </div>
            <div class="d-flex flex-row justify-content-evenly flex-wrap">
                {filterGames.length > 0 ?
                    (filterGames.map(e => (
                        <div class="d-flex m-2">
                            <ProductCard id={e.id} name={e.name} img={e.background_image} rating={e.rating} platforms={e.platforms} price={e.price}
                                inStock={e.inStock} />
                        </div>
                    ))) : <h4>No products yet... </h4>
                }
            </div>
            <div>
                {users.user ?
                    <div>
                        <h1 class="text-light">Pay with MercadoPago</h1>
                        {forCheckout && <Checkout games={forCheckout} />}
                    </div> :
                    <Link to="/login">
                        <h2>You must be logged in..</h2>
                    </Link>

                }

            </div>
        </div>
    )
}
