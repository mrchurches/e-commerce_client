import React from 'react'
import style from '../InfoSales/infoSales.module.css'

export default function Tables() {
  return (
    <div>
      <h4> Total sales genres </h4>
      <div class='container-sm' className={style.tablefixed}>
        <div class='row'>
          <table class="table table-striped tabled-striped table-condensend table-fixed table-bordered text-sm">
            <thead>
              <tr class="text-sm">
                <th class="header col-5" scope="col-10">Genre</th>
                <th class="header col-5" scope="col">Amount</th>
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
                <td>Indie</td>
                <td>150 u$d</td>
              </tr>
              <tr >
                <td>others</td>
                <td>150 u$d</td>
              </tr>
              <tr >
                <td>TOTAL:</td>
                <td>1.230 u$d</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <h4>Total sales platforms</h4>

      <div class='container' className={style.tablefixed}>
        <div class='row'>
          <table class="table table-striped tabled-striped table-condensend table-fixed table-bordered text-sm">
            <thead>
              <tr class="text-sm">
                <th class="header col-1" scope="col-10">Genre</th>
                <th class="header col-1" scope="col">Amount</th>
              </tr>
            </thead>
            <tbody  >
              <tr >
                <td>Xbox</td>
                <td>{803} u$d</td>
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
                <td>others</td>
                <td>688 u$d</td>
              </tr>
              <tr >
                <td>TOTAL:</td>
                <td>2.629 u$d</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>



    </div>
  )
}
