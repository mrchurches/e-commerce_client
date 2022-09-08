import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import heart from "../../images/heart.png"
import { addWish, removeWish } from '../../redux/actions';

function FavouriteButton({id}) {
  let dispatch= useDispatch();
  let wishlist = useSelector(state=>state.wishlist);
  const [brigthness, setBrigthness] = useState("brightness(0.5)")

  useEffect(()=>{
    // wishlist?.forEach(e=>{
    //   if(e===id){
    //     setBrigthness("")
    //   }else{
    //     setBrigthness("brightness(0.5)")
    //   }
    //})
    let fW = wishlist.filter(e=>e===id);
    if(fW.length>0){setBrigthness("")};
  },[wishlist, id])

  function handleClick(e){
    console.log("entro")
    let fW = wishlist.filter(e=>e===id);
    if(fW.length>0){
     dispatch(removeWish(id))
     setBrigthness("brightness(0.5)")
    }else{
      dispatch(addWish(id)) // dispacha al WISHLIST de compras con el id del game en la db
}
  }

  return (
    <input type="image" onClick={(e)=>handleClick(e)} value="favourite"  src={heart} class="m-2" style={{width:"2vw", filter:`${brigthness}`}}  alt="heart"/>
  )
}

export default FavouriteButton