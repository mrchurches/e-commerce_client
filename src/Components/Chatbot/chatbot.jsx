import config from "./Config/config";
import MessageParser from './MessageParser/MessageParser';
import ActionProvider from './ActionProvider/ActionProvider';
import Chatbot from "react-chatbot-kit";
import { useState } from "react";
import { useEffect } from "react";
 

const MyChatBot = () => {
    return (
        <div>
                <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            /> 
        </div>
    );
};

export default MyChatBot;