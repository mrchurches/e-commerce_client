import React from 'react'
import style from './infoSales.module.css'
import ChartBar from "../InfoSales/ChartBar.jsx";

export default function InfoSales({ items }) {
console.log("🚀 ~ file: InfoSales.jsx ~ line 5 ~ InfoSales ~ items", items)

    const cantofProducts = items.products.length

    return (
        <div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Cantida de productos</div>
            <div class="card-body text-secondary">
                <p class="card-text">{cantofProducts}</p>
            </div>
        </div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Ventas totales </div>
            <div class="card-body text-secondary">
                <p class="card-text">{cantofProducts}</p>
            </div>
        </div>
        <div class="card border-secondary mb-3" style={{ maxwidth: "18rem;" }}>
            <div class="card-header">Juego más Vendido</div>
            <div class="card-body text-secondary">
                <p class="card-text">{cantofProducts}</p>
            </div>
        </div>

        <div>
            <ChartBar/>
        </div>


            <h6 /* class='text-sm' */> Sales Genres </h6>
        <div class='container-sm' className ={style.tablefixed}>
  <div  class='row'>  
  <table  class="table table-striped tabled-striped table-condensend table-fixed table-bordered text-sm">
  <thead>
        <tr class="text-sm">
            <th class="header col-1" scope="col-10">Genre</th>
            <th class="header col-1" scope="col">Amount</th>
        </tr>
    </thead>
    <tbody>
                <tr >
                  <td>Adventure</td>
                  <td>580 u$s</td>
                </tr>
                <tr >
                  <td>Action</td>
                  <td>350 u$d</td>
                </tr>
                <tr >
                  <td>info</td>
                  <td>150 u$d</td>
                </tr>
                <tr >
                    <td>Total</td>
                    <td>688 u$d</td>
                </tr>
                <tr >
                  <td>info</td>
                  <td>150 u$d</td>
                </tr>
                <tr >
                  <td>info</td>
                  <td>150 u$d</td>
                </tr>
                <tr >
                  <td>info</td>
                  <td>150 u$d</td>
                </tr>
                <tr >
                  <td>info</td>
                  <td>150 u$d</td>
                </tr>
    </tbody>
</table>
</div>
</div>   

<h6>Sales Platforms</h6>

<div class='container' className ={style.tablefixed}>
<div  class='row'>  
<table  class="table table-striped tabled-striped table-condensend table-fixed table-bordered text-sm">
<thead>
<tr class="text-sm">
    <th class="header col-1" scope="col-10">Genre</th>
    <th class="header col-1" scope="col">Amount</th>
</tr>
</thead>
<tbody  >
        <tr >
          <td>Xbox</td>
          <td>800 u$d</td>
       </tr>
       <tr >
          <td>Pc</td>
          <td>450 u$d</td>
       </tr>
       <tr >
          <td>PS 5</td>
          <td>688 u$d</td>
       </tr>
       <tr >
          <td>Total</td>
          <td>688 u$d</td>
       </tr>
       <tr >
          <td>Total</td>
          <td>688 u$d</td>
       </tr>
       <tr >
          <td>Total</td>
          <td>688 u$d</td>
       </tr>
       <tr >
          <td>Total</td>
          <td>688 u$d</td>
       </tr>

</tbody>
</table>
</div>
</div>   




</div>
)
};
