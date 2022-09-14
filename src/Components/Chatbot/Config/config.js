import { createChatBotMessage } from 'react-chatbot-kit';
import Botavatar from "../Components/BotAvatar.jsx"
let botname = "E-robb";
const config = {
    initialMessages: [createChatBotMessage(`Bienvenido a Games E-commerce!. yo soy ${botname}`), createChatBotMessage("Mi mision es la de responder a tus preguntas, si no sabes por donde comenzar, prueba escribiendo `ayuda`.")],
    botName:`${botname}`,
    customComponents:{
        botAvatar:(props)=><Botavatar {...props}/>
    },
    customStyles:{
        header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
        botMessageBox:{ //color del recuador de texto del bot
            backgroundColor:"blue"
        },
        chatButton:{ //boton del chat
            backgroundColor:"black"
        },
    }
};


export default config;
