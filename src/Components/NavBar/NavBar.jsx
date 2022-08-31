import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar"
import "./NavBar.css"

const NavBar = () => {
  let location = useLocation();
  
    return (
    <div className='nav'>
        <div>
        <Link to="/">
            <span>E-commerce videogames</span>
        </Link>
        </div>
        <div className='end'>
            <div>
                {location.pathname === "/" &&<SearchBar />}
            </div>
            <div>
            {location.pathname === "/" &&
                <Link to="/shopping_cart">
                        <span>ShopCart</span>
                </Link>
            }
            </div>
            <div>
                <Link to="/login">
                    <span>Login</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar