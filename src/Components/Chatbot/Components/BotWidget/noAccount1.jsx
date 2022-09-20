import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./linkTohome.css"

export default function NoAccount0 (props){
    console.log(props)

    return(<div className="link">
    <Link to="/create_user">
        <button type="button" class="btn btn-dark">Registrarse!</button>
    </Link>
    </div>) 
}