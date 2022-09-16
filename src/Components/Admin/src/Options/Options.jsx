import React, { useEffect, useState } from 'react'
import styles from './optios.module.css'


function Optios({ setRender }) {
  const [screen, setScreen] = useState(false)

  useEffect(() => {
    setScreen(window.screen.width <= 950 ? true : false)
  })

  function handleClick(e) {
    e.preventDefault();
    if (e.target.value === 'dash') {
      setRender({ dash: true })
    } else if (e.target.value === 'add') {
      setRender({ add: true })
    } else if (e.target.value === 'edit') {
      setRender({ edit: true })
    } else if (e.target.value === 'user') {
      setRender({ user: true })
    }
  }

  return (
    <div class={screen ? "d-flex flex-row justify-content-center" : ""} >
    {/* <div > */}
      {/* <button value='dash' class={"btn btn-secondary mb-3 btn-sm mt-4 mr"} type="button" aria-expanded="false" style={{ maxWidth: '100px', width: '100%' }} onClick={(e) => { handleClick(e) }}> */}
      <button value='dash' class={"btn btn-secondary mb-3 btn-sm me-0 ms-1 mt-3"} type="button" aria-expanded="false" style={{ maxWidth: '100px', width: '100%' }} onClick={(e) => { handleClick(e) }}>
        Dashboard
      </button>
      <div class="dropdown1 pe-2">
        {/* <button class={"btn btn-secondary dropdown-toggle mb-3 btn-sm "} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ maxWidth: '100px', width: '100%' }}> */}
        <button class={"btn btn-secondary dropdown-toggle mb-3 btn-sm mt-3 "} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ maxWidth: '100px', width: '100%' }}>
          Products
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li style={{ cursor: 'pointer', width: '150px' }}><button class="dropdown-item tx-sm" style={{ width: '140px' }} onClick={(e) => { handleClick(e) }} value='add'>Add a new game</button></li>
          <li style={{ cursor: 'pointer' }}><button class="dropdown-item tx-sm" style={{ width: '140px' }} onClick={(e) => { handleClick(e) }} value='edit'>Edit Product</button></li>
        </ul>
      </div>
     {/*  <button class={"btn btn-secondary btn-sm "} type="button" aria-expanded="false" onClick={(e) => { handleClick(e) }} value='user' style={{ width: '100px' }}> */}
      <button class={"btn btn-secondary btn-sm pe-2 me-1 mt-3 mb-3" } type="button" aria-expanded="false" onClick={(e) => { handleClick(e) }} value='user' style={{ width: '100px' }}>
        Users
      </button>
    </div>
  )
}

export default Optios