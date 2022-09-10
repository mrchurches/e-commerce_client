import Swal from 'sweetalert2'
/* import { getUsers, filter_bannedAdmin, byUserName, bann_unBann} from '../../../../redux/actions' */

export const banUsersss =  (banUser) => {
    Swal.fire({
    title: `What do you want to do with this user "${banUser.username}"?`,
    showDenyButton: true,
    showCancelButton: true, 
    denyButtonText: `Bann or Unbann user`,
    confirmButtonText: 'Make a user Admin',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed /* make admin */) {
  
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: `Are you sure to make admin this user? "${banUser.username}"`,
        text: "You can revert this option later!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, make it admin!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {

        if (result.isConfirmed /* ADMIN */) {
          
          swalWithBootstrapButtons.fire(
            `The user "${banUser.username}" is now a admin`,
            'the user now has this roles: - dkkkdd - jdkddjfk!.',
            'success'
          )
            

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
        
    
    } else if (result.isDenied) {
        
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: `Are you sure to bann this user? "${banUser.username}"`,
          text: "You cant revert this option!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, benned it!',
          cancelButtonText: 'cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed /* BANN */) {
            
            swalWithBootstrapButtons.fire(
              `"${banUser.username} User Banned!`,
              'The User has been banned you can unbann later.',
              'success'
            )

            
           /*  dispatch(bann_unBann({   // DISPACHAR LA ACIÓN PARA BANEAR O DESBANEAR
              typeOfEdit,
              id,
            })) */
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              `The user  "${banUser.username}" still on`,
              'error'
            )
          }
        })
    
      ;  
    }
  })
}