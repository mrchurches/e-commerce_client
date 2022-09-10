import React from 'react'
import style from './ReviewsPanel.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { addRemoveReview, getUserReviews, getUserReportedReviews } from '../../../../redux/actions.js'

function ReviewsPanel({setRender, render}) {

    const dispatch = useDispatch()
    const [reviews, setReviews] = useState({})

    const goBack = () => {
        setRender({user: true});
    }
    function viewDisabled(e){
        if (e.target.value === 'View Disabled') {
            dispatch(getUserReportedReviews(username))
        }else{ 
            dispatch(getUserReviews(username));
        }
    }

    const reportedRev = useSelector((state) => state.reviewsUserRep);
    const enabledRev = useSelector((state) => state.reviewsUser);
    
    var username = render.username;
    var color = 'white'

    useEffect(() => {
        dispatch(getUserReviews(username));
    }, []);
    useEffect(()=>{
        console.log('enabled: ', enabledRev);
        setReviews({button: 'View Disabled', reviews: enabledRev})
    }, [enabledRev]);
    useEffect(()=>{
        console.log('reported: ',reportedRev);
        setReviews({button: 'View Enabled', reviews: reportedRev})
    }, [reportedRev]);

    function handleSwitch(e, review){
        var action = 'add'
        if (!review.reported) {
            action = 'remove'
        }
        let i = reviews.reviews.findIndex((e) => e.id === review.id);
        dispatch(addRemoveReview({typeOfEdit:action, id: review.id}));
        reviews.reviews[i].reported = !review.reported;
        setTimeout(() => {
            if(action === 'add'){
                dispatch(getUserReportedReviews(username));
            }else{
                dispatch(getUserReviews(username));
            }    
        }, "500");
    }


  return (
    <div class='container' className={style.bigContainer}>
      
        <button value='test' class="btn btn-secondary" type="button" aria-expanded="false" onClick={goBack} className={style.goBack}>Go Back</button>
        
        <div className={style.container}>

            <div class='d-flex justify-content-between'>
                <div></div>
                <h2 class='mb-4'>{username.charAt(0).toUpperCase() + username.slice(1)}'s Reviews</h2>
                <input value={reviews.button} class="btn btn-secondary" type="button" aria-expanded="false" onClick={(e)=>viewDisabled(e)} className={style.view} ></input>
            </div>

            <div className={style.reviewsContainer}>
            {reviews.reviews && reviews.reviews.map((review) => {
                if (color === 'white') {
                    color = 'rgba(140, 144, 147, 0.138)'
                }else{color = 'white'}
                return(
                <div className={style.review} style={{backgroundColor:  color}} class='d-flex'>
                    <div className={style.description}><p>{review.description}</p></div>
                    <div className={style.remove}>
                        <div className={style.iconContainer1} onClick={(e) => handleSwitch(e, review)} ><i class={reviews.button === 'View Enabled' ? 'bi bi-plus-circle': 'bi bi-x-circle'}></i></div>
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