import React from "react";
import styles from "./BotAvatar.modules.css"
import imgBot from './chatbotIMG.png'

export default function Botavatar (){
    return <div style={{ marginRight: '1rem' }}>
            <img style={{ marginLeft: '0.3rem', backgroundColor: '#3fa3b9d0', borderRadius: '50px', padding: '2px'}} className={styles.botAvatar} src={imgBot} alt="?" width='50px'></img>
    </div>
};