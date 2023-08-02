'use client'
import { useTimeTicker } from "./counter/counter";
import { useFormatter } from "./counter/timerFormat";
import { useGameName, useLive, useTitle } from "./external Data/streamInfo";

export default function Counter() {
  const linkProperties = {
    target: "blank",
    rel: "noreferrer"
  }

  const streamInfo = useTimeTicker()
  const time = useFormatter(streamInfo.time)
  const streamTitle = useTitle()
  const isLive = useLive()
  const game = useGameName()

  const localTime = streamInfo.date.toLocal()

  return (
    <div className="bg-logo bg-center bg-no-repeat bg-contain" id="bg">
    <div className="w-11 overflow-hidden inline-block top-[-20] right-0 fixed">
      <div className="h-16 -rotate-45 transform origin-top-left hover:animate-fade"></div>
    </div>  
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-solidGray bg-center bg-no-repeat bg-opacity-90" id="wrapper">
      <div className="flex flex-col flex-grow justify-center items-center m-2 px-2 border-4 md:border-6 border-white w-full " id="info">
        <div className="text-center text-6xl md:text-8xl xl:text-veryLarge font-dinBold flex flex-col flex-grow-1 pt-4 md:pt-6 mb-10 sm:mb-20 drop-shadow-mid" id="timer">
              <span className="mt-10 md:mt-0 2xl:mt-20 pb-10 md:pb-0 text-5xl md:text-7xl xl:text-8xl" id="label">
                {isLive?
                      streamTitle : 
                      streamInfo.isSpecial? 
                        "Special stream is in:" : 
                        "Next stream is in:"
                }<br/>
                </span>
                {time}
        </div>
        <div className="text-center text-4xl font-dinRegular pb-4 xl:pb-12 md:text-6xl xl:text-8xl flex flex-grow-1" id="localTimer">
        <span className="drop-shadow-close">
          {isLive? 
            `Come watch us play ${game}` : 
            <>on:<br/>{localTime.toFormat("LLL dd', at' t ZZZZ")}<br/>(local time)</>}
            </span>
        </div>
        <div className="text-center font-dinRegular text-2xl pt-4 md:text-4xl xl:text-5xl flex flex-grow-2" id="twitchLink">
          <a className="drop-shadow-close" href="https://www.twitch.tv/secretsleepoversociety" {...linkProperties} title="Secret Sleepover Society Twitch Page">twitch.tv/<wbr/>secret<wbr/>sleepover<wbr/>society</a>
        </div>
      </div>
      <div className="mt-auto xl:mb-2 xl:mt-0 w-full">
      <footer className="text-center text-base xl:text-2xl font-dinRegular bg-accentRed text-slate-50" id="footer">
        <a href="https://twitter.com/floabcomic" {...linkProperties} title="Jacob's twitter profile">@FLoaBComic</a> ||
        <a href="https://twitter.com/julialepetit" {...linkProperties} title="Julia's twitter profile"> @JuliaLepetit</a> ||
        <a href="https://twitter.com/sss_stream" {...linkProperties} title="SSS' twitter profile">  @sss_stream</a>
      </footer>
      </div>
    </div>
    </div>
  )
}
