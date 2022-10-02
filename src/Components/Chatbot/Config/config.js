import { createChatBotMessage } from 'react-chatbot-kit';
import Botavatar from "../Components/BotAvatar.jsx"
import NoAccount0 from "../Components/BotWidget/noAccount0.jsx"
import NoAccount1 from "../Components/BotWidget/noAccount1"
import GoHome from "../Components/BotWidget/buttonHome"
import ForgottenPassword from  "../Components/BotWidget/ForgotPassword"
import MyChatBot from '../chatbot.jsx';


let botname = "E-robb";
const config = {
    initialMessages: [createChatBotMessage(`Welcome to Games E-commerce!. i'm ${botname}`), createChatBotMessage(`My mission is to answer your questions, if you don't know where to start, try typing "Help"`)],
    botName:`${botname}`,
    customComponents:{
        botAvatar:(props)=><Botavatar {...props}/>,
    },
    customStyles:{
        botMessageBox:{ //color del recuador de texto del bot
            backgroundColor:"#212529"
        },
        chatButton:{ //boton del chat
            backgroundColor:"#212529"
        },
        chatContainer:{
            backgroundColor: "red"
        }
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
