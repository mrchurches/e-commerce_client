import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getAllProducts, getUserOrders} from "../../redux/actions";
import { useSelector } from 'react-redux';
import Orders from "./Orders";
import ProductCard from "../Cards/ProductCard/ProductCard";
//
const MyStore = () => {

  let user = useSelector(state => state.users);
  let userOrders = useSelector(state => state.userOrders);
  let games = useSelector(state=> state.products);
  let dispatch = useDispatch();
  let [orders, setOrders] = useState(false);
  var user_id;
  if (user.user) {
      user_id = user.user.id;
  }
  let filteredGames=[];
  useEffect(()=>{
    dispatch(getAllProducts())
    dispatch(getUserOrders(user_id))
  },[dispatch, user_id])
  


  userOrders.forEach(e=> games.forEach(f=>{
    if(e.game_id === f.id){
      filteredGames.push(f)
    }
  }))


  

  return (
    <div class="d-flex p-2  justify-content-center">
      <div>
        <input class="btn bg-info" onClick={()=> setOrders(!orders)} type="button" value="Show my orders"/>
      </div>
      {!orders && <div class="list-group align-self-center d-grid gap-3">
        <h4>Adentro de lista de juegos comprados....</h4>
      {
        userOrders.length>0 && filteredGames.map(e=>(
          <ProductCard id={e.id} id_api={e.id_api} name={e.name} img={e.background_image
          } rating={e.rating} platforms={e.platforms} price={e.price} fromApi={e.fromApi} isDisabled={e.isDisabled} genres={e.genres} />
        ))
      }
      </div>}
      {
        orders && <Orders orders={userOrders} games={filteredGames}/> 
      }
    </div>
  )
}

export default MyStore
