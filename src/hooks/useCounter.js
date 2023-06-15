import {useEffect, useState} from 'react'

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
        // console.log("DAY CALC:", nextDay.wed)

        const nextDate = {
            wed: startOfWeek.plus({days: nextDay.wed}),
            sun: startOfWeek.plus({days: nextDay.sun}),
            nextWed: startOfWeek.plus({days: nextDay.nextWed})
        }
        // console.log("DATES:", nextDate)

        const nextStreamDate = {
            wed: DateTime.fromFormat(`${nextDate.wed.month}/${nextDate.wed.day}/${nextDate.wed.year}, 9:00 PM`, 'f', inNY),
            sun: DateTime.fromFormat(`${nextDate.sun.month}/${nextDate.sun.day}/${nextDate.sun.year}, 9:00 PM`, 'f', inNY),
            nextWed: DateTime.fromFormat(`${nextDate.nextWed.month}/${nextDate.nextWed.day}/${nextDate.nextWed.year}, 9:00 PM`, 'f', inNY),
            special:  DateTime.fromFormat(`06/07/2023, 7:00 PM`, 'f', inNY)
        }
        // console.log("STREAM DATES:", nextStreamDate)

        const timeUntilStream = {
            wed: nextStreamDate.wed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
            sun: nextStreamDate.sun.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
            nextWed: nextStreamDate.nextWed.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
            special: nextStreamDate.special.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds']),
        }

        function nextRegularStream() {
            if (timeUntilStream.wed.hours > -2) {
                return timeUntilStream.wed;
            } else if (timeUntilStream.sun > -2){
                return timeUntilStream.sun;
            } else {
                return timeUntilStream.nextWed;
            }
        }
        
        function isSpecial() {
            if (timeUntilStream.special.hours > -2) {
                return true
            } else return false
        }
        
        function timeDiff() {
            if (timeUntilStream.special.hours > 2) {
                return timeUntilStream.special;
            } else {
                return nextRegularStream();
            }
        }

        return [isSpecial(), timeDiff()]
}




