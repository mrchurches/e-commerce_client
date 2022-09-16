import React from "react";
import { Link } from "react-router-dom";
import "./linkTohome.css"

export default function GoHome (props){
    console.log(props)

    return(<div className="link">
        <Link to="/home">
            <button type="button" class="btn btn-dark">Ir al home.</button>
        </Link>
    </div>) 
}