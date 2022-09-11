import React from 'react'
import style from './infoSales.module.css'
import LineChart from "../InfoSales/LineChart.jsx";

export default function InfoSales({ items }) {


    const cantofProducts = items.products.length

    return (
        <div>

        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Cantida de productos</div>
            <div class="card-body text-secondary">
                <h3 class="card-text">{cantofProducts}</h3>
            </div>
        </div >

        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Ventas totales </div>
            <div class="card-body text-secondary">
                <h3 class="card-text">{cantofProducts}</h3>
            </div>
        </div>


        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Juego más Vendido</div>
            <div class="card-body text-secondary">
                <h3 class="card-text">{cantofProducts}</h3>
            </div>
        </div>

</div>
)
};