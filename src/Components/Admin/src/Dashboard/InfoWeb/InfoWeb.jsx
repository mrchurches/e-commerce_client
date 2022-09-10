import React from 'react'
import style from './infoweb.module.css'

export default function InfoWeb({items}) {

  
  const baneados = items.allUsers.filter(e => e.isBanned === true)
  const Admin = items.allUsers.filter(e => e.isAdmin === true)
  
  return (
    <div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Usuarios Registrados</div>
            <div class="card-body text-secondary">
                <p class="card-text">{items.allUsers.length}</p>
            </div>
        </div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Usuarios Baneados</div>
            <div class="card-body text-secondary">
                <p class="card-text">{baneados.length}</p>
            </div>
        </div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Administradores</div>
            <div class="card-body text-secondary">
                <p class="card-text">{Admin.length}</p>
            </div>
        </div>
    </div>
  )
};

