import { useGame, useLive } from "./useChannelData";
import Calculator from "./useCalculate"

export function useTimer(){
    const [timeDiff] = Calculator();
    const isLive = useLive();
    const game = useGame();

    if (timeDiff.days > 0) {
        return (
            timeDiff.toFormat(
                `d'${timeDiff.days === 1 ? 'day' : 'days'}'
                h'${timeDiff.hours === 1 ? 'hour' : 'hours'}'
                m'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
                s'${timeDiff.seconds < 2 ? 'second' : 'seconds'}' `
                )
        )
    } else if (timeDiff.hours > 0) {
        return (
            timeDiff.toFormat(
                `h'${timeDiff.hours === 1 ? 'hour' : 'hours'}'
                m'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
                s'${timeDiff.seconds < 2 ? 'second' : 'seconds'}' `
                )
        )
    } else if (timeDiff.minutes > 0) {
        return (
            timeDiff.toFormat(
                `m'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
                s'${timeDiff.seconds < 2 ? 'second' : 'seconds'}' `
                )
        )
    } else if (timeDiff.seconds > 0) {
        return (
            timeDiff.toFormat(
                `s'${timeDiff.seconds < 1 ? 'second' : 'seconds'}' `
                )
        )
    } else {
     return (isLive ? `Come watch us play ${game}` : "Stream ended" )
    }
}