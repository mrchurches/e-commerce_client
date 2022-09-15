import React from "react";
import { Link } from "react-router-dom";
import "./linkTohome.css"

export default function ForgottenPassword (props){
    return(<div className="link">
        <Link to="/login/restore">
            <button type="button" class="btn btn-dark">Restaurar contraseña.</button>
        </Link>
    </div>) 
}