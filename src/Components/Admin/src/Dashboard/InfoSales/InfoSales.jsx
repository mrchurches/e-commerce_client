import React from 'react'
import style from './infoSales.module.css'
import LineChart from "../InfoSales/LineChart.jsx";

export default function InfoSales({ items }) {


    const cantofProducts = items.products.length

    return (
        <div>

        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Quantity of products</div>
            <div class="card-body text-secondary">
                <h4 class="card-text">{cantofProducts}</h4>
            </div>
        </div >

        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Daily sales </div>
            <div class="card-body text-secondary">
                <h4 class="card-text">15.004 u$d</h4>
            </div>
        </div>

        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Monthly sales </div>
            <div class="card-body text-secondary">
                <h4 class="card-text">150.584 u$d</h4>
            </div>
        </div>


        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Best selling game</div>
            <div class="card-body text-secondary">
                <h5 class="card-text">The Witcher 3: Wild Hunt</h5>
            </div>
        </div>

</div>
)
};