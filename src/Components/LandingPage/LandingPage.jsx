import React from 'react'
import {Route, useLocation} from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx';
import CardContainer from '../CardsContainers/CardContainer.jsx'
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
 
 let location = useLocation();
 
  return (
  <div>
    <h1>hola soy landing</h1>
  <NavBar/>  
  {location.pathname === "/" && <CardContainer />}
  

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