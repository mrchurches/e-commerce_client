import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addWish, getUsers } from '../../redux/actions';
import Spinner from '../Spinner/Spinner';
import CardWhishList from './CardWishList';
import NotCardWhishList from './NotCardWishList';

const WishList = () => {
  const wishList = useSelector(state => state.wishlist),
    { products } = useSelector(state => state.users),
    { user } = useSelector(state => state.users),
    token = sessionStorage.getItem('token'),
    dispatch = useDispatch();

const [logged, setLogged] = useState(false);

  useEffect(() => {
    token && dispatch(getUsers(token));
  }, []);

  useEffect(() => {
    products && wishList.length === 0 && products.map(e => dispatch(addWish(e.id)));
  }, [products]);

  setTimeout(() => {
    user === undefined && setLogged(true)
  }, 700);

  return (
    <div class="d-flex p-2 justify-content-center">
      {user?.user?.isAdmin && <Redirect to='/*' />}
      {user === undefined && logged && <Redirect to="/Login"/>}
      <div class="d-flex flex-wrap m-1 justify-content-center">
        {user === undefined ? <Spinner /> :
          products.length ? products?.map(e => {
            return <CardWhishList key={e.id} id={e['wishList.ProductId'] ? e['wishList.ProductId'] : e['Favorites.ProductId']} name={e.name} price={e.price} background_image={e.background_image} />
          }) :
            <NotCardWhishList />}
      </div>
    </div>
  )
}

export default WishList