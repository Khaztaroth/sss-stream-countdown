'use client'
import { useEffect, useState } from "react";
import { useTimeTicker } from "./counter/counter"
import { useFormatter } from "./counter/timerFormat";
import { useGameName, useLive, useTitle } from "./external data/channelData";



export default function Home() {
  const linkProperties = {
    target: "blank",
    rel: "noreferrer"
  }

  const [isSpecial, stream] = useTimeTicker()
  const time = useFormatter(stream.time)
  const streamTitle = useTitle()
  const isLive = useLive()
  const game = useGameName()

  const localDate = stream.date.toLocal();

  const [title, setTitle] = useState<Promise<string | JSX.Element>>()
  const [timer, setTimer] = useState<Promise<string | JSX.Element>>()

  const updateTitle = async () => {
    if (await isLive) {
      return (`Come watch us play ${game}`)
    } else {
      return (<div><span>on:</span><br/>{localDate.toFormat("LLL dd', at' t ZZZZ")}<br/><span>(local time)</span></div>)
    }
  }

  const updateTimer = async () => {
    if (await isLive) {
      return (streamTitle)
    } else return (<div><span>Next stream is in:</span><br/>{time}</div>)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTitle(updateTitle())
      setTimer(updateTimer())
    }, 5*1000*60)

    return () => clearInterval(interval)
  })

  return (
    <div>
      <div className="wrapper">
        <div className="bgIMG" />
        <div className="timer">
          {timer}
        </div>
        <div>
          {title}
        </div>
        <div>
          <a href="https://www.twitch.tv/secretsleepoversociety" {...linkProperties} title="Secret Sleepover Society Twitch Page">twitch.tv/<wbr/>secret<wbr/>sleepover<wbr/>society</a>
        </div>
      </div>
      <div className="footer">
        <a href="https://twitter.com/floabcomic" {...linkProperties} title="Jacob's twitter profile">@FLoaBComic</a> ||
        <a href="https://twitter.com/julialepetit" {...linkProperties} title="Julia's twitter profile">@JuliaLepetit</a> ||
        <a href="https://twitter.com/sss_stream" {...linkProperties} title="SSS' twitter profile">@sss_stream</a> ||
      </div>
    </div>
  )
}
