import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {PostReview} from "../../redux/actions";
import { useSelector } from 'react-redux';
import style from './Review.module.css'

export default function Review_box({productId, reviews, setReviews}){

    let user = useSelector(state => state.users);
    console.log(user)
    var disabledBtn = false;
    var username;
    if (user.user) {
        username = user.user.username
    }
    if(!user.user){
        disabledBtn = true
    }
    let [input , setInput] = useState({
        rating:"",
        description:"",
        username: username,
        productId: productId
    });
    let [error, setError] = useState("");
    let dispatch = useDispatch();
    
    function validate(review){
        error= "";
        if (review.length > 256) error = "The Review max length must be 256 characters";
        return error;
    }

    function handleChange (e){
        e.preventDefault(e)
        let review = e.target.value;
        setInput({
            ...input,
            [e.target.name]:review,
        });
        
        setError(validate({
            ...input,
            [e.target.name]:review,
        }));
        console.log(input)
        console.log(user)
    };

    function handlerSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(PostReview(input));
        console.log("review enviado");
        setReviews([...reviews,...[input]])
    };
    //rating y review 

        return(
            <div class="mt-5 d-flex justify-content-center">
                <div>
                    <form onSubmit={(e)=>handlerSubmit(e)}>
                        <div class= "mb-3 mt-2">
                            <label>Rating:</label>
                            <input type="number" /* placeholder="Rating" */ class="form-control" name="rating" value={input.rating} onChange={(e)=>handleChange(e)} required/>
                        </div>
                        <div class="mb-3">
                            <label>Review:</label>
                            <textarea placeholder="Review" class="form-control" name = "description" value={input.review} onChange={(e)=>handleChange(e)} required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary mb-3" disabled={disabledBtn} >Post Review</button>
                    </form>
                </div>
            </div>
    )
};