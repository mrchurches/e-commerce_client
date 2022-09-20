import React from 'react'
import { Link } from 'react-router-dom'

function Orders({orders, games}) {
  return  (

    <div className='testAdminUser m-5 p-5'>
    
    <h2 style={{color:"black"}} >Orders</h2>
    <div class='container' className ='tablefixed1234'>
      <div  class='row'>  
        <table  class="table table-striped tabled-striped table-condensend table-fixed table-bordered text-sm p-3">
          <thead>
                <tr class="text-sm">
                    <th class="header col-1" scope="col-10">Order id</th>
                    <th class="header col-1" scope="col">Game</th>
                    <th class="header col-1" scope="col">Date of purchase</th>
                    <th class="header col-1" scope="col">Price</th>
                </tr>
            </thead>
            <tbody  >
              {
                orders&&orders.map((e,index)=>(
                  <tr key={index}>
                      <td>{e.id}</td>
                      <td><Link to={`/detail/${games[index].id}`}>{e.game_name}</Link></td>
                      <td>{e.createdAt}</td>
                      <td>{e.price}</td>
                  </tr>
                ))
              }
            </tbody>
        </table>
      </div>
    </div>    
  </div>
)
}

export default Orders