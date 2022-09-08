import React from 'react'


function Optios({render, setRender}) {
  
  function handleClick(e) {
    e.preventDefault();
    if(e.target.value === 'dash'){
      setRender({dash: true, add: false, edit: false, user: false,})
    }else if(e.target.value ===  'add'){
      setRender({dash: false, add: true, edit: false, user: false,})
    }else if(e.target.value === 'edit'){
      setRender({dash: false, add: false, edit: true, user: false,})
    }else if(e.target.value === 'user'){
      setRender({dash: false, add: false, edit: false, user: true,})
    }
  }

  return (
    <div>
      <button value='dash' class="btn btn-secondary mr-4 mt-4 btn-sm" type="button" aria-expanded="false" style={{ marginBottom: '15px'}} onClick={(e) => {handleClick(e)}}>
          Dashboard
      </button>
      <div class="dropdown1">
        <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginBottom: '15px'}}>
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