import React, { useState } from 'react'
import styles from './dashboard.module.css'
import InfoWeb from './InfoWeb/InfoWeb.jsx'
import InfoSales from './InfoSales/InfoSales.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getAllProducts, getGenres, getPlatforms, getAllUsers, getAllorders } from '../../../../redux/actions.js'
import LineChart from '../Dashboard/InfoSales/LineChart.jsx'
import BarChart from "../Dashboard/InfoSales/BarChart.jsx";
import PieChart from "../Dashboard/InfoSales/PieChart.jsx";
import DoughnutChart from "../Dashboard/InfoSales/DoughnutChart.jsx";
import Tables from "../Dashboard/InfoSales/Tables";

export default function Dashboard() {

  const items = useSelector((state) => state)
  const [screen, setScreen] = useState(false);
  
  useEffect(() => {
    setScreen(window.screen.width <= 950 ? true : false)
  });
  // console.log("🚀 ~ file: Dashboard.jsx ~ line 17 ~ Dashboard ~ items", items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getGenres())
    dispatch(getPlatforms())
    dispatch(getAllUsers())
    dispatch(getAllorders())
  }, [dispatch])

  return (

    <div class={"col"} style={{ backgroundColor: 'rgb(238, 245, 246)' }} className={styles.container}>

      <div className={styles.iScontainer}>
        <h3> Info Sales </h3>
        <InfoSales items={items} />
      </div>

      <div className={styles.iScontainer}>
        <h3> Info Web </h3>
        <InfoWeb items={items} />
      </div>

      <div >
        <LineChart />
        <BarChart />
        <PieChart />
        <DoughnutChart />
      </div>

      <div>
        <Tables />
      </div>
    </div>




  )
};