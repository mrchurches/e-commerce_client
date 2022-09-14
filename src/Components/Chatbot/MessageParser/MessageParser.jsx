import React from 'react';
let pago = "pagar" || "pago" || "metodo de pago" || "abonar"
const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        let input = message.toLowerCase();        
        if(!input){
            actions.handleNoMessage()
        }
        if(input.includes("hola")){
            actions.handleHello()
        }
        if(input.includes("quien") || input.includes("quienes") || input.includes("para que sirve") || input.includes("que puedo hacer")){
            actions.handleAboutus()
        };
        if(input.includes("comprar")){
            actions.handleComprar()
        }
        if(input.includes("pagar") || input.includes("pago") || input.includes("abonar")){
            actions.handlePago()
        };
        if(input.includes("catalogo") || input.includes("que juegos")){
            actions.handleGames()
        };
        if(input.includes("ayuda")){
            actions.handleAyuda();
        };
        if(input.includes)
        if(input.includes)
        if(input.includes("adios") || input.includes("chau") || input.includes("bye")){
            actions.handleDespedida();
        }
        console.log(message);
    };
    return (
        <div>
        {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
            parse: parse,
            actions
            });
        })}
        </div>
    );
};

export default MessageParser;