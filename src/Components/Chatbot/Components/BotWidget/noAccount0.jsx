import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./linkTohome.css"

export default function NoAccount1 (props){
    console.log(props)

    return(<div className="link">
    <Link to="/login">
        <button type="button" class="btn btn-dark">Login Here!</button>
    </Link>
    </div>) 
}