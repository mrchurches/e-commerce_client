import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"
// // import MercadoPago from "mercadopago"
// const { PUBLIC_KEY } = process.env

// const FORM_ID = 'payment-form';
// const mp = new MercadoPago(PUBLIC_KEY);

// export default function Pasarela() {
//     const { id } = useParams(); // id de producto
//     const [preferenceId, setPreferenceId] = useState(null);

//     const mp = new MercadoPago(PUBLIC_KEY);
//     console.log("mp")
//     console.log(mp)
//     const bricksBuilder = mp.bricks();




//     return (
//         <div id="cardPaymentBrick_container"></div>
//     );
// }



const FORM_ID = 'payment-form';

export default function Checkout() {
    const { id } = useParams(); // id de producto
    const [preferenceId, setPreferenceId] = useState(null);

    // let game = useSelector(state.cart)

    useEffect(() => {
        // luego de montarse el componente, le pedimos al backend el preferenceId
        axios.post('http://localhost:3001/payment', {
            items: [
                {
                    title: "Mi producto",
                    unit_price: 100,
                    quantity: 1,
                },
            ],
        })

            .then((order) => {
                console.log(order)
                order = order.data
                setPreferenceId(order.preferenceId);
            });
    }, [id]);

    useEffect(() => {
        if (preferenceId) {
            // con el preferenceId en mano, inyectamos el script de mercadoPago
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src =
                'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
            script.setAttribute('data-preference-id', preferenceId);
            const form = document.getElementById(FORM_ID);
            form.appendChild(script);
        }
    }, [preferenceId]);

    return (
        <form id={FORM_ID} method="GET" />
    );
}