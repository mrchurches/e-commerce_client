import React from 'react'
import {Route} from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';
import SideBar from '../SideBar/SideBar.jsx';
import Login from "../Login/Login"
import CreateUser from '../CreateUser/CreateUser.jsx';
// const LandingPage = () => {


//   return (
//     <div>
//       <h1>hola soy landing</h1>
//     {/* <NavBar/>  
//     <SideBar/> */}
//     </div>
//   )
// }

// export default LandingPage

export default function LandingPage(){
  return (
  <div>
    <h1>hola soy landing</h1>
  <NavBar/>  
  {/* <SideBar/> */}
  <Route path="/shopping_cart">
    <ShoppingCart />
  </Route>
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/create_user">
    <CreateUser />
  </Route>
  </div>
)
}