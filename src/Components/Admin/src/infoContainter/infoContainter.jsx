import React from 'react'
import { useState } from "react";
import EditProducts from '../EditProducts/EditProducts.jsx'
import Dashboard from '../Dashboard/Dashboard.jsx'
import Users from '../Users/Users.jsx'
import CreateGame from '../CreateGame/CreateGame.jsx'
import EditForm from '../EditForm/EditForm.jsx'
import style from './infoContainer.module.css'
import ReviewsPanel from '../ReviewsPanel/ReviewsPanel.jsx';

export default function InfoContainter({render, setRender}) {

  const [game, setGame] = useState({});

  return (
    <div className={style.container}>
      {render.dash && (<Dashboard/>)}
      {render.edit && (<EditProducts setRender={setRender} setGame={setGame}/>)}
      {render.editForm && (<EditForm setRender={setRender} game={game}/>)}
      {render.user && (<Users setRender={setRender}/>)}
      {render.add && (<CreateGame/>)}
      {render.reviews && (<ReviewsPanel setRender={setRender} render={render}/>)}
    </div>
  )
}
