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
            <div class="card row justify-content-evenly">
                <div class=" col  card-body">
                    {response && response.message === undefined && (<p>Verification has been successful</p>)}
                    {response && response.message === undefined && <Link type="button" class="btn btn-primary" to={'/login'}>Login</Link>}
                    
                    {response && response.message && (<p>Email adress are invalid</p> )}
                    {response && response.message &&<Link type="button" class="btn btn-primary" to={'/create_user'}>Create one</Link>}
                    
                    {response === false && (<p>Email adress already verificated</p>)}
                    {response === false &&<Link type="button" class="btn btn-primary" to={'/login'}>Login</Link>}
                </div>
            </div>
        </div>
    )
};
