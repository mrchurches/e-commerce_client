import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getUserOrders} from "../../redux/actions";
import { useSelector } from 'react-redux';
//
const MyStore = () => {

  let user = useSelector(state => state.users);
  let userOrders = useSelector(state => state.userOrders);
  let dispatch = useDispatch();
  var user_id;
  if (user.user) {
      user_id = user.user.id;
  }

  useEffect(() => {
    dispatch(getUserOrders(user_id))
  }, []);

  return (
    <div class="d-flex p-2  justify-content-center">
      <div class="list-group align-self-center d-grid gap-3">
      { userOrders.length > 0 && userOrders.map((e) => (
            <a href="#" class="list-group-item list-group-item-action" aria-current="true">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{e.game_name}</h5>
                <small></small>
              </div>
              <p class="mb-1">Some placeholder content in a paragraph.</p>
              <small>And some small print.</small>
            </a>
      ))}

        {/* <a href="#" class="list-group-item list-group-item-action" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assesins creed</h5>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small>And some small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Crash</h5>
            <small class="text-muted">5 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-muted">And some muted small print.</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Forza horizon</h5>
            <small class="text-muted">1 month ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-muted">And some muted small print.</small>
        </a> */}
      </div>
    </div>
  )
}

export default MyStore
