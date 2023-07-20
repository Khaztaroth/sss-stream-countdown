import {useEffect, useState} from 'react'
import { DaysStreaming } from './daysConfig'

const { DateTime } = require('luxon');


export function useTimeTicker(){
    const inNY = {zone: "America/New_York"}
    const [nowInNY, setNowInNY] = useState(DateTime.local(inNY));

    useEffect(() => {
        const interval = setInterval(() => {
            setNowInNY(DateTime.local(inNY));
        }, 1000);
    
        return () => clearInterval(interval);
        }); 

        const startOfWeek = nowInNY.startOf('week');
        const days = {wed: 3, sun: 7}
        const nextDay = { 
            wed: (days.wed - startOfWeek.weekday + 7 ) %7,
            sun:  (days.sun - startOfWeek.weekday + 7 ) %7,
            nextWed: (days.wed - startOfWeek.weekday + 21 ) %14,
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
            special:  DateTime.fromFormat('06/07/2023, 9:00 PM', 'f', inNY)
        }
        const timeUntilStream = {
            wed: nextStreamDate.wed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
            sun: nextStreamDate.sun.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
            nextWed: nextStreamDate.nextWed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
            special: nextStreamDate.special.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        }

        function nextStream() {
            if (timeUntilStream.special.hours >= 24 && timeUntilStream.special.hours >= -1) {
                return {
                    stream: 'Special stream',
                    time: timeUntilStream.special, 
                    date: nextStreamDate.special,
                };
            } else if (timeUntilStream.wed.hours <= 23 && timeUntilStream.wed.hours >= -1 && DaysStreaming.WED === true ) {
                return {
                    stream: 'Wednesday Stream',
                    time: timeUntilStream.wed, 
                    date: nextStreamDate.wed,
                };
            } else if (timeUntilStream.sun.hours <= 23 && timeUntilStream.sun.hours >= -1 && DaysStreaming.SUN === true ){
                return {
                    stream: 'Ssunday Stream',
                    time: timeUntilStream.sun, 
                    date: nextStreamDate.sun,
                };
            } else {
                return {
                    stream: 'Next Wednesday Stream',
                    time: timeUntilStream.nextWed, 
                    date: nextStreamDate.nextWed,
                };
            }
        };
        
        function isSpecial() {
            if (timeUntilStream.special.hours > -2) {
                return true
            } else return false
        };
    

        return [isSpecial(), nextStream()]
}




