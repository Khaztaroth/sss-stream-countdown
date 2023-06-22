import '../styles/styles.css'
import '../files/LOGO.png'
import { useFormatter } from '../hooks/useTimer'
import { useGame, useLive, useTitle } from '../hooks/useChannelData'
import { useTimeTicker } from '../hooks/useCounter'
import { useEffect, useState } from 'react'


export default function Home() {
    const linkProperties = {
        target: "blank",
        rel: "noreferrer"
    }

const [isSpecial, stream] = useTimeTicker();
const time = useFormatter(stream.time);
const streamTitle = useTitle();
const isLive = useLive();
const game = useGame();

const localDate = stream.date.toLocal()


const [title, setTitle] = useState('')
const [timer, setTimer] = useState('')

function updateTitle() {
    if (isLive) {
        return (`Come watch us play ${game}`)
    } else if (isSpecial) {
        return (<div><span>on:</span><br/>{localDate.toFormat("LLL dd', at' t ZZZZ")}<br/>(local time)</div>);
    } else return (<div><span>on:</span><br/>{localDate.toFormat("LLL dd', at' t ZZZZ")}<br/>(local time)</div>)
}

function updateTimer() {
    if (isLive) {
        return (streamTitle)
    } else return (<div><span>Next stream is in:</span><br/>{time}</div>)
}

useEffect(() => {
    const interval = setInterval(() => {
        setTitle(updateTitle());
        setTimer(updateTimer());
    }, 1000);

    return () => clearInterval(interval);
    }); 

return (
    <div>
        <div className="wrapper">
            <div className="bgImg"></div>
            <div className="timer">
                {timer}
            </div>
            <div className="title">
                {title}
            </div>
            <div className="stream_url">
            <a href="https://www.twitch.tv/secretsleepoversociety" {...linkProperties} title="Secret Sleepover Society Twitch Page">twitch.tv/<wbr/>secret<wbr/>sleepover<wbr/>society</a>
            </div> 
        </div>
        <div className="footer">
                <a href="https://twitter.com/floabcomic" {...linkProperties} title="Jacob's twitter profile">@FLoaBComic</a> || 
                <a href="https://twitter.com/julialepetit" {...linkProperties} title="Julia's twitter profile">@JuliaLepetit</a> || 
                <a href="https://twitter.com/sss_stream" {...linkProperties} title="Secret Sleepover Society twitter proflie">@sss_stream</a> 
        </div>
    </div>
    )
}