import config from "./Config/config";
import MessageParser from './MessageParser/MessageParser';
import ActionProvider from './ActionProvider/ActionProvider';
import Chatbot from "react-chatbot-kit";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./chatbot.module.css"
import chatImg from './chatbotIMG.png'
 
const MyChatBot = () => {

    const [showBot, setShowBot] = useState(false)

    function onHandleClick(e) {
        e.preventDefault()

        if(showBot) {
            setShowBot(false)
            window.scroll(0, 0)
        }
        else {
            setShowBot(true)
            window.scroll(0, 400);
        }
    };


    return (
        <div >
            {showBot && (
                <Fade big>
                    <div>
                        <button style={{marginLeft: '13.7rem'}} onClick={(e) => onHandleClick(e)}>Close</button>
                        <Chatbot
                            config={config}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                        />
                    </div>
                </Fade>
            )
            }
            <Flip left cascade>
                <button
                    className={styles.robot}
                    onClick={(e) => onHandleClick(e)}
                >
                    <img src={chatImg} alt="" width='50px'/>
                    <h6>E-Robb</h6>
                </button>
            </Flip>
        </div >
    );
};

export default MyChatBot;