import React from 'react'
import { Link } from 'react-router-dom'
import './CardSlider.css'
import ProductCard from '../ProductCard/ProductCard'



function CardSlider({platforms, i}) {
  return (
    
    <div class='container-carr-slide'>
    <div id={`carouselExampleCaptions${i}`} class="carousel slide" data-bs-ride="false">
      <div class="carousel-indicators">
        <button type="button" data-bs-target={`#carouselExampleCaptions${i}`} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        { platforms && platforms?.map((e,i) => {
                    return ( <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={`${i+1}`} aria-label={`Slide ${i+2}`}></button> )
                  }) }
      </div>
      <div className='carr' class="carousel-inner">

        { platforms && platforms.map((product, i) => (
                <div class={`carousel-item ${i === 0 ? "active" : ""}`}>
                    <div className='slideCardContainer'>
                    <div className='slideCard'>
                        <ProductCard
                            key={i}
                            id={platforms[i].id}
                            name={platforms[i].name}
                            img={platforms[i].background_image}
                            rating={platforms[i].rating}
                            price={platforms[i].price}
                        />
                    </div>
                    { i+1 < platforms.length ? 
                    <div className='slideCard'>
                        <ProductCard
                            key={i+1}
                            id={platforms[i+1].id}
                            name={platforms[i+1].name}
                            img={platforms[i+1].background_image}
                            rating={platforms[i+1].rating}
                            price={platforms[i+1].price}
                        />
                    </div>
                    : ''
                    }
                    { i+2 < platforms.length ? 
                    <div className='slideCard'>
                        <ProductCard
                            key={i+2}
                            id={platforms[i+2].id}
                            name={platforms[i+2].name}
                            img={platforms[i+2].background_image}
                            rating={platforms[i+2].rating}
                            price={platforms[i+2].price}
                        />
                    </div>
                    : ''
                    }
                    </div>
                    
                </div>
        ))}
      </div>
    
      <button class="carousel-control-prev" type="button" data-bs-target={`#carouselExampleCaptions${i}`} data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target={`#carouselExampleCaptions${i}`} data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  )
}

export default CardSlider