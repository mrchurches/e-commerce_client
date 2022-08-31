import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar"
const NavBar = () => {
  return (
    <div>
        <div>
        <Link to="/">
            <h4>E-commerce videogames</h4>
        </Link>
        </div>
        <div>
            <SearchBar />
        </div>
    </div>
  )
}

export default NavBar