import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

export default function About (){
let location = useLocation()

var display = 'block'
if (location.pathname === "/admin") {
    display = 'none'
  }

    return(
        <nav class="navbar" style={{ backgroundColor: "rgb(238, 245, 246)", display: display }} className='footer-nav'>
            <div class="container-fluid d-flex justify-content-center">
                <span class="navbar-text">

                    <h6>info@Steamm.com.ar</h6>
                    <h6>(+54 11) 4556 4888</h6>
                    <h6>Scalabrini Ortiz 1822
                        Buenas Aires, Argentina</h6>
                </span>
            </div>
        </nav>
    
    
    )
}