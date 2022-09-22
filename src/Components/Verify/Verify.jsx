import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
            <div class="container text-center align-items-center justify-content-center d-flex">
                <div class="card">
                    <div class="card-body" >
                        {response && response.message === undefined && (<p>Verification has been successful</p>)}
                        {response && response.message === undefined && <Link type="button" style={{ backgroundColor: '#0dcaf0' }} class="btn" to={'/login'}>Login</Link>}

                        {response && response.message && (<p>Email adress are invalid</p>)}
                        {response && response.message && <Link type="button" style={{ backgroundColor: '#0dcaf0' }} class="btn" to={'/create_user'}>Create one</Link>}

                        {response === false && (<p>Email adress already verificated</p>)}
                        {response === false && <Link type="button"style={{ backgroundColor: '#0dcaf0' }} class="btn" to={'/login'}>Login</Link>}
                    </div>
                </div>
            </div>
        </div>
    )
};
