import React from 'react'
import style from './ReviewsPanel.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { addRemoveReview, getUserReviews } from '../../../../redux/actions.js'

function ReviewsPanel({setRender, render}) {

    const dispatch = useDispatch()

    const goBack = () => {
        setRender({user: true});
    }

    const reviews = useSelector((state) => state.reviewsUser)
    
    var username = render.username;
    var color = 'white'

    useEffect(() => {
        dispatch(getUserReviews(username));
    }, [username])
    console.log(reviews)
    function handleSwitch(e, review){
        var action = 'add'
        if (!review.reported) {
            action = 'remove'
        }
        let i = reviews.findIndex((e) => e.id === review.id);
        console.log(reviews[i].description)
        dispatch(addRemoveReview({typeOfEdit:action, id: review.id}));
        reviews[i].reported = !review.reported;
        setTimeout(() => {
            dispatch(getUserReviews(username));
        }, "500");
    }

    // function filterDisabled(e){
    //     if(e.target.value === 'disabled'){
    //         let filtRev = reviews.filter((e) => e.reported);

    //     }
    // }

  return (
    <div class='container' className={style.bigContainer}>
      
        <button value='test' class="btn btn-secondary" type="button" aria-expanded="false" style={{ marginBottom: '15px'}} onClick={goBack} className={style.goBack}>Go Back</button>
        
        <div className={style.container}>
        {/* <div class='d-flex justify-content-center'> */}
        <h2 class='mb-4'>{username.charAt(0).toUpperCase() + username.slice(1)}'s Reviews</h2>

        {/* <div>
          <select class="form-select " aria-label="Default select example" className={style.filter} onChange={(e) => filterDisabled(e)}>
            <option value="default">Filter Enabled</option>
            <option value='disabled'>Disabled</option>
            <option value='enabled'>Enabled</option>
          </select>
        </div> 
        </div> */}
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