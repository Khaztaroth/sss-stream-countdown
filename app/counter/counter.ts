import { useEffect, useState } from 'react';
import { DateTime, Duration } from 'luxon';

export type StreamInfo = {
    stream: string,
    time: Duration,
    date: DateTime,
    isSpecial: boolean,
  }

export function useTimeTicker(): StreamInfo {
    const inNY = {zone: "America/New_York"}
    const [nowInNY, setNowInNY] = useState(DateTime.local(inNY))

    useEffect(() => {
        const interval = setInterval(() => {
            setNowInNY(DateTime.local(inNY));
        }, 1000)

        return () => clearInterval(interval)
    })

    const startOfWeek = nowInNY.startOf('week')
    const days = {wed: 3, sun: 7}
    const nextDay = {
        wed: (days.wed - startOfWeek.weekday + 7) %7,
        sun: (days.sun - startOfWeek.weekday + 7) %7,
        nextWed: (days.wed - startOfWeek.weekday + 7) %14,
    }
    const nextDate = {
        wed: startOfWeek.plus({days: nextDay.wed}),
        sun: startOfWeek.plus({days: nextDay.sun}),
        nextWed: startOfWeek.plus({days: nextDay.nextWed})
    }
    const nextStreamDate = {
        wed: DateTime.fromFormat(`${nextDate.wed.month}/${nextDate.wed.day}/${nextDate.wed.year}, 9:00 PM`, 'f', inNY),
        sun: DateTime.fromFormat(`${nextDate.sun.month}/${nextDate.sun.day}/${nextDate.sun.year}, 9:00 PM`, 'f', inNY),
        nextWed: DateTime.fromFormat(`${nextDate.nextWed.month}/${nextDate.nextWed.day}/${nextDate.nextWed.year}, 9:00 PM`, 'f', inNY),
        special:  DateTime.fromFormat('08/10/2023, 9:00 PM', 'f', inNY)
    }
    const timeUntilStream = {
        wed: nextStreamDate.wed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        sun: nextStreamDate.sun.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        nextWed: nextStreamDate.nextWed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        special: nextStreamDate.special.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
    }

    function nextStream(): StreamInfo {
        if (timeUntilStream.special.days >=0 && timeUntilStream.special.hours >= -1) {
            return {
                stream: 'special stream',
                time: timeUntilStream.special,
                date: nextStreamDate.special,
                isSpecial: true
            }
        } else if (timeUntilStream.wed.days >=0 && timeUntilStream.wed.hours >= -1) {
            return {
                stream: 'Wednesday stream',
                time: timeUntilStream.wed,
                date: nextStreamDate.wed,
                isSpecial: false
            }
        } else if (timeUntilStream.sun.days >=0 && timeUntilStream.sun.hours >= -1) {
            return {
                stream: 'Sunday stream',
                time: timeUntilStream.sun,
                date: nextStreamDate.sun,
                isSpecial: false
            }
        } else {
            return {
                stream: 'Next Wednesday stream',
                time: timeUntilStream.nextWed,
                date: nextStreamDate.nextWed,
                isSpecial: false
            }
        }
    }

    return nextStream()
}