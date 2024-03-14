import NodeCache from "node-cache";
import { useEffect, useState } from "react";

const cache = new NodeCache({stdTTL: 5*60})

export function useActiveDays(): string {
    const [activeDays, setActiveDays] = useState<string>('')
    const cachedActiveDays: string | undefined = cache.get('days')

    async function daysData() {
        if (cachedActiveDays === undefined) {
            const res = await fetch('https://sss-timer-dashboard.khaz.workers.dev/dash', {next: {revalidate: 600}})
            if (!res.ok) {
                throw new Error('Failed to fetch days data')
            } else {
                var resp = await res.text()
                cache.set('days', resp)
                setActiveDays(resp)
            }
        } else {
            setActiveDays(cachedActiveDays)
        }
    }

    useEffect(() => {
        daysData()
    })
    return activeDays
}