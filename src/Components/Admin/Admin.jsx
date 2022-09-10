import React from 'react'
import Options from './src/Options/Options.jsx'
import InfoContainter from './src/infoContainter/infoContainter.jsx'
import styles from './admin.module.css'
import { useState, useEffect } from "react";

// Usar localStorage o coockies para que al 
// actualizar se quede en el componente acutal

export default function Admin() {

 /*  const [items, setItems] = useState({});

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]); */

  const [render, setRender] = useState({dash: true});

  return (
    <div class='d-flex'>
        <div className={styles.options}>
        <Options setRender={setRender}/>
        </div>
        <div className={styles.infocontainer}>
        <InfoContainter render={render} setRender={setRender}/>
        </div>
    </div>
  )
}
