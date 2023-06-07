import {useEffect, useState} from 'react'

const { DateTime } = require('luxon');

export default function Calculator(){

const inNY = {zone: "America/New_York"}
const [nowInNY, setNowInNY] = useState(DateTime.local(inNY));

const startOfWeek = nowInNY.startOf('week');
const days = {wed: 3, sun: 7}
const daysToWED = (days.wed - startOfWeek.weekday + 7 ) %7;
const daysToSUN = (days.sun- startOfWeek.weekday + 7 ) %7;

const nextWED = startOfWeek.plus({days: daysToWED});
const nextSUN = startOfWeek.plus({days: daysToSUN});

const nextWedDate = DateTime.fromFormat(`${nextWED.month}/${nextWED.day}/${nextWED.year}, 9:00 PM`, 'f', inNY);
const nextSunDate = DateTime.fromFormat(`${nextSUN.month}/${nextSUN.day}/${nextSUN.year}, 9:00 PM`, 'f', inNY);
const specialStream = DateTime.fromFormat(`06/07/2023, 7:00 PM`, 'f', inNY);

const timeUntilWedStream = nextWedDate.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds'])
const timeUntilSunStream = nextSunDate.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds'])
const timeUntilSpecialStream = specialStream.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds'])


    function nextRegularStream() {
        if (timeUntilWedStream.hours >= -2) {
            return timeUntilWedStream;
        } else {
            return timeUntilSunStream;
        }
    }

    function isSpecial() {
        if (timeUntilSpecialStream.hours >= -4) {
            return true
        } else return false
    }

    function timeDiff() {
        if (timeUntilSpecialStream.hours >= -4) {
            return timeUntilSpecialStream;
        } else {
            return nextRegularStream();
        }
    }

useEffect(() => {
    const interval = setInterval(() => {
        setNowInNY(DateTime.local(inNY));
    }, 1000);

    return () => clearInterval(interval);
    }); 

    return [timeDiff(), isSpecial()]
}