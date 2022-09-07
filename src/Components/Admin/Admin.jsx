import React from 'react'
import Options from './src/Options/Options.jsx'
import InfoContainter from './src/infoContainter/infoContainter.jsx'
import styles from './admin.module.css'
import { useState, useEffect } from "react";

export default function Admin() {
  const [render, setRender] = useState({ 
    dash: true,
    add: false,
    edit: false,
    user: false,
  });

  return (
    <div class='d-flex'>
        <div className={styles.options}>
        <Options render={render} setRender={setRender}/>
        </div>
        <div className={styles.infocontainer}>
        <InfoContainter render={render}/>
        </div>
    </div>
  )
}
