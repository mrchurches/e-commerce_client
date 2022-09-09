import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//import {PostReview} from "../../redux/actions";

export default function Review_box(){
    let [input , setInput] = useState({
        review:"",
        rating:""
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
    };

    function handlerSubmit(e){
        e.preventDefault();
        /* dispatch(PostReview(input)) */
        console.log("review enviado")
    };
    //rating y review 

        return(
            <div class="mt-5 d-flex justify-content-center">
                <div>
                    <form onSubmit={(e)=>handlerSubmit(e)}>
                        <div class= "mb-3">
                            <label>Rating:</label>
                            <input type="number" /* placeholder="Rating" */ class="form-control" name="rating" value={input.rating} onChange={(e)=>handleChange(e)} required/>
                        </div>
                        <div class="mb-3">
                            <label>Review:</label>
                            <textarea placeholder="Review" class="form-control" name = "review" value={input.review} onChange={(e)=>handleChange(e)} required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Post Review</button>
                    </form>
                </div>
            </div>
    )
};