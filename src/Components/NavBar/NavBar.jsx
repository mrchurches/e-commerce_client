import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar"
import "./NavBar.css"

const NavBar = () => {
  let location = useLocation();
  
    return (
    <div class="flex justify-between bg-slate-400 items-center">
        <div class=" hover:text-white">
        <Link to="/">
            <span>E-commerce videogames</span>
        </Link>
        </div>
        <div class='flex items-center'>
            <div class="">
                {location.pathname === "/" &&<SearchBar />}
            </div>
            <div class=" hover:text-white">
            {location.pathname === "/" &&
                <Link to="/shopping_cart">
                        <span>ShopCart</span>
                </Link>
            }
            </div>
            <div class=" hover:text-white">
                <Link to="/login">
                    <span >Login</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar