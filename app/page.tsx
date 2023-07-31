'use client'
import { useState, useEffect } from 'react';
import { useTimeTicker } from "./counter/counter";
import { useFormatter } from "./counter/timerFormat";
import { useGameName, useLive, useTitle } from "./external Data/streamInfo";



export default function Counter() {
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

  // const [title, setTitle] = useState<string | JSX.Element | undefined>(<></>)
  // const [timer, setTimer] = useState<string | JSX.Element | undefined>(<></>)

  // const updateTitle = async () => {
  //   if (await isLive) {
  //     setTitle(`Come watch us play ${game}`)
  //   } else {
  //     setTitle(<div><span>on:</span><br/>{localDate.toFormat("LLL dd', at' t ZZZZ")}<br/><span>(local time)</span></div>)
  //   }
  // }

  // const updateTimer = async () => {
  //   if (await isLive) {
  //     setTimer(await streamTitle)
  //   } else {
  //     setTimer(<div><span>Next stream is in:</span><br/>{time}</div>)
  //   }
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     updateTitle()
  //     updateTimer()
  //   }, 5*1000*60)

  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div>
      <div className="wrapper">
        <div className="bgIMG" />
        <div className="timer">
          {isLive? streamTitle : `Next stream is in ${time}`}
        </div>
        <div>
          {isLive? `Come watch us play ${game}` : `on: ${localDate.toFormat("LLL dd', at' t ZZZ")} (local time)`}
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
