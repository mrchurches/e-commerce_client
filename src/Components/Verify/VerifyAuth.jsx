import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

export default function VerifyAuth() {
    const { token } = useParams();
    
    window.sessionStorage.setItem('token', token);

    return (
        <div>
            {
                token ? (<Redirect to='/home' />) :
                    (<div class="container text-center align-items-center justify-content-center d-flex">
                        <div class="card">
                            <div class="card-body" >
                                <p class="card-text text-white">Your account is banned!</p>
                                <a href="/home" style={{ backgroundColor: '#0dcaf0' }} class="btn ">Go Home</a>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
};