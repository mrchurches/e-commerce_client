import React, { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar"
import logo from "../../images/logo.png"
import "./NavBar.css"
import { logout } from './NavBarHelper'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUsers, resetUser, addWish, removeFromCart } from '../../redux/actions'

import profilePic from "../../images/profile21.png"

const NavBar = () => {
  let location = useLocation();

  const { user } = useSelector(state => state.users);
  const cart = useSelector(state=>state.cart);
  let dispatch = useDispatch();

  async function handleLogout() {
    window.sessionStorage.removeItem('token');
    await logout()
    localStorage.removeItem("cart");
    if(cart.length>0){
      cart.forEach(id=>dispatch(removeFromCart(id)))
    }
    dispatch(resetUser());
    window.location.reload()
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    token && dispatch(getUsers(token));
  }, [])

var isAdmin = false;

if (user && user.isAdmin) {
  isAdmin = true;
}

  return (
    <nav className="navbar navbar-expand-lg text-light" style={{ backgroundColor: "#191D2A", borderRadius: '0' }}>

      <div class="container-fluid">
        <Link to="/" className='link'>
          <img class="logo" src={logo} />
          <span class="navbar-brand text-light">Games E-commerce</span>
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

            <Link to="/home" className='link'>
              <li class="nav-item">
                <span class="nav-link active text-light" aria-current="page" >Home</span>
              </li>
            </Link>

            {user && !user.isAdmin && (<Link to="/my_store" className='link'>
              <li class="nav-item">
                <span class="nav-link active text-light" aria-current="page" >My store</span>
              </li>
            </Link>)}
            
            {user && !user.isAdmin && (<Link to="/wish_list" className='link'>
              <li class="nav-item">
                <span class="nav-link active text-light" aria-current="page" >Wishlist</span>
              </li>
            </Link>)}
            {user && user.isAdmin ? <Link to="/admin" className='link'>
              <li class="nav-item">
                <span class="nav-link active text-light" aria-current="page" >Admin</span>
              </li>
            </Link> : null}

            { !isAdmin  ?
              <Link to="/shopping_cart" className='link'>
                <li class="nav-item">
                  <span class="nav-link text-light">Shopping Cart</span>
                </li>
              </Link>
            : null }

            {user ?
              (<Link to='/home' className='link'>
                <li class="nav-item">
                  <span onClick={() => handleLogout()} class="nav-link text-light">Logout</span>
                </li>
              </Link>
              ) :
              (<Link to="/login" className='link'>
                <li class="nav-item">
                  <span class="nav-link text-light">Login</span>
                </li>
              </Link>)
            }

            {/* <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
          </ul>
          {user && (<Link to="/userprofile" className='link'>
            <li class="nav-item">
              <small class={"navbar-brand text-light"}>{user.username}</small>
              <img class="logo" src={user.profile_pic} />
            </li>
          </Link>)}
          {location.pathname === "/home" && <SearchBar />}
          {location.pathname.includes('/detail') &&
            <NavLink to="/home">
              <input class="btn btn-secondary" type="button" value="Go Back" />
            </NavLink>}

        </div>
      </div>
    </nav>

    //     <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    //         <div class="container flex flex-wrap justify-between items-center mx-auto">
    //             <Link to="/" class="flex">
    //                 <img src="https://e7.pngegg.com/pngimages/178/595/png-clipart-joystick-game-controllers-video-game-computer-icons-joystick-game-electronics-thumbnail.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
    //                 <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">E-commerce videogames</span>
    //             </Link>

    //     <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
    //       <span class="sr-only">Open main menu</span>
    //       <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    //     </button>
    //     <div class="hidden w-full md:block md:w-auto" id="navbar-default">
    //       <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

    //       <li>
    //             <Link to="/home" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
    //                 <span>Home</span>
    //             </Link>
    //         </li>
    //         <li>
    //             <Link to="/my_store" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
    //                 <span>My store</span>
    //             </Link>
    //         </li>
    //         <li>
    //             <Link to="/wish_list" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
    //                 <span>WhishList</span>
    //             </Link>
    //         </li>
    //         <li>
    //             <Link to="/shopping_cart" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
    //                 <span>ShopCart</span>
    //             </Link>
    //         </li>
    //         <li>
    //             <Link to="/login" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
    //                 <span>Login</span>
    //             </Link>
    //         </li>
    //         <li >
    //             <span class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
    //             {location.pathname === "/home" &&<SearchBar />} 
    //             </span>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  )
}

export default NavBar