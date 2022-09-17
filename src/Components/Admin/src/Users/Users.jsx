import React from 'react'
import './users.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
/* import { banUsersss } from './banUser.js' */
import { getAllUsers, filter_bannedAdmin, byUserName, bann_unBann, makeAdmin} from '../../../../redux/actions'
//
export default function Users({setRender}) {
  
  const bannedOn = ["Banned", "Admin", "All"]
  const [name, setName] = useState("")
  
  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers)

  useEffect(() => {
    dispatch(getAllUsers())
  },[])

  const handleBanUser = (e) => { 
    e.preventDefault()

    let id = e.target.abbr
    const banUser = users.find(e => e.id === parseInt(id))

    let adminEdit = banUser.isAdmin
    
    let contidion_admin = adminEdit ? "QUIT this user as admin" : "Add this user an admin"
    let condition_admin2 = adminEdit ? "QUIT" : "ADD"
    let condition_admin3 = adminEdit ? `The user "${banUser.username}" is no longer an admin` : `The user "${banUser.username}" is now an admin`
    let condition_admin4 = adminEdit ? `The user "${banUser.username}" Lost all the roles` : 'the user now has this roles: - dkkkdd - jdkddjfk!.'

    var typeOfEdit = banUser.isBanned
    ? typeOfEdit = "unban"
    : typeOfEdit = "ban"


    
    var contition;
    var contition2;
    
    typeOfEdit === "ban" ? contition = 'BAN' : contition = 'UNBAN' 
    typeOfEdit === "ban" ? contition2 = "and the user lost all de permission to our site" : contition2 = "Is welcome again"
    
    Swal.fire({
      title: `What do you want to do with this user "${banUser.username}"?`,
      showDenyButton: true,
      showCancelButton: true, 
      denyButtonText: contition, 
      confirmButtonText: contidion_admin,

///////////////////////////////// FUNCIÓN SI EL USUARIO PASA A SER ADMINISTRADOR /////////////////////////////   

    }).then((result) => {
      if (result.isConfirmed /* make admin */) {
    
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
      if (typeOfEdit = banUser.isBanned) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Impossible to add this user as admin!',
          footer: `Why do I have this issue? --- in this moment the "${banUser.username}" is banned, for security this option is not allowed`
        })
      };
        
        swalWithBootstrapButtons.fire({
          title: `Are you sure to ${condition_admin2} admin this user? "${banUser.username}"`,
          text: "You can revert this option later!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: `Yes, ${condition_admin2} it admin!`,
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
  
          if (result.isConfirmed /* ADMIN */) {
            dispatch(makeAdmin(id))
            
          
            
            swalWithBootstrapButtons.fire(
              condition_admin3,
              condition_admin4,
              'success'
            )
            let timerInterval
Swal.fire({
  title: 'Making Changes!',
  html: 'I will close in <b></b> segundos.',
  timer: 1500,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }

}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    /* console.log('I was closed by the timer') */
  }
}).then(()=>dispatch(getAllUsers()))

              
  
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'The user is not an admin',
              'error'
            )
          }
        })
  ///////////////////////////////// FUNCIÓN SI EL USUARIO SE QUIERE BANEAR O DESBANEAR /////////////////////////////        
      
      } else if (result.isDenied) {
          
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {   
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: `Are you sure to ${contition} this user? "${banUser.username}"`,
            text: "You can revert this option later!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed /* BANN */) {
              
              swalWithBootstrapButtons.fire(
                ` the user "${banUser.username}" has been ${contition}NED`,
                `${contition2}`,
                'success'
              )
              
              dispatch(bann_unBann({typeOfEdit,id}))
              
              setTimeout(() => {
                dispatch(getAllUsers())
              }, 500);

            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                `The user  "${banUser.username}" still on`,
                'error'
              )
            }
          });  
      }
    })
    
    
    
  };  


    useEffect(() => {
      dispatch(getAllUsers())
    }, [] )


  function handleChange(e) {
    e.preventDefault();
      setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(byUserName(name))
    setName("")
  }

  const filterUsers = (e) => {
    e.preventDefault()
    dispatch(filter_bannedAdmin(e.target.value))
  };

  function viewReviews(user){
    setRender({reviews: true, username: user})
  }

  return (

      <div className='testAdminUser'>
      
      <h2>Users</h2>

      <div class='container d-flex justify-content-center'>   

        <div class="d-flex">
          <div>
            <form class="d-flex" role="search" onSubmit={handleSubmit}>
              <input class="form-control text-sm " type="search" placeholder="Username..." required aria-label="Search" value={name} onChange={handleChange} />
              <button class="btn btn-secondary btn-sm ml-5 mr-3" type="submit">Search</button>
            </form>
          </div>
        </div>

        <div class="dropdown1" className='filtro123'> 
          <button class="btn btn-secondary dropdown-toggle btn-sm row" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginBottom: '15px' }}>
            Filter By ...
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {bannedOn.map((plat, index) => {
              return (
                <li key={index} style={{cursor: 'pointer'}}>
                  <button class="dropdown-item tx-sm"
                    onClick={(e) => { filterUsers(e) }}
                    value={plat}>{plat}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>    

       {/* <div class="dropdown2">
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
                    <button class="dropdown-item tx-sm" onClick={(e) => { ordered(e) }} value={"ID"}> ID
                    </button>
                  </li>
                  <li style={{cursor: 'pointer'}}>
                    <button class="dropdown-item tx-sm" onClick={(e) => { ordered(e) }} value={"name"}>name
                    </button>
                  </li>
              </ul>
        </div> */}

      </div> 
    
      <div class='container' className ='tablefixed1234'>
        <div  class='row'>  
          <table  class="table table-striped tabled-striped table-condensend table-fixed table-bordered text-sm">
            <thead>
                  <tr class="text-sm">
                      <th class="header col-1" scope="col-10">id</th>
                      <th class="header col-1" scope="col">User Name</th>
                      <th class="header col-1" scope="col">Name</th>
                      <th class="header col-1" scope="col">Last Name</th>
                      <th class="header col-1" scope="col">E-mail</th>
                      <th class="header col-1" scope="col">Banned</th>
                      <th class="header col-1" scope="col">isAdmin</th>
                      <th class="header col-1" scope="col">Created At</th>
                      <th class="header col-1" scope="col">Reviews</th>
                      <th class="header col-1" scope="col">Edit</th>
                  </tr>
              </thead>
              <tbody  >
                {users.map((user, index) => {
                  return <tr key={index}  >
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            {user.isBanned === false ? <td> - </td> : <td> ❌ </td>}
                            {user.isAdmin === false ? <td> - </td> : <td> ✔️ </td>}
                            <td>{user.createdAt.slice(0, 10)}</td>
                            <td> <a onClick={(e) => viewReviews(user.id)} className='reviews12345'>Reviews</a> </td> {}
                            <td  abbr={user.id} class="bi bi-pencil"  onClick={(e) => handleBanUser(e)} style={{cursor: 'pointer'}}></td>
                        </tr>
                })} 
              </tbody>
          </table>
        </div>
      </div>    
    </div>
  )
};


