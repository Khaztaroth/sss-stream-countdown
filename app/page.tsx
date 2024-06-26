'use client'
import { useTimeTicker } from "./api/counter/counter";
import { useFormatter } from "./api/counter/timeFormat";
import { useGameName, useLive, useTitle } from "./api/externalData/streamInfo";


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

  var label = isLive? streamTitle : streamInfo.isVacation? "Gone fishing!" : streamInfo.isSpecial? "Special stream in:" : "Next stream is in:"
  var timer = isLive? <></> : time
  var vacationTimer = ["We're hoping to be back on", <br key={"break"}/>, localTime.toFormat("LLL dd', at' t ZZZZ"), "(local time)"];
  var localTimer = isLive? `Come watch us play ${game}` : <><br/>on {localTime.toFormat("LLL dd', at' t ZZZZ")}<br/>(local time)</>

  return (
    <div className="bg-logo bg-center bg-no-repeat bg-contain" id="bg">
    <div className="flex-grow-2"></div>
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-solidGray bg-center bg-no-repeat bg-opacity-90" id="wrapper">
      <div className="flex flex-col flex-grow justify-center items-center m-2 px-2 border-4 md:border-6 border-white w-full " id="info">
        <div className="text-center text-8xl md:text-8xl xl:text-veryLarge font-dinBold flex flex-col flex-grow-1 pt-4 md:pt-6 mb-10 sm:mb-6 xl:mb-5 drop-shadow-mid" id="timer">
              <span className="mt-10 md:mt-0 2xl:mt-16 pb-10 md:pb-0 text-5xl md:text-7xl xl:text-8xl" id="label">
                {label}
              </span>
              <br/>
                {streamInfo.isVacation? '' : timer }
        </div>
        <div className="text-center text-5xl font-dinRegular pb-4 xl:pb-12 md:text-6xl xl:text-8xl flex flex-grow-1" id="localTimer">
          <span className="drop-shadow-close">
            {streamInfo.isVacation? vacationTimer : localTimer}
          </span>
        </div>
        <div className="text-center font-dinRegular text-2xl pt-4 md:text-4xl xl:text-5xl flex flex-grow-1" id="twitchLink">
          <a className="drop-shadow-close" href="https://www.twitch.tv/secretsleepoversociety" {...linkProperties} title="Secret Sleepover Society Twitch Page">twitch.tv/<wbr/>secret<wbr/>sleepover<wbr/>society</a>
        </div>
        <div className="flex-grow-2"></div>
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
