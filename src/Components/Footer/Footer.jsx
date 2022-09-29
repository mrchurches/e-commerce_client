import React from "react";
import styles from "./Footer.module.css";
import { useLocation } from "react-router-dom";
import { info } from './personalInfo.js'
import github from './github.png'
import linkedin from './linkedin.png'
import email from './mail.png'


export default function About() {
    let location = useLocation()

    var display = 'block'
    if (location.pathname === "/admin") {
        display = 'none'
    }
    return (
        <div>
        <nav className={styles.mainFooter} style={{ display: display, borderRadius: '0' }}>
            <h1 class='p-4'>Development team</h1>
            <div className={styles.footer}>
             {info.map((profile, index) => {
                return (
                    <div classkey={index} style={{width: "34rem"}} className={styles.cards}>
                            <div class=" p-2 d-flex m-3">
                                <div>
                                    <img src={profile.img} class="card-body "  alt="..." className={styles.profilePic}  />
                                </div>
                                
                                <div class='m-4'>
                                    <h1 class="card-title" style={{fontSize: "1.5rem"}}>{profile.name}</h1>
                                            <p class="card-text" style={{fontSize: "0.9rem"}}>{profile.location}</p>
                                        <p class="card-text mt-5" style={{fontSize: "1.2rem"}}>{profile.title}</p>
                                        <div class='d-flex' style={{justifyContent: 'center'}}>
                                        <a target='_blank' href={profile.linkedin} class='m-2' ><img className={styles.icons} src={linkedin} alt="" width="30" /> </a>
                                        <a target='_blank' href={profile.github} class='m-2' ><img className={styles.icons} src={github} width="30" /></a>
                                        <a href={(profile.icon_mail)} class='m-2' ><img className={styles.icons} src={email} width="30" height="32"/></a>
                                    </div>
                                </div>
                    </div>

                    </div>
                    )})
                
           }
           </div >
                <div className={styles.tech} > 
                    <img className={styles.imge} style={{width: '18rem', height: '12rem'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" alt="" /> 
                    <img className={styles.imge} style={{width: '10rem', height: '10rem'}} src="https://miro.medium.com/max/384/1*To2H39eauxaeYxYMtV1afQ.png" alt="" /> 
                    <img className={styles.imge} style={{width: '16rem', height: '12rem'}} src="https://lh4.googleusercontent.com/BhaBIBHhT_czDE-0mQrO5KA3T7b06XMbN0WC487QjdTlreORD59wdlOkMQ41f4XId9j5cjPnxW0bFSrEskZdL-_sDt50E1UGU0a1Q-RMAcTj5PJ2xjDBd02gnwslJETQAmraXflM" alt="" /> 
                    <img className={styles.imge} style={{width: '14rem', height: '12rem'}} src="https://www.am-design.es/Content/img/Bootstrap1.png" alt="" /> 
                    <img className={styles.imge} style={{width: '14rem', height: '12rem'}} src="https://media.geeksforgeeks.org/wp-content/uploads/javascript-36f5949a45.png" alt="" /> 
                    <img className={styles.imge} style={{width: '24rem', height: '12rem'}} src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_21a537a2f60ea582bd213cab0722cb1a/express-js.png" alt="" /> 
                    <img  className={styles.imge}style={{width: '14rem', height: '14rem'}} src="https://i3.wp.com/www.bacula.lat/wp-content/uploads/2019/05/postgresql-logo.png" alt="" />
                </div>
        </nav>

        </div>

    )
}