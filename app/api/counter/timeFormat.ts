import { Duration } from "luxon";

export function useFormatter(timeDiff: Duration) {
    if (timeDiff.days > 0) {
        return (
            timeDiff.toFormat(
                `d '${timeDiff.days === 1 ? 'day' : 'days'}' h '${timeDiff.hours === 1 ? 'hour' : 'hours'}' m '${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'`
            )
        )
    } else if (timeDiff.hours > 0) {
        return (
            timeDiff.toFormat(
                `h '${timeDiff.hours === 1 ? 'hour' : 'hours'}' m '${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'`
            )
        )
    } else if (timeDiff.minutes > 0) {
        return (
            timeDiff.toFormat(
                `m '${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'`
            )
        )
    } else if (timeDiff.seconds > 0) {
        return (
           timeDiff.toFormat(
            `s ${timeDiff.seconds < 2 ? "'s'econ'd'" : "'s'econ'ds'"}`
           )
        )
    } else if (timeDiff.seconds < 0 && timeDiff.seconds > -3600) {
        return (
            "Stream in progress come check us live!"
        )
    } else {
        return (
            "Stream ended, come back next time!"
        )
    }
}