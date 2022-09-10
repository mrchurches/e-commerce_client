import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { verifyEmail } from './VerifyHelper';

export default function Verify() {
    const { email } = useParams(),
        [response, setResponse] = useState();

    useEffect(() => {
        (async () => {
            setResponse(await verifyEmail(email))
        })()
    }, []);

    return (
        <div class="container text-center">
            {response === false && <Redirect to="/login" />}
            <div class="card row justify-content-evenly">
                <div class=" col  card-body">
                    {response && !response.message &&(<p>Verification has been successful</p>)}
                    {response && response.message && (<p>Email Adress are invalid</p>)}
                </div>
            </div>
        </div>
    )
};
