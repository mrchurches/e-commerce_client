import React from 'react';


const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    //dentro de handlehello le estoy asignando respuestas que se inicializaran al cargar el bot.
    const handleHello = () =>{ 
        const botMessage = createChatBotMessage(
            "Hola!, mi nombre es E-Rob, represento esta tienda y mi trabajo es el de responder tus dudas o inquietudes lo mejor que pueda. No dudes en preguntarme lo que nesecites.",
            {
                withAvatar:false,
                delay: 1
            }
            )
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage],
        }));
    };

    const handleAyuda=()=>{
        const botMessage = createChatBotMessage(
            "Usualmente me preguntan sobre `¿como comprar?`, `¿como pagar?`, `¿que catalogo tenemos?`, tambien puedes preguntar `quienes son?` para saber mas sobre nosotros.",
            {
                withAvatar:false
            }
        )
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    };

    const handleNoMessage = () =>{
        const botMessage = createChatBotMessage(
            "Veo que eres timido, por favor escribe algo para que pueda ayudarte, por ejemplo: `como comprar?`, `metodos de pago`, `¿que puedo hacer en esta pagína?` ",
            {
                withAvatar:false
            }
        )
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    };
    const handlecomandos = () =>{
        const botMessage = createChatBotMessage(
            "estos son algunos comandos basicos: -.comprar  -.pagar   -.ayuda  -.contraseña  -.contacto "
        )
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    }

    const handleAboutus = () =>{
        const botMessage = createChatBotMessage(
            "Mi nombre es E-robb y represento a este E-commerce de videojuegos, desarrollado por un grupo de estudiantes del Bootcamp SoyHenry. La propuesta de esta pagina es la de ofrecer un servicio de administracion y venta de videojuegos digitales"
        )
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    };
    const handleLibrary= () =>{
        const botMessage = createChatBotMessage(
            "Todos los productos que hayas adquirido en tu cuenta, apareceran en la Libreria, como asi tambien tu historial de compras, asegurate de estar logeado para poder ver tu libreria!."
        )
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    };

    const handleComprar = () =>{
        const botMessage = createChatBotMessage(
            `Para comprar juegos, primero vas a nesecitar una cuenta, si no tienes una, puedes crearla una desde el login o tambien puedes entrar con tu cuenta de google.`,
            {
                withAvatar:false,
            },
            )
            setState((prev)=>({
                ...prev,
                messages:[...prev.messages, botMessage]
            }))
    };

    const handlePago = () =>{
        const botMessage = createChatBotMessage(
            "La forma de pagar en nuestra tienda virtual es mediante operaciones con MercadoPago"
        )
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    };

    const handleDespedida = ()=>{
        const botMessage = createChatBotMessage(
            "Hasta la próxima!!"
            );
            setState((prev)=>({
                ...prev,
                messages:[...prev.messages, botMessage]
            }));
        }
    const handleGames = ()=>{
            const botMessage = createChatBotMessage(
                "Nuestra tienda cuenta con un catalogo amplio de juegos, por lo que te recomiendo que te dirijas al home y utilices los filtros.", {widget:"goHome"},
                {withAvatar:false}
            );
            setState((prev)=>({
                ...prev,
                messages:[...prev.messages, botMessage]
            }));
        };
    const handleAccount0 = () =>{
        const botMessage = createChatBotMessage("Puedes navegar en el home y añadir juegos al carrito, pero vas a nesecitar una cuenta para poder realizar el pago.", {widget:"NoAccount0"},
        {
            withAvatar:false,
        })
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }));
    };
    const handleAccount1 = () =>{
        const botMessage = createChatBotMessage("aun no tienes una cuenta?. No te preocupes.",{ widget:"NoAccount1"},
        {
            withAvatar:false,
        })
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }));
    };
    const handleCatalog = () =>{
        const botMessage = createChatBotMessage("Puedes ver nuestro catalogo desde el home.",{widget:"GoHome"},
        {
            withAvatar:false,
        })
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }));
    };
    const handleForgottenPassword = () =>{
        const botMessage = createChatBotMessage("¿Olvidaste tu contraseña?, tranquilo, en la pantalla de loggin podrás iniciar el proceso para restablecer tu contraseña.",{widget:"ForgottenPassword"},
        {
            withAvatar:false
        })
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }));
    };
    const handleContacto = () =>{
        const botMessage = createChatBotMessage("escríbenos al siguiente email. e-market@gmail.com. O tambien llamar al siguiente numero (0800) 333 4888")
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    }
    const handleRepeat = () =>{
        const botMessage = createChatBotMessage("Disculpa, no te entendí, intenta nuevamente.")
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    }
    const handleRegistro = ()=>{
        const botMessage= createChatBotMessage("registrate para acceder a todas las funcionalidades de la tienda.",{widget:"NoAccount1"})
        setState((prev)=>({
            ...prev,
            messages:[...prev.messages, botMessage]
        }))
    }

    
    return (
        <div>
            {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                actions: {
                    handleNoMessage, //
                    handleHello, //hola
                    handleComprar, //comprar
                    handlePago, //pagar
                    handleAyuda, //ayuda
                    handleAboutus, //quienes?
                    handleGames, //catalogo
                    handleDespedida,
                    handleAccount0,
                    handleAccount1,
                    handleCatalog,
                    handleForgottenPassword,
                    handleContacto,
                    handleRepeat,
                    handlecomandos,
                    handleLibrary,
                    handleRegistro
                },
            });
        })}
        </div>
    );
};

export default ActionProvider;