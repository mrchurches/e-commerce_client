import React from 'react';
const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        let input = message.toLowerCase();
        let array = ["cuenta"]
        if(!input){
            actions.handleNoMessage()
        }
        if(input){
            if(
                input.includes("hola") ||
                input.includes("buenas tardes") ||
                input.includes("buen dia") || 
                input.includes("buenos dias") ||
                input.includes("buenas noches")
                ) {
                return actions.handleHello()
            }
            if(
                input.includes("quienes son") ||
                input.includes("para que sirve") ||
                input.includes("que puedo hacer")
                ) {
                return actions.handleAboutus()
            };
    
            if(
                input.includes("comprar")
                ) {
                return actions.handleComprar()
            }
    
            if(
                input.includes("pagar") ||
                input.includes("pago") ||
                input.includes("abonar")
                ) {
                return actions.handlePago()
            };
    
            if(
                input.includes("catalogo") ||
                input.includes("que juegos")
                ) {
                return actions.handleGames()
            };
    
            if(
                input.includes("ayuda") ||
                input.includes("no entiendo") ||
                input.includes("problema") ||
                input.includes("help")
                ) {
                return actions.handleAyuda();
            };
    
            if(
                input.includes("adios") ||
                input.includes("chau") ||
                input.includes("bye")
                ) {
                return actions.handleDespedida();
            };
    
            if(
                input.includes("cuenta") ||
                input.includes("como crear")||
                input.includes("crear")||
                input.includes("registrarse")
            ) {
                actions.handleAccount0()
                return actions.handleAccount1({withAvatar:false})
            }
    
            if(
                input.includes("olvide mi contraseña") ||
                input.includes("perdí") ||
                input.includes("olvide") ||
                input.includes("restablecer contraseña") ||
                input.includes("restablecer") ||
                input.includes("contraseña")
            ) {
                return actions.handleForgottenPassword( {withAvatar:false} )
            }
            if(
                input.includes("contacto") ||
                input.includes("email") ||
                input.includes("telefono") ||
                input.includes("numero") ||
                input.includes("escribir")
            ){
                return actions.handleContacto()
            }
            if(
                input.includes("comandos")
            ){
                return actions.handlecomandos()
            }
            if(
                input.includes("quiero ver mis juegos") ||
                input.includes("mis productos") ||
                input.includes("mis juegos") ||
                input.includes("ver mis compras") ||
                input.includes("libreria")
            ){
                return actions.handleLibrary()
            }
            if(
                input.includes("registrarme")
            ){
                return actions.handleRegistro()
            }
            else{
                return actions.handleRepeat()
            }
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