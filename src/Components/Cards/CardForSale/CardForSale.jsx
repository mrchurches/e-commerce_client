import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CardForSale.module.css'



function CardForSale({forSale}) {
  return (
    <div className={styles.containerCarr} class="d-flex justify-content-center align-items-center mt-3">

      <div class="m-2">
      <button className={styles.button}type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" ></span>
      </button>
      </div>

    
    <div id="carouselExampleCaptions" class="carousel slide w-50" data-bs-ride="false">
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
      <div className='carr' class="carousel-inner">
        {
          forSale?.map((e, i) => {
            return (
              <div class={`carousel-item ${i === 0 ? "active" : ""}`}>
                <Link to={`/detail/${e.id}`}> 
                <img src={e?.background_image} class="d-block w-100 rounded" style={{maxHeight: '40rem', maxWidth: '100vw'}} alt="..." />
                </Link>
                <div class="carousel-caption d-none d-md-block">
                  <h4>{e.name}</h4>
                  <p>On Sale! 50% off</p>
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
  
  <div>
  <button className={styles.button} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
  </div>
  </div>
  )
}

export default CardForSale