import React from 'react'


function Optios({setRender}) {
  
  function handleClick(e) {
    e.preventDefault();
    if(e.target.value === 'dash'){
      setRender({dash: true})
    }else if(e.target.value ===  'add'){
      setRender({add: true})
    }else if(e.target.value === 'edit'){
      setRender({edit: true})
    }else if(e.target.value === 'user'){
      setRender({user: true})
    }
  }

  return (
    <div>
      <button value='dash' class="btn btn-secondary mt-4 mb-3 btn-sm" type="button" aria-expanded="false"  onClick={(e) => {handleClick(e)}}>
          Dashboard
      </button>
      <div class="dropdown1">
        <button class="btn btn-secondary dropdown-toggle mb-3 btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Products
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li style={{ cursor: 'pointer'}}><button class="dropdown-item tx-sm" onClick={(e) => {handleClick(e)}} value='add'>Add a new game</button></li>
          <li style={{ cursor: 'pointer'}}><button class="dropdown-item tx-sm" onClick={(e) => {handleClick(e)}} value='edit'>Edit Product</button></li>
        </ul>
      </div>
      <button class="btn btn-secondary btn-sm" type="button" aria-expanded="false" onClick={(e) => {handleClick(e)}} value='user'>
          Users
      </button>
    </div>
  )
}

export default Optios