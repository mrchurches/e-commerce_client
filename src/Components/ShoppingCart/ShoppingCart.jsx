
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import Checkout from '../Checkout/Checkout'
import { addToCart, getAllProducts, removeFromCart } from "../../redux/actions";
import { Link } from "react-router-dom";
import CartCard from "./CartCard";
import { RandomHelper } from "./RandomHelper";

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
    let totalPrice=0;
    
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
        // console.log(fg)
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

        filterGames.forEach(e=>
            totalPrice = totalPrice + e.price
            )

    };

    function handleAllRemove(){
        cart.forEach(e=> dispatch(removeFromCart(e)));
        window.localStorage.clear();
        window.location.reload();
    }

    console.log(filterGames)
    return (
        <div class="d-flex flex-column align-items-center " >
            <div class="alert alert-dark w-50 m-3">
                <h1>My shopping cart</h1>
            </div>

            {/* Contendio del medio */}
            <div class="d-flex flex-row w-50  justify-content-center">
                {/* <div class="d-flex flex-row justify-content-evenly flex-wrap"> */}
                <div class="d-flex flex-column">
                    {filterGames.length > 0 ?
                        (filterGames.map(e => (
                            <div class="d-flex m-2 w-100">
                                <CartCard
                                id={e.id} name={e.name} img={e.background_image}
                                rating={e.rating} platforms={e.platforms} price={e.price}
                                    />
                            </div>
                        ))) : <div class="w-100 m-3" style={{backgroundColor: "#212529"}}> <h4>No products yet... </h4> </div>
                    }
                </div>
                <div>

                </div>
            </div>
            {/*FIN DEL CONTENDIO DEL MEDIO*/}
            <div class="d-flex flex-column justify-content-between w-50 p-3" style={{backgroundColor: "#212529"}}>
                <div class="d-flex flex-row justify-content-between">
                    <div>
                        <h4>Estimated total</h4>
                    </div>
                    <div>
                        <h4>$ {totalPrice}</h4>
                    </div>
                </div>
            <div>
                {users.user ?
                    <div>
                        {filterGames.length>0 && <h2 class="text-light">Pay with MercadoPago</h2>}
                        {forCheckout && <Checkout games={forCheckout} />}
                    </div> :
                    <Link to="/login">
                       <button type="button" class="btn btn-secondary">You must be logged in to purchase</button>
                    </Link>

                }

            </div>
            </div>
            <div class="d-flex p-2">
                <div>
                    <Link to="/home">
                        <button type="button" class="btn btn-primary">Continue shopping!</button>
                    </Link>
                </div>
                <div>
                <button onClick={(e)=> handleAllRemove(e)} type="button" class="btn btn-primary">Remove all items</button>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center vw100 w-100">
                <div class="p-4">
                    <h4>Maybe you're interested in...</h4>
                </div>
                <div class = "d-flex flex-row flex-wrap justify-content-center">
                    <RandomHelper games={games}/>
                </div>
            </div>
        </div>
    )
}
