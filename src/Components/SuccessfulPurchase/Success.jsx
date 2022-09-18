import React from 'react'
import { clearCart, getUserOrders } from '../../redux/actions'
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Success = () => {
  let dispatch = useDispatch();
  const { user } = useSelector(state => state.users);
  useEffect(() => {
    user && dispatch(getUserOrders(user.id));
    dispatch(clearCart());
  }, [user]);
  return (
    <div class="vh-100">
      <h1 class="mt-3"> Successful Purchase</h1>
      <a href="/home" style={{textDecoration: "none"}}><button class="btn btn-primary mt-3" >Go Back Home</button></a>
    </div>
  )
}

export default Success