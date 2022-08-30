import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar"
const NavBar = () => {
  return (
    <div>
        <div>
        <Link to="/landing">
            <h4>Logo</h4>
        </Link>
        </div>
        <div>
            <SearchBar />
        </div>
    </div>
  )
}

export default NavBar