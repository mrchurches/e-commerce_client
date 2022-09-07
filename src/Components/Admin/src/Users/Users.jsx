import React from 'react'
import styles from './users.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUsers } from '../../../../redux/actions'



export default function Users() {
  
  const dispatch = useDispatch()
  /* const users = useSelector((state) => state.users) */
  const users = [{id: 1, username:"Mjosuex85",  name: "Mario", lastname: "Vidal", email:"Mario.josuevp@gmail.com", isBanned:false, isAdmin:true},{id: 2, username:"sjdlshds",  name: "Lucas", lastname: "Hernandez", email:"lucas@gmail.com", isBanned:true, isAdmin:false}]

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])

  return (
    <div className={styles.container}><h1>Users</h1>
    
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
    <tbody>
      {users.map((user, index) => {
        return <tr key={index}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.name}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.isBanned}</td>
            <td>{user.isAdmin}</td>
        </tr>
      })}
       
    </tbody>
</table>
    
    </div>
  )
};
