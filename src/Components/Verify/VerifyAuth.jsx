import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getUsers } from '../../redux/actions';

export default function VerifyAuth() {
    const { token } = useParams();
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        window.sessionStorage.setItem('token', token);
        dispatch(getUsers(token));
    }, []);

    return (
        <div class="container text-center">
            { user && user?.isBanned && (<div class="card w-75">
                <div class="card-body" style={{backGroundColor: 'rgb(40, 141, 224)'}}>
                    <p class="card-text">Your account is banned!</p>
                    <a href="/home" class="btn btn-primary">Go Home</a>
                </div>
            </div>)}
            {user && !user?.isBanned && <Redirect to={'/home'} />}
        </div>
    )
};
