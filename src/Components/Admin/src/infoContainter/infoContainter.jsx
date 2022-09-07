import React from 'react'
import { useState } from "react";
import EditProducts from '../EditProducts/EditProducts.jsx'
import Dashboard from '../Dashboard/Dashboard.jsx'
import Users from '../Users/Users.jsx'
import CreateGame from '../CreateGame/CreateGame.jsx'
import EditForm from '../EditForm/EditForm.jsx'

export default function InfoContainter({render, setRender}) {

  const [game, setGame] = useState({});

  return (
    <div>
      {render.dash && (<Dashboard/>)}
      {render.edit && (<EditProducts setRender={setRender} setGame={setGame}/>)}
      {render.editForm && (<EditForm setRender={setRender} game={game}/>)}
      {render.user && (<Users/>)}
      {render.add && (<CreateGame/>)}
    </div>
  )
}
