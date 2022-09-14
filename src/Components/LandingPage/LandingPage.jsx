import React from 'react'
import {useLocation, Route} from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import CardContainer from '../CardsContainers/CardContainer.jsx'
import SideBar from '../SideBar/SideBar.jsx';
import CreateUser from '../CreateUser/CreateUser';
import Login from '../Login/Login';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import MyChatBot from '../Chatbot/chatbot.jsx';
import Chatbot from 'react-chatbot-kit';
import config from '../Chatbot/Config/config.js';
import MessageParser from '../Chatbot/MessageParser/MessageParser.jsx';
import ActionProvider from '../Chatbot/ActionProvider/ActionProvider.jsx';

export default function LandingPage(){
 
 let location = useLocation();
 
  return (
  <div class="bg-slate-300">
  <div class="flex">
      {/* {location.pathname === "/" && <SideBar/>} */}
      {location.pathname === "/" && <CardContainer />}
  </div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
  </div>
)
}