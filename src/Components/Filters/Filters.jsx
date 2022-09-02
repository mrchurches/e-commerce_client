import React from 'react'

function Filters() {
  return (
    <div class="flex justify-center">
      <div>
        <select>
          <option>Price</option>
        </select>
      </div>
      <div>
        <select>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>
      <div>
        <select>
          <option>Rating</option>
        </select>
      </div>
      <div>
        <select>
          <option>Age(ESRB)</option>
        </select>
      </div>
      <div>
        <select>
          <option>Release date</option>
        </select>
      </div>
    </div>
  )
}

export default Filters