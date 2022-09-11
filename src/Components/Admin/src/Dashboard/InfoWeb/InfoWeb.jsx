import React from 'react'
import style from './infoweb.module.css'

export default function InfoWeb({items}) {

  
  const baneados = items.allUsers.filter(e => e.isBanned === true)
  const Admin = items.allUsers.filter(e => e.isAdmin === true)
  
  return (
    <div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Registered users</div>
            <div class="card-body text-secondary">
                <h3 class="card-text">{items.allUsers.length}</h3>
            </div>
        </div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Users Banned</div>
            <div class="card-body text-secondary">
                <h3 class="card-text">{baneados.length}</h3>
            </div>
        </div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Admins</div>
            <div class="card-body text-secondary">
                <h3 class="card-text">{Admin.length}</h3>
            </div>
        </div>
    </div>
  )
};
