import '../styles/styles.css'
import '../files/LOGO.png'
import { timer } from '../hooks/useTimer'
import Calculator from '../hooks/useCalculate'
export default function Home() {

    const linkProperties = {
        target: "blank",
        rel: "noreferrer"
    }

const time = timer();
const special = Calculator()

return (
        <div className="wrapper">
            <div className="bgImg"></div>
            <h2 className="title">
                {special ? "Special Stream in:" : "Stream in:"}
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