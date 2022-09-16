import React from 'react'
import {useLocation, Route} from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import CardContainer from '../CardsContainers/CardContainer.jsx'
import SideBar from '../SideBar/SideBar.jsx';
import CreateUser from '../CreateUser/CreateUser';
import Login from '../Login/Login';
import ShoppingCart from '../ShoppingCart/ShoppingCart';


export default function LandingPage(){
 
 let location = useLocation();
 
  return (
  <div class="bg-slate-300">
  <div class="flex">
      {/* {location.pathname === "/" && <SideBar/>} */}
      {location.pathname === "/" && <CardContainer />}
  </div>
  </div>
)
}