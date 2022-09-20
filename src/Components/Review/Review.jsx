import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserOrders, PostReview } from "../../redux/actions";
import { useSelector } from 'react-redux';
import style from './Review.module.css'
import Swal from 'sweetalert2'
import axios from "axios";
const { REACT_APP_URL } = process.env;

function validate(input, productOwned) {
    let error = {};
    if (productOwned) {
        if (!input.description || input.description.length > 255) error.description = "Description required with no more than 256 characters"
        if (!input.rating || input.rating < 0 || input.rating > 100) error.rating = "1 - 100"
    }
    return error
};
//

export default function Review_box({ productId, reviews, setReviews }) {

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
    const [userReviews, setUserReviews] = useState([]);
    const [reviewed, setReviewed] = useState(false);

    let [input, setInput] = useState({
        rating: "",
        description: "",
        user_id: user_id,
        productId: productId,
        profile_pic: profile_pic,
        username: username,
    });
    let [error, setError] = useState({});
    let dispatch = useDispatch();


    useEffect(() => {
        if (productOwned && !reviewed) {
            const llaves = Object.keys(input)
            for (const key of llaves) {
                if (input[key] && !error[key]) { //si hay input y no hay errores --false
                    SetactiveSubmit(false)
                } else {
                    SetactiveSubmit(true)
                    break;
                };
            };
        }
    }, [input, error])

    function handleChange(e) {
        e.preventDefault(e)
        let review = e.target.value;
        setInput({
            ...input,
            [e.target.name]: review,
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

    useEffect(() => {
        if (reviews) {
            setTimeout(() => {
                axios.get(`${REACT_APP_URL}reviews?user_id=${user_id}`)
                    .then(res => setUserReviews(res.data.filter((e) => !e.reported)))
                    .catch(err => console.log(err))
            }, "500");
        }
    }, [user, reviews])

    useEffect(() => {
        if (reviews && userReviews) {
            userReviews.forEach(e => {
                if (e.productId === productId) {
                    setReviewed(true)
                }
            })
        }
    }, [userReviews, reviews])


    function handlerSubmit(e) {
        e.preventDefault();
        dispatch(PostReview(input));
        console.log("review enviado");
        setReviews([...reviews, ...[input]])
        Swal.fire(
            'Good job!',
            'Review Posted Succesfully!',
            'success'
        )
            .then(() => window.location.reload())
        setInput({
            rating: "",
            description: "",
            user_id: user_id,
            productId: productId,
            username: username,
        })
    };
    //rating y review 

    return (
        <div class="mt-5 d-flex justify-content-center">
            <div>
                <form onSubmit={(e) => handlerSubmit(e)}>
                    <div class="mb-3 mt-2">
                        <label>Rating:</label>
                        <input type="number" /* placeholder="Rating" */ class="form-control" name="rating" value={input.rating} onChange={(e) => handleChange(e)} required />
                        {error.rating ? <label className={style.labelError}>{error.rating}</label> : null}
                    </div>
                    <div class="mb-3">
                        <label>Review:</label>
                        <textarea placeholder="Review" class="form-control" name="description" value={input.description} onChange={(e) => handleChange(e)} required></textarea>
                        {error.description ? <label className={style.labelError}>{error.description}</label> : null}
                    </div>
                    {!productOwned ? <div>You must own the product to review</div> : null}
                    {reviewed ? <div>You already reviewed this game</div> : null}
                    <button type="submit" class="btn btn-primary mb-3" disabled={activeSubmit} >Post Review</button>
                </form>
            </div>
        </div>
    )
};