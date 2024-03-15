'use client'
import { useState } from "react"

export default function Dashboard () {

    const [wed, setWed] = useState(true)
    const [sun, setSun] = useState(true)
    const [nextWed, setNextWed] = useState(true)

    const days = {wed: wed, sun: sun, nextWed: nextWed}

    const handleWed = () => {
        setWed(!wed)
    }
    const handleSun = () => {
        setSun(!sun)
    }
    const handleNextWed = () => {
        setNextWed(!nextWed)
    }

    const addDays = () => {
        fetch("/external/dayConfig", {
            method: "POST",
            body: JSON.stringify({
                days,
            }),
            headers: {
                "content-type": "application/json"
            },
        }).catch((e) => console.log(e))
    };

    return (
        <div style={{color:"black"}}>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                addDays()
            }}
            >
                <label>
                    <input type="checkbox" checked={wed} onChange={handleWed}></input>
                    Wednesday
                </label>
                <label>
                    <input type="checkbox" checked={sun} onChange={handleSun}></input>
                    Sunday
                </label>
                <label>
                    <input type="checkbox" checked={nextWed} onChange={handleNextWed}></input>
                    Following Wednesday
                </label>
                <div>
                <button type="submit">Set days</button>
                </div>
            </form>
        </div>
    )
}