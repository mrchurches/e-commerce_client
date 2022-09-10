import React from 'react'
import style from './NotFound.css'
import {useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

function validate(location, users){
    console.log(location);
    if (location === "/home") return false;
    if (location.includes('/detail')) return false;
    if (location === '/shopping_cart') return false;
    if (location === '/my_store') return false;
    if (location === '/create_user') return false;
    if (location === '/wish_list') return false;
    if (location === '/account') return false;
    if (location === '/login') return false;
    if (location.includes('/verify')) return false;
    if (location === '/userprofile') return false;
    if (location.includes('/checkout')) return false;
    console.log(users.user)
    if (users && users.user && users.user.isAdmin && location === '/admin') return false
    return true;
}

const NotFound = () => {
    let location = useLocation();
    const users = useSelector(state => state.users);
    let validation = validate(location.pathname, users);
  return (
    <div >
        
        { validation ?
        <div class='notFound'>
        <header class="top-header">
        </header>
        <div>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
        </div>
        <div class="lamp__wrap">
        <div class="lamp">
            <div class="cable"></div>
            <div class="cover"></div>
            <div class="in-cover">
            <div class="bulb"></div>
            </div>
            <div class="light"></div>
        </div>
        </div>
        <section class="error">
        <div class="error__content">
            <div class="error__message message">
            <h1 class="message__title">Page Not Found</h1>
            <p class="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
            </div>
            <div class="error__nav e-nav">
            <a href="/" target="_blanck" class="e-nav__link"></a>
            </div>
        </div>
        </section></div>:null}

    </div>
  )
}

export default NotFound