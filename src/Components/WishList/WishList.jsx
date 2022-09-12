import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addWish, getUsers } from '../../redux/actions';
import Spinner from '../Spinner/Spinner';
import CardWhishList from './CardWhishList';
import NotCardWhishList from './NotCardWhishList';

const WishList = () => {
  const wishList = useSelector(state => state.wishlist),
    { products } = useSelector(state => state.users),
    { user } = useSelector(state => state.users),
    token = window.sessionStorage.getItem('token'),
    dispatch = useDispatch();

  useEffect(() => {
    products && wishList.length === 0 && products.map(e => dispatch(addWish(e.id)));
  }, [products]);

  useEffect(() => {
    return () => { dispatch(getUsers(token));}
  }, []);

  return (
    <div class="d-flex p-2 justify-content-center">
      <div class="list-group align-self-center d-grid gap-3">
        {user === undefined ? <Spinner /> :
          products.length ? products?.map(e => {
            return <CardWhishList key={e.id} id={e.id} name={e.name} price={e.price} background_image={e.background_image} />
          }) :
            <NotCardWhishList />}
      </div>
    </div>
  )
}

export default WishList