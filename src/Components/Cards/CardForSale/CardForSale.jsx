import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CardForSale.module.css'
import banner from "../../../images/banner.png"
import banner2 from "../../../images/banner2.png"

function CardForSale({ forSale }) {
  return (
    <div className={styles.containerCarr} class="d-flex justify-content-center align-items-center mt-3 w-100">
      <div class={styles.banner}>
        <Link to="/detail/a4bdf7ef-38e9-4b7d-8bc8-9dbc83a64dcd">
          <img src={banner} alt="banner" />
        </Link>
      </div>
      <div class="m-2">
        <button className={styles.button} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" ></span>
        </button>
      </div>


      <div id="carouselExampleCaptions" class="carousel slide w-75 carousel-fade" data-bs-ride="false">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="6" aria-label="Slide 7"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="7" aria-label="Slide 8"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="8" aria-label="Slide 9"></button>
        </div>
        <div class="carousel-inner" className={styles.container}>
          {
            forSale?.map((e, i) => {
              return (
                <div class={`carousel-item ${i === 0 ? "active" : ""} w-100`} >
                  <Link to={`/detail/${e.id}`}>
                    <img className={styles.image} src={e?.background_image} class="d-block w-100 rounded" style={{ maxHeight: '40rem', maxWidth: '100vw' }} alt="..." />
                  </Link>
                  <div class="carousel-caption d-none d-md-block">
                    <h4>{e.name}</h4>
                    <span class={`${styles.spanLanding}`}>On Sale! 50% off</span>
                  </div>
                </div>

              )
            })
          }
        </div>

        {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button> */}
        {/* <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button> */}
      </div>

      <div >
        <button className={styles.button} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
      <div class={styles.banner}>
        <img src={banner2} alt="banner2" />
      </div>
    </div>
  )
}

export default CardForSale