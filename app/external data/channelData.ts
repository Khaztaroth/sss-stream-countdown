import { useEffect, useState } from "react";


const channel = 'secretsleepoversociety';

export async function useLive(): Promise<boolean> {
    const [isLive, setIsLive] = useState<boolean>(false)
    
    const uptimeData  = await fetch(`https://decapi.me/twitch/uptime/${channel}`, {next: {revalidate: 300}})
    if (!uptimeData.ok) {
        throw new Error('Failed to fetch uptime data')
    } 
    const uptime: string = JSON.stringify(uptimeData.json())
    
    if (uptime.includes('offline')) {
        setIsLive(false)
    } else setIsLive(true)

    return isLive
}

export async function useTitle(): Promise<string> {
    const [title, setTitle] = useState<string>('')

    const titleData = await fetch(`https://decapi.me/twitch/status/${channel}`, {next: {revalidate: 300}})
    if (!titleData.ok) {
        throw new Error('Failed to fetch title data')
    } else {
        setTitle(
            JSON.stringify(titleData.json())
        )
    }

    return title
}

export async function useGameName(): Promise<string> {
    const [gameName, setGameName] = useState<string>('')

    const gameNameData = await fetch(`https://decapi.me/twitch/game/${channel}`, {next: {revalidate: 300}})
    if (!gameNameData.ok) {
        throw new Error('Failed to fecth game data')
    } else {
        setGameName(
            JSON.stringify(gameNameData.json())
        )
    }

    return gameName
}