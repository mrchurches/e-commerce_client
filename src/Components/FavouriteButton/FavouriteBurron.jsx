import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import heart from "../../images/heart.png"
import { addWish, removeWish } from '../../redux/actions';
import { addFavorite, deleteFavorite } from './FavoriteButton';
import styles from "./FavouriteButton.module.css"

function FavouriteButton({ id }) {
  let dispatch = useDispatch();
  let wishlist = useSelector(state => state.wishlist);
  let { products } = useSelector(state => state.users);
  const [brigthness, setBrigthness] = useState("brightness(0.5)")

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    let fW = wishlist?.filter(e => e === id) 
    if (fW.length > 0 ) { setBrigthness("") };
  }, [wishlist,products]);

  async function handleClick() {
    if (wishlist.includes(id)) {
      dispatch(removeWish(id))
      await deleteFavorite(id, token)
      setBrigthness("brightness(0.5)")
    } else {
      dispatch(addWish(id)) // dispacha al WISHLIST de compras con el id del game en la db
      await addFavorite(id, token)
    }
  }

  return (
    <div className={styles.button}>
      <input type="image" onClick={(e) => handleClick(e)} value="favourite" src={heart} class="" style={{ width: "1vw", filter: `${brigthness}` }} alt="heart" />
    </div>
  )
}

export default FavouriteButton