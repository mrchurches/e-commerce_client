import React from 'react'
import AddProducts from './AddProducts.jsx'
import Dashboard from './Dashboard.jsx'
import Users from './Users.jsx'
import CreateGame from '../../CreateGame/CreateGame.jsx'

export default function infoContainter() {
  return (
    <div>
        <Dashboard/>
        <AddProducts/>
        <Users/>
        <CreateGame/>
    </div>
  )
}
