import { useEffect, useState } from 'react';
import { DateTime, Duration } from 'luxon';
import { useActiveDays } from '../externalData/activeDays';

export type StreamInfo = {
    stream: string,
    time: Duration,
    date: DateTime,
    isSpecial: boolean,
    isVacation?: boolean;
  }

  export class Days extends Object {
        wed?: boolean;
        sun?: boolean;
        nextWed?: boolean;
        special?: string;
        vacation?: string;
  }

function ParseDaysData() {
    const activeDays = useActiveDays()

    if (activeDays !== '') {
        return JSON.parse(activeDays)
    } else {
        return 
    }
}

export function useTimeTicker(): StreamInfo {
    const inNY = {zone: "America/New_York"}
    const [nowInNY, setNowInNY] = useState(DateTime.local(inNY))

    const activeDays: Days = ParseDaysData()
    const specialSchedule:string | undefined = activeDays?.special || ''
    const vacation:string | undefined = activeDays?.vacation || ''
        
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
        special:  DateTime.fromISO(specialSchedule).setZone(inNY.zone),
        vacation: DateTime.fromISO(`${vacation}T21:00:00.000-04:00`).setZone(inNY.zone)
    }
    const timeUntil = {
        wed: nextStreamDate.wed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        sun: nextStreamDate.sun.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        nextWed: nextStreamDate.nextWed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        special: nextStreamDate.special.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        vacation: nextStreamDate.vacation.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds'])
    }

    console.log("Vacation",  vacation)
    console.log("Vac date", nextStreamDate.vacation)
    console.log("Vac time", timeUntil.vacation)

    function nextStream(): StreamInfo {
        if (!activeDays?.wed && !activeDays?.sun && !activeDays?.nextWed) {
            return {
                stream: 'Gone Fishing',
                time: timeUntil.vacation,
                date: nextStreamDate.vacation,
                isSpecial: false,
                isVacation: true,
                }
        }
        else if (timeUntil.special.days >=0 && timeUntil.special.hours >= -1) {
            return {
                stream: 'special stream',
                time: timeUntil.special,
                date: nextStreamDate.special,
                isSpecial: true,
                isVacation: false,
            }
        } else if (activeDays?.wed === true && timeUntil.wed.days >=0 && timeUntil.wed.hours >= -1) {
            return {
                stream: 'Wednesday stream',
                time: timeUntil.wed,
                date: nextStreamDate.wed,
                isSpecial: false,
                isVacation: false,
            }
        } else if (activeDays?.sun === true && timeUntil.sun.days >=0 && timeUntil.sun.hours >= -1) {
            return {
                stream: 'Sunday stream',
                time: timeUntil.sun,
                date: nextStreamDate.sun,
                isSpecial: false,
                isVacation: false,
            }
        } else {
            return {
                stream: 'Next Wednesday stream',
                time: timeUntil.nextWed,
                date: nextStreamDate.nextWed,
                isSpecial: false,
                isVacation: false,
            }
        }
    }

    return nextStream()
}