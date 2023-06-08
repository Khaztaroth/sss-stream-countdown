import { useEffect, useState } from "react"

const channel = 'secretsleepoversociety'

export function useLive() {
    const [isLive, setIsLive] = useState(true)
    
    useEffect(() => {
        fetch(`https://decapi.me/twitch/uptime/${channel}`)
        .then((res) => res.text())
        .then((data) => {
            if (data.includes('offline')){
                setIsLive(false)
            } else setIsLive(true)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])
    
    return isLive
}

export function useTitle() {
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        fetch(`https://decapi.me/twitch/status/${channel}`)
        .then((res) => res.text())
        .then((data) => {
            setTitle(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])
    
    return title
}

export function useGame() {
    const [game, setGame] = useState('')
    
    useEffect(() => {
        fetch(`https://decapi.me/twitch/game/${channel}`)
        .then((res) => res.text())
        .then((data) => {
            setGame(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])
    
    return game
}