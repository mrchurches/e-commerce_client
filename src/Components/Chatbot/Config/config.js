import { createChatBotMessage } from 'react-chatbot-kit';
import Botavatar from "../Components/BotAvatar.jsx"
import NoAccount0 from "../Components/BotWidget/noAccount0.jsx"
import NoAccount1 from "../Components/BotWidget/noAccount1"
import GoHome from "../Components/BotWidget/buttonHome"
import ForgottenPassword from  "../Components/BotWidget/ForgotPassword"
import MyChatBot from '../chatbot.jsx';


let botname = "E-robb";
function close(e){
    console.log(MyChatBot)
}
const config = {
    initialMessages: [createChatBotMessage(`Bienvenido a Games E-commerce!. yo soy ${botname}`), createChatBotMessage("Mi mision es la de responder a tus preguntas, si no sabes por donde comenzar, prueba escribiendo `ayuda`.")],
    botName:`${botname}`,
    customComponents:{
        botAvatar:(props)=><Botavatar {...props}/>,
        header: () => <div style={{ backgroundColor: 'white', padding: "5px", borderRadius: "3px" }}>This is the header <button onClick={()=>close()}>X</button></div>
    },
    customStyles:{
        botMessageBox:{ //color del recuador de texto del bot
            backgroundColor:"blue"
        },
        chatButton:{ //boton del chat
            backgroundColor:"black"
        },
    },
    widgets:[
        {
            widgetName: "NoAccount0",
            widgetFunc: (props)=> <NoAccount0 {...props}/>,
            mapStateToProps: ["NoAccount0"],
        },
        {
            widgetName: "NoAccount1",
            widgetFunc: (props)=> <NoAccount1 {...props}/>,
            mapStateToProps: ["NoAccount1"],
        },
        {
            widgetName: "GoHome",
            widgetFunc:(props)=><GoHome {...props}/>,
            mapStateToProps:["GoHome"],
        },
        {
            widgetName: "ForgottenPassword",
            widgetFunc:(props)=><ForgottenPassword {...props}/>,
            mapStateToProps:["ForgottenPassword"]
        }
    ]
};


export default config;
