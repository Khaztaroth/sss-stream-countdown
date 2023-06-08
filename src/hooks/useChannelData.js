import { useEffect, useState } from "react"

export function useLive() {
    const [isLive, setIsLive] = useState(true)
    
    useEffect(() => {
        fetch('https://decapi.me/twitch/uptime/secretsleepoversociety')
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
        fetch('https://decapi.me/twitch/status/secretsleepoversociety')
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
