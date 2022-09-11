import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';

export default function VerifyAuth() {
    const { token } = useParams();

    useEffect(() => {
        window.sessionStorage.setItem('token', token)
    }, []);

    return (
        <div class="container text-center">
           <Redirect to={'/home'} />
        </div>
    )
};
