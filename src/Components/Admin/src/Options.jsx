import React from 'react'


function Optios() {
  
  return (
    <div>
      <div class="dropdown1">
        <button class="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Products
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/admin/create">Add a new game</a></li>
          <li><a class="dropdown-item" href="#">Edit Product</a></li>
        </ul>
      </div>


    </div>
  )
}

export default Optios