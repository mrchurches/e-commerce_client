import React from 'react'
import EditProducts from '../EditProducts/EditProducts.jsx'
import Dashboard from '../Dashboard/Dashboard.jsx'
import Users from '../Users/Users.jsx'
import CreateGame from '../CreateGame/CreateGame.jsx'

export default function infoContainter({render}) {

  

  return (
    <div>
      {render.dash && (<Dashboard/>)}
      {render.edit && (<EditProducts/>)}
      {render.user && (<Users/>)}
      {render.add && (<CreateGame/>)}
    </div>
  )
}
