import React from 'react';
import { Link } from 'react-router-dom';

export default function NotCardWhishList(params) {
    return (
        <div class="list-group-item list-group-item-action createUserContainer " aria-current="true">
            <div class="d-flex w-100  justify-content-between">
                <h1 class="mb-1">Games not added at your wishlist</h1>
            </div>
            <Link to="/home" style={{ textDecoration: 'none' }}>
                <p>You can view your favorites games here!</p>
            </Link>
        </div>
    );
};