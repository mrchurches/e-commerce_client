import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './ReviewCard.module.css'
import { addRemoveReview, editReview, getUserReviews } from '../../../redux/actions'
import Swal from 'sweetalert2'

function validate(input) {
  let error = {};
  if (!input.description || input.description.length > 255) error.description = "Description required with no more than 256 characters"
  if (!input.rating || input.rating < 0 || input.rating > 100) error.rating = "1 - 100"
  return error
};

export default function ReviewCard({ username, rating, description, userImg, id, reviews, setReviews }) {

  let dispatch = useDispatch();

  let { user } = useSelector(state => state.users);
  const [myReview, setMyReview] = useState(false);
  const [edit, setEdit] = useState(false);
  const [activeSubmit, SetactiveSubmit] = useState(true);
  const [review, setReview] = useState({ description: description, rating: rating });
  let [input, setInput] = useState({
    id: id,
    rating: rating,
    description: description,
  });
  let [error, setError] = useState({});

  useEffect(() => {
    const llaves = Object.keys(input)
    console.log("primer id")
    console.log(input.id)
    if(!input.id){
      dispatch(getUserReviews())
    }
    for (const key of llaves) {
      if (input[key] && !error[key]) { //si hay input y no hay errores --false
        SetactiveSubmit(false)
      } else {
        SetactiveSubmit(true)
        break;
      };
    };
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
    }))
  };


  useEffect(() => {
    if (user) {
      if (user.username === username) {
        setMyReview(true)
        console.log(myReview)
      }
    }
  }, [user]);

  function removeReview(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        dispatch(addRemoveReview({ typeOfEdit: 'remove', id: id }));
        setReviews(reviews.filter(e => id != e.id));
        Swal.fire(
          'Deleted!',
          'Your review has been deleted.',
          'success'
        )
      }
    })
    .then(() => window.location.reload())
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(editReview(input));
    console.log("review editado");
    setReview({ description: input.description, rating: input.rating })
    Swal.fire(
      'Good job!',
      'Review Edited Succesfully!',
      'success'
    )
      .then(() => window.location.reload())
  };

  return (
    <div class="col-sm-6" className={style.container}>
      <div class="media d-flex">
        {edit && (<div style={{ cursor: 'pointer', marginLeft: 10, marginTop: 10 }} onClick={e => setEdit(false)}><p>X</p></div>)}
        {myReview && !edit && (<div onClick={e => setEdit(true)} className={style.iconContainer1} ><i class="bi bi-pencil"></i></div>)}
        <img src={userImg} class="mr-3" className={style.image} alt="" />
        {edit ?


          <form className={style.form} onSubmit={e => handlerSubmit(e)}>
            <div class="mb-3 mt-2">
              <input type="number" /* placeholder="Rating" */ class="form-control" name="rating" value={input.rating} onChange={(e) => handleChange(e)} required />
              {error.rating ? <label className={style.labelError}>{error.rating}</label> : null}
            </div>
            <div class="mb-3">
              <textarea placeholder="Review" class="form-control" name="description" value={input.description} onChange={(e) => handleChange(e)} required></textarea>
              {error.description ? <label className={style.labelError}>{error.description}</label> : null}
            </div>
            <button class="btn btn-primary mb-3" onClick={e => removeReview(e)} >Remove Review</button>
            <button type="submit" class="btn btn-primary mb-3" disabled={activeSubmit} >Save Review</button>
          </form>



          :
          <div class="media-body">
            <div class="testimonial" className={style.textContainer}>
              <p className={style.description}>{review.description}</p>
              <p class="overview" className={style.name} ><b>{username}</b>Rating: {review.rating}</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

