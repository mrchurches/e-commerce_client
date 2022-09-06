import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"
import MercadoPago from "mercadopago"
const { PUBLIC_KEY } = process.env

const FORM_ID = 'payment-form';
const mp = new MercadoPago(PUBLIC_KEY);

export default function Pasarela() {
    const { id } = useParams(); // id de producto
    const [preferenceId, setPreferenceId] = useState(null);

    const mp = new MercadoPago(PUBLIC_KEY);
    console.log("mp")
    console.log(mp)
    const bricksBuilder = mp.bricks();




    return (
        <div id="cardPaymentBrick_container"></div>
    );
}