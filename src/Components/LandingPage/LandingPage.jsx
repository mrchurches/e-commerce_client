import React from 'react'
import {useLocation, Route} from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import CardContainer from '../CardsContainers/CardContainer.jsx'
import SideBar from '../SideBar/SideBar.jsx';
import CreateUser from '../CreateUser/CreateUser';
import Login from '../Login/Login';
import ShoppingCart from '../ShoppingCart/ShoppingCart';

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
        <Route path="/shopping_cart" component={ShoppingCart} />
        <Route path="/create_user"component={CreateUser} />
        <Route path="/login" component={Login} />
  </div>
)
}