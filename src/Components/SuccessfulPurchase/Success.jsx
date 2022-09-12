import React from 'react'
import { clearCart } from '../../redux/actions'
import { useDispatch } from "react-redux";
import { useEffect } from 'react';

const Success = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart())
  }, []);
  return (
    <div class="vh-100">
      <h1 class="mt-3"> Successful Purchase</h1>
      <a href="/home" style={{textDecoration: "none"}}><button class="btn btn-primary mt-3" >Go Back Home</button></a>
    </div>
  )
}

export default Success