import NodeCache from "node-cache";
import { useState } from "react";


const channel = 'secretsleepoversociety';
const cache = new NodeCache({stdTTL: 5*60})

export function useLive(): boolean{
    const [isLive, setIsLive] = useState<boolean>(false)
    const cachedUptime: string | undefined = cache.get('uptime')
    
    async function uptimeData() {
        if (cachedUptime === undefined) {
            const res = await fetch(`https://decapi.me/twitch/uptime/${channel}`, {next: {revalidate: 300}})
            if (!res.ok) {
                throw new Error('Failed to fecth uptime data')
            } else {
                var resp = await res.text()
                cache.set('uptime', resp)
                if (resp.includes('offline')) {
                    setIsLive(false)
                } else {
                    setIsLive(true)
                }
            }
        } else {
            if (cachedUptime?.includes('offline')) {
                setIsLive(false)
            } else {
                setIsLive(true)
            }
        }

    }

    uptimeData()
    return isLive
}

export function useTitle(): string | undefined {
    const [title, setTitle] = useState<string>('')
    const cachedTitle: string | undefined = cache?.get('title')

    async function titleData() {
        if (cachedTitle === undefined) {
            const res = await fetch(`https://decapi.me/twitch/status/${channel}`, {next: {revalidate: 300}})
            if (!res.ok) {
                throw new Error('Failed to fetch title data')
            } else {
                var resp = await res.text()
                cache.set('title', resp)
                setTitle(resp)
            }
        } else {
            setTitle(cachedTitle)
        }
    }

    titleData()
    return title
}

export function useGameName(): string {
    const [gameName, setGameName] = useState<string>('')
    const cachedGameName: string | undefined = cache.get('gameName')

    async function gameNameData() {
        if (cachedGameName === undefined) {
            const res = await fetch(`https://decapi.me/twitch/game/${channel}`, {next: {revalidate: 300}})
            if (!res.ok) {
                throw new Error('Failed to fecth game data')
            } else {
                var resp = await res.text()
                cache.set('gameName', resp)
                setGameName(resp)
            }
        } else {
            setGameName(cachedGameName)
        }
    }

    gameNameData()
    return gameName
}