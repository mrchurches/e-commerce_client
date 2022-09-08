import React from 'react'
import style from './users.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
/* import { getUsers, filter_bannedAdmin} from '../../../../redux/actions' */



export default function Users() {

  const bannedOn = ["Banned", "Admin"]
  
  const dispatch = useDispatch()
  /* const users = useSelector((state) => state.users) */
  const users = [{id: 1, username:"Mjosuex85",  name: "Mario", lastname: "Vidal", email:"Mario.josuevp@gmail.com", isBanned:false, isAdmin:true},{id: 2, username:"sjdlshds",  name: "Lucas", lastname: "Hernandez", email:"lucas@gmail.com", isBanned:true, isAdmin:false},{id: 1, username:"Mjosuex85",  name: "Mario", lastname: "Vidal", email:"Mario.josuevp@gmail.com", isBanned:false, isAdmin:true}]



  useEffect(() => {
    /* dispatch(getUsers()) */
  },[dispatch])

  const filterUsers = (e) => {
    e.preventDefault()
    /* dispatch(filter_bannedAdmin(e.target.value)) */
  };

  const userEdits = (e) => {
    e.preventDefault()
    console.log(e.target)
    alert(e.target.name)
  };

  const ordered= (e) => {
    e.preventDefault()
  }

  return (
    <div className={style.container}><h1>Users</h1>

 <div class='container'>   

{/* <div class="dropdown1" > 
        <button class="btn btn-secondary dropdown-toggle btn-sm row" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginBottom: '15px' }}>
          Filter By ...
        </button>


        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {bannedOn.map((plat, index) => {
            return <li key={index} style={{cursor: 'pointer'}}>
              <button class="dropdown-item tx-sm"
                onClick={(e) => { filterUsers(e) }}
                value={plat}>{plat}
              </button>
            </li>
          })}
        </ul>
  </div>     */}

  
<div class="dropdown2">
        <button class="btn btn-secondary dropdown-toggle btn-sm ml-5" 
                type="button" 
                id="dropdownMenuButton1" 
                data-bs-toggle="dropdown" 
                aria-expanded="false" 
                style={{ marginBottom: '15px' }}>
              Order By...
        </button>
    
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          
            <li style={{cursor: 'pointer'}}>
              <button class="dropdown-item tx-sm" onClick={(e) => { filterUsers(e) }} value={"ID"}> ID
              </button>
            </li>
            <li style={{cursor: 'pointer'}}>
              <button class="dropdown-item tx-sm" onClick={(e) => { filterUsers(e) }} value={"name"}>name
              </button>
            </li>
        </ul>
  </div>   

  </div> 
    
    
    <table class="table table-hover">
  <thead>
        <tr>
            <th>id</th>
            <th>User Name</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Banned</th>
            <th>isAdmin</th>
        </tr>
    </thead>
    <tbody >
      {users.map((user, index) => {
        return <tr key={index} onClick={(e) => userEdits(e)} >
                  <td name={"TUMAMA"}>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  {user.isBanned ? <td>❌</td> : <td> - </td>}
                  {user.isAdmin ? <td> ✔️</td> : <td> - </td>}
               </tr>
      })}
       
    </tbody>
</table>
    </div>
  )
};
