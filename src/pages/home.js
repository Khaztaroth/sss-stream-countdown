import { useEffect, useState } from "react";
import Calculator from "../hooks/timer";

import '../styles/styles.css'
import '../files/LOGO.png'
export default function Home() {

    const [isDesktop, setDesktop] = useState(window.innerWidth > 1450)

    const updateMedia = () => {
        setDesktop(window.innerWidth > 1450)
    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia)
    })

    const linkProperties = {
        target: "blank",
        rel: "noreferrer"
    }

return (
        <div className="wrapper">
            <div className="bgImg">
            </div>
            <h2 className="title">
                Stream in:
            </h2>
            <div className="timer">
                <Calculator />
            </div>
            <div className="stream_url">
            <a href="https://www.twitch.tv/secretsleepoversociety" {...linkProperties} title="Secret Sleepover Society Twitch Page">twitch.tv/<br/>secretsleepoversociety</a>
            </div>  
            <div className="footer">
                <a href="https://twitter.com/floabcomic" {...linkProperties} title="Jacob's twitter profile">@FLoaBC</a> || 
                <a href="https://twitter.com/julialepetit" {...linkProperties} title="Julia's twitter profile">@JuliaLepetit</a> || 
                <a href="https://twitter.com/sss_stream" {...linkProperties} title="Secret Sleepover Society twitter proflie">@sss_stream</a> 
            </div>
        </div>
    )
}