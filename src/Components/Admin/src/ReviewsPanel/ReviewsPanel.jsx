import React from 'react'
import axios from 'axios';
import style from './ReviewsPanel.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllProducts, filterByGenres, filterByPlatforms, addRemoveReview } from '../../../../redux/actions.js'
import { products } from '../../../../redux/products.js'
import SearchBar from '../../../SearchBar/SearchBar'
import { Link } from 'react-router-dom'
const {REACT_APP_URL} = process.env;

function ReviewsPanel({setRender, render}) {

    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch()
    const [load, setLoad] = useState([]);

    const goBack = () => {
        setRender({user: true});
    }
    
    var username = render.username;
    var color = 'white'

    useEffect(() => {
        setTimeout(() => {
          axios.get(`${REACT_APP_URL}reviews?username=${username}`)
          .then(res => setReviews(res.data))
          .catch(err => console.log(err))
        }, "500");
    }, [username])

    function handleSwitch(e, review){
        var action = 'add'
        if (!review.reported) {
            action = 'remove'
        }
        dispatch(addRemoveReview({typeOfEdit:action, id: review.id}))
        setTimeout(() => {
            axios.get(`${REACT_APP_URL}reviews?username=${username}`)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err))
        }, "500");
    }

  return (
    <div class='container' className={style.bigContainer}>
      
        <button value='test' class="btn btn-secondary" type="button" aria-expanded="false" style={{ marginBottom: '15px'}} onClick={goBack} className={style.goBack}>Go Back</button>
        
        <div className={style.container}>
        <h2 class='mb-4'>{username.charAt(0).toUpperCase() + username.slice(1)}'s Reviews</h2>
        <div className={style.reviewsContainer}>
        {reviews && reviews.map((review) => {
            if (color === 'white') {
                color = 'rgba(140, 144, 147, 0.138)'
            }else{color = 'white'}
            return(
            <div className={style.review} style={{backgroundColor:  color}} class='d-flex'>
                <div className={style.description}><p>{review.description}</p></div>
                <div className={style.remove}>

                    {/* <div className={style.isDisabled} onClick={(e) => handleSwitch(e, review)}>
                            <div className={style.enabled}>disable</div>
                
                            <input type="checkbox" checked={review.reported}/>
                       
                    </div> */}


                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => handleSwitch(e, review)} checked={review.reported}/>
                    <label class="form-check-label" for="flexCheckDefault">
                    disable
                    </label>
                    </div>


                </div>
            </div>
            )
        })}
        </div>
        </div>

    </div>
  )
}

export default ReviewsPanel