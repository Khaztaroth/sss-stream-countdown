import '../styles/styles.css'
import '../files/LOGO.png'
import Calculator from '../hooks/useCalculate'
import { useTimer } from '../hooks/useTimer'
import { useGame, useLive, useTitle } from '../hooks/useChannelData'

export default function Home() {

    const linkProperties = {
        target: "blank",
        rel: "noreferrer"
    }

const time = useTimer();
const special = Calculator();
const title = useTitle();
const isLive = useLive();

return (
        <div className="wrapper">
            <div className="bgImg"></div>
            <h2 className="title">
                {isLive ? `${title}` : special ? "Special stream in:" : "Stream in:"}
            </h2>
            <div className="timer">
                {time}
            </div>
            <div className="stream_url">
            <a href="https://www.twitch.tv/secretsleepoversociety" {...linkProperties} title="Secret Sleepover Society Twitch Page">twitch.tv/<br/>secretsleepoversociety</a>
            </div> 
            <div className="footer">
                <a href="https://twitter.com/floabcomic" {...linkProperties} title="Jacob's twitter profile">@FLoaBComic</a> || 
                <a href="https://twitter.com/julialepetit" {...linkProperties} title="Julia's twitter profile">@JuliaLepetit</a> || 
                <a href="https://twitter.com/sss_stream" {...linkProperties} title="Secret Sleepover Society twitter proflie">@sss_stream</a> 
            </div>
        </div>
    )
}