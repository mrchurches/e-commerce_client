import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar"
import "./NavBar.css"

const NavBar = () => {
  let location = useLocation();
  
    return (
    // <div class="flex justify-between bg-slate-400 items-center">
    //     <div class=" hover:text-white">
    //     <Link to="/">
    //         <span>E-commerce videogames</span>
    //     </Link>
    //     </div>
    //     <div class='flex items-center'>
    //         <div class="">
    //             {location.pathname === "/" &&<SearchBar />}
    //         </div>
    //         <div class=" hover:text-white">
    //         {location.pathname === "/" &&
    //             <Link to="/shopping_cart">
    //                     <span>ShopCart</span>
    //             </Link>
    //         }
    //         </div>
    //         <div class=" hover:text-white">
    //             <Link to="/login">
    //                 <span >Login</span>
    //             </Link>
    //         </div>
    //     </div>
    // </div>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" class="flex">
                <img src="https://e7.pngegg.com/pngimages/178/595/png-clipart-joystick-game-controllers-video-game-computer-icons-joystick-game-electronics-thumbnail.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">E-commerce videogames</span>
            </Link>
    
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
      <li>
            <Link to="/about" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <span>About</span>
            </Link>
        </li>
        <li>
            <Link to="/my_store" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <span>My store</span>
            </Link>
        </li>
        <li>
            <Link to="/wish_list" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <span>WhishList</span>
            </Link>
        </li>
        <li>
            <Link to="/shopping_cart" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <span>ShopCart</span>
            </Link>
        </li>
        <li>
            <Link to="/login" class="block  py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <span>Login</span>
            </Link>
        </li>
        <li >
            <span class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            {location.pathname === "/" &&<SearchBar />} 
            </span>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default NavBar