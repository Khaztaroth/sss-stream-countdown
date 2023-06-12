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

const [title, setTitle] = useState('')
const [timer, setTimer] = useState('')

function updateTitle() {
    if (isLive) {
        return streamTitle
    } else if (isSpecial) {
        return (<span>on: <br/> {stream.date.toFormat("DDD 'at' t ZZZZ")}</span>);
    } else return (<span>on: <br/> {stream.date.toFormat("DDD 'at' t ZZZZ")}</span>)
}

function updateTimer() {
    if (isLive) {
        return (`Come watch us play ${game}`)
    } else return (<span>Next stream is in: <br/> {time}</span>)
}

useEffect(() => {
    const interval = setInterval(() => {
        setTitle(updateTitle());
        setTimer(updateTimer());
    }, 1000);

    return () => clearInterval(interval);
    }); 


return (
        <div className="wrapper">
            <div className="bgImg"></div>
            <h2 className="timer">
                {timer}
            </h2>
            <div className="title">
                {title}
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