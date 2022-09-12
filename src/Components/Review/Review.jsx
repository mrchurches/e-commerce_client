import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getUserOrders, PostReview} from "../../redux/actions";
import { useSelector } from 'react-redux';
import style from './Review.module.css'
import Swal from 'sweetalert2'

function validate(input, productOwned){
    let error={};
    if (productOwned) {   
        if(!input.description || input.description.length > 255) error.description ="Description required with no more than 256 characters"
        if(!input.rating || input.rating < 0 || input.rating > 100)error.rating = "1 - 100"
    }
    return error
};


export default function Review_box({productId, reviews, setReviews}){

    let user = useSelector(state => state.users);
    let userOrders = useSelector(state => state.userOrders);
    var username;
    var user_id;
    var profile_pic;
    if (user.user) {
        user_id = user.user.id;
        username = user.user.username;
        profile_pic = user.user.profile_pic;
    }
    const [activeSubmit, SetactiveSubmit] = useState(true);
    const [productOwned, SetProductOwned] = useState(false);

    let [input , setInput] = useState({
        rating:"",
        description:"",
        username: username,
        productId: productId,
        profile_pic: profile_pic,
    });
    let [error, setError] = useState({});
    let dispatch = useDispatch();

    useEffect(()=>{
        if (productOwned) {   
            const llaves = Object.keys(input)
            for (const key of llaves) {
                if (input[key] && !error[key]) { //si hay input y no hay errores --false
                    SetactiveSubmit(false)
                }else {
                    SetactiveSubmit(true)
                    break;
                };
            };
        }
    }, [input, error])

    function handleChange (e){
        e.preventDefault(e)
        let review = e.target.value;
        setInput({
            ...input,
            [e.target.name]:review,
        });
        setError(validate({
            ...input,
            [e.target.name]: review
        }, productOwned))
    };

    useEffect(() => {
        if (user.user) {
            dispatch(getUserOrders(user_id))
        }
      }, []);
      useEffect(() => {
        userOrders.forEach(e => {
            if (e.game_id === productId) {
                SetProductOwned(true);
            }
        });
      }, [userOrders]);


    function handlerSubmit(e){
        e.preventDefault();
        dispatch(PostReview(input));
        console.log("review enviado");
        setReviews([...reviews,...[input]])
        Swal.fire(
            'Good job!',
            'Review Posted Succesfully!',
            'success'
        )
        setInput({
            rating:"",
            description:"",
            username: username,
            productId: productId
        })
    };
    //rating y review 

        return(
            <div class="mt-5 d-flex justify-content-center">
                <div>
                    <form onSubmit={(e)=>handlerSubmit(e)}>
                        <div class= "mb-3 mt-2">
                            <label>Rating:</label>
                            <input type="number" /* placeholder="Rating" */ class="form-control" name="rating" value={input.rating} onChange={(e)=>handleChange(e)} required/>
                            {error.rating ? <label className={style.labelError}>{error.rating}</label> : null}
                        </div>
                        <div class="mb-3">
                            <label>Review:</label>
                            <textarea placeholder="Review" class="form-control" name = "description" value={input.description} onChange={(e)=>handleChange(e)} required></textarea>
                            {error.description ? <label className={style.labelError}>{error.description}</label> : null}
                        </div>
                        { !productOwned ? <div>You must own the product to review</div> : null }
                        <button type="submit" class="btn btn-primary mb-3" disabled={activeSubmit} >Post Review</button>
                    </form>
                </div>
            </div>
    )
};