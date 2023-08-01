'use client'
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

  const localTime = stream.date.toLocal()

  return (
    <div className="bg-logo bg-center bg-no-repeat bg-contain" id="bg">
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-solidGray bg-center bg-no-repeat bg-opacity-90" id="wrapper">
      <div className="flex flex-col flex-grow justify-center items-center m-2 px-2 border-4 md:border-6 border-white w-full " id="info">
        <div className="text-center text-6xl md:text-8xl xl:text-veryLarge pb-10 font-dinBold drop-shadow-mid" id="timer">
              <span className="text-6xl md:text-8xl flex-grow-1" id="label">
                {isLive?
                      streamTitle : 
                      isSpecial? 
                        "Special stream is in:" : 
                        "Next stream is in:"
                }<br/>
                </span>
                {time}
        </div>
        <div className="text-center text-4xl font-dinRegular pb-2 md:text-5xl xl:text-7xl flex flex-grow-2" id="timer">
        <span className="drop-shadow-close">
          {isLive? 
            `Come watch us play ${game}` : 
            <>on:<br/>{localTime.toFormat("LLL dd', at' t ZZZZ")}<br/>(local time)</>}
            </span>
        </div>
        <div className="text-center font-dinRegular text-2xl pt-4 md:text-3xl xl:text-4xl flex flex-grow-2" id="twitchLink">
          <a className="drop-shadow-close" href="https://www.twitch.tv/secretsleepoversociety" {...linkProperties} title="Secret Sleepover Society Twitch Page">twitch.tv/<wbr/>secret<wbr/>sleepover<wbr/>society</a>
        </div>
      </div>
      <div className="mt-auto xl:mt-0 w-full">
      <footer className="text-center text-xs xl:text-lg font-dinRegular bg-accentRed" id="footer">
        <a href="https://twitter.com/floabcomic" {...linkProperties} title="Jacob's twitter profile"> @FLoaBComic</a> ||
        <a href="https://twitter.com/julialepetit" {...linkProperties} title="Julia's twitter profile"> @JuliaLepetit</a> ||
        <a href="https://twitter.com/sss_stream" {...linkProperties} title="SSS' twitter profile"> @sss_stream</a>
      </footer>
      </div>
    </div>
    </div>
  )
}
