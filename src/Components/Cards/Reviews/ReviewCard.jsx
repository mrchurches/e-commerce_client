import React, { useEffect, useState } from 'react'
import { Link, NavLink} from 'react-router-dom'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './ReviewCard.module.css'


export default function ReviewCard({username, rating, description, userImg}) {

  //username = 'Michael Holz'
  //description = 'Lorem ipsum dolor sit amet, consec adipiscing elit. Nam eusem scelerisque tempor, varius quam luctus dui. Mauris magna metus nec.'
  //userImg = 'https://www.tutorialrepublic.com/examples/images/clients/5.jpg'
  //rating = 87
  return (
    <div class="col-sm-6" className={style.container}>
      <div class="media d-flex">
        <img src={userImg} class="mr-3" className={style.image} alt=""/>
        <div class="media-body">
          <div class="testimonial" className={style.textContainer}>
            <p>{description}</p>
            <p class="overview" className={style.name} ><b>{username}</b>Rating: {rating}</p>
          </div>
        </div>
      </div>
    </div>
    )
}

