import React from 'react'
import styles from './dashboard.module.css'
import InfoWeb from './InfoWeb/InfoWeb.jsx'
import InfoSales from './InfoSales/InfoSales.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import {getAllProducts, getGenres, getPlatforms, getAllUsers} from '../../../../redux/actions.js'

export default function Dashboard() {
  
  const items = useSelector((state) => state)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getGenres())
    dispatch(getPlatforms())
    dispatch(getAllUsers())
  },[dispatch])

  return (
    <div className={styles.container}>
      <div>
       <InfoSales items={items}/> 
      </div>
      <div>
        <InfoWeb items={items}/>
      </div>
    
    </div>
  )
};
