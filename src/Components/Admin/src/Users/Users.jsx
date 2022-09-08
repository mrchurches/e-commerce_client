import React from 'react'
import style from './users.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
/* import { getUsers, filter_bannedAdmin, byUserName} from '../../../../redux/actions' */



export default function Users() {

  const bannedOn = ["Banned", "Admin"]
  const [name, setName] = useState("")

  console.log(name)
  
  const dispatch = useDispatch()
  /* const users = useSelector((state) => state.users) */
  const users = [{
    "id": 1,
    "username": "asdasdasdgmail.com",
    "name": "qweqweqe",
    "lastname": "qweqweqe",
    "email": "asdasdasd@gmail.com",
    "password": "$2b$10$JWESRSYrRz4sf9LOWS4cC.LUixhMLVzadinP5id9YdkZBnavLl8e6",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-07T20:07:22.640Z"
},
{
    "id": 2,
    "username": "holaaaa",
    "name": "holaa",
    "lastname": "holaaa",
    "email": "hola@hotmail.com",
    "password": "$2b$10$v0DFYX5H7D992Efjub5KxeenXg/oQXxjoXQ/HIpmwIVvLBoxEzlUm",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-07T20:41:47.229Z"
},
{
    "id": 3,
    "username": "holaholahola",
    "name": "asd",
    "lastname": "asd",
    "email": "laureano@mail.com",
    "password": "$2b$10$ZhWnwjE1Xgiw2W5dYuWbUOUtbNVltUIivcW/EYBh56yP/6BJfeID6",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-07T20:43:17.546Z"
},
{
    "id": 4,
    "username": "wqdqwqwdq1gmail.com",
    "name": "qwwqdqd",
    "lastname": "qeqwefwef",
    "email": "wqdqwqwdq1@gmail.com",
    "password": "$2b$10$Uk8QENqAx70ucDURm8ogqO.WEjFtTjMIi8UBwa5n1TTMbqpHpYu.a",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-07T20:43:33.020Z"
},
{
    "id": 5,
    "username": "pruebita",
    "name": "prueba",
    "lastname": "prueba",
    "email": "prueba@mail.com",
    "password": "$2b$10$p7SlWDvEnMaqCClRYVEoAOnF7G86YGAwyejCIDlOPriv8Zm83KqP2",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-07T20:44:43.539Z"
},
{
    "id": 6,
    "username": "asdasdasd",
    "name": "asd",
    "lastname": "asd",
    "email": "hola@hola.com",
    "password": "$2b$10$vtESHGGrqkq0VGYUzByTouZGYiATPIDqNVlCOfo9.Xg.c/PU1mMwa",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-07T20:48:27.061Z"
},
{
    "id": 7,
    "username": "mjosuex85",
    "name": "Mario",
    "lastname": "Vidal",
    "email": "mario.josuevp@gmail.com",
    "password": "$2b$10$zJcmEOvd/0puU9NkxdY5iO2wkXE694eG.VUY24JqUULc.BKMkIpbi",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": true,
    "createdAt": "2022-09-07T21:09:23.853Z"
},
{
    "id": 8,
    "username": "aaaaa",
    "name": "a",
    "lastname": "aa",
    "email": "a@mail.com",
    "password": "$2b$10$1Oxzor2ERAfKjmpLQdZm3udzcMQDpev6kLO2mXWOU5HRk4bZTuLsa",
    "profile_pic": "undefined",
    "isBanned": true,
    "isAdmin": false,
    "createdAt": "2022-09-07T21:13:50.368Z"
},
{
    "id": 9,
    "username": "mjosuex8ssss",
    "name": "Juan",
    "lastname": "Perez",
    "email": "makahsa@gmail.com",
    "password": "$2b$10$OgkPXygFKlKppmoe.TWFreUGqmKYXAw8Y1wu91YPBMYXBueozf4WS",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-07T21:16:12.088Z"
},
{
    "id": 10,
    "username": "Linker22",
    "name": "Diego",
    "lastname": "Roldan",
    "email": "diegolucas142@gmail.com",
    "password": "$2b$10$ZEOgRSMSzf5LdaSWF.haeudOI377psk.ihOF4n.dTQsdVM7sgURVS",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": true,
    "createdAt": "2022-09-07T21:35:41.888Z"
},
{
    "id": 11,
    "username": "asdasdasd1gmail.com",
    "name": "adasd",
    "lastname": "asdasd",
    "email": "asdasdasd1@gmail.com",
    "password": "$2b$10$vhyccAl7cbJZMTAdkt6LreJqn3//aSc.O5ckP35g/vCt36DDa4Zja",
    "profile_pic": "undefined",
    "isBanned": false,
    "isAdmin": false,
    "createdAt": "2022-09-08T04:00:05.050Z"
}];



 /*  useEffect(() => {
    dispatch(getUsers())
  },[dispatch]) */


  /* const getUserbyId = (e) => {
    e.preventDefault()
    dispatch(getUsers(e.target.value))
  } */

  function handleChange(e) {
    e.preventDefault();
      setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    /* dispatch(byUserName(name)) */
    setName("")
  }

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
    <div className={style.container}><h5>Users</h5>

 <div class='container'>   

<div class="dropdown1" > 
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
  </div>    

<div class="d-flex">
      <div>
        <form class="d-flex" role="search" onSubmit={handleSubmit}>
          <input class="form-control text-sm " type="search" placeholder="Username..." required aria-label="Search" value={name} onChange={handleChange} />
          <button class="btn btn-secondary btn-sm ml-5" type="submit">Search</button>
        </form>
      </div>
</div>

  
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
    
<div class='container' className ={style.tablefixed}>
  <div  class='row'>  
  <table  class="table table-striped tabled-striped table-condensend table-fixed table-bordered text-sm">
  <thead>
        <tr class="text-sm">
            <th class="header" scope="col">id</th>
            <th class="header" scope="col">User Name</th>
            <th class="header" scope="col">Name</th>
            <th class="header" scope="col">Last Name</th>
            <th class="header" scope="col">E-mail</th>
            <th class="header" scope="col">Banned</th>
            <th class="header" scope="col">isAdmin</th>
        </tr>
    </thead>
    <tbody >
      {users.map((user, index) => {
        return <tr key={index} onClick={(e) => userEdits(e)} >
                  <td>{user.id}</td>
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
</div>    



    </div>
  )
};


