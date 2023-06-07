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
const timeUntiolSpecialStream = specialStream.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds'])


var nextRegularStream
if (timeUntilWedStream.hours >= -2) {
    nextRegularStream = timeUntilWedStream
} else {
    nextRegularStream = timeUntilSunStream
}

var timeDiff
if (timeUntiolSpecialStream.hours >= -4) {
    timeDiff = timeUntiolSpecialStream
} else {
    timeDiff = nextRegularStream
}

var timeDiffFormatted
if (timeDiff.days > 0) {
    timeDiffFormatted = timeDiff.toFormat(
        `d'${timeDiff.days === 1 ? 'day' : 'days'}'
        h'${timeDiff.hours === 1 ? 'hour' : 'hours'}'
        m'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
        s'${timeDiff.seconds < 2 ? 'second' : 'seconds'}' `
        )
} else if (timeDiff.hours > 0) {
    timeDiffFormatted = timeDiff.toFormat(
        `h'${timeDiff.hours === 1 ? 'hour' : 'hours'}'
        m'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
        s'${timeDiff.seconds < 2 ? 'second' : 'seconds'}' `
        )
} else if (timeDiff.minutes > 0) {
    timeDiffFormatted = timeDiff.toFormat(
        `m'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
        s'${timeDiff.seconds < 2 ? 'second' : 'seconds'}' `
        )
} else if (timeDiff.seconds > 0) {
    timeDiffFormatted = timeDiff.toFormat(
        `s'${timeDiff.seconds < 1 ? 'second' : 'seconds'}' `
        )
} else timeDiffFormatted = 'Stream happening now!'

useEffect(() => {
    const interval = setInterval(() => {
        setNowInNY(DateTime.local(inNY));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    return (
        <div>
            <h2 className="title">
            {timeUntiolSpecialStream.hours >= -4 ? 'Special Stream in:' : 'Stream in:'}
            </h2>
            <div className="timer">
                {timeDiffFormatted}
            </div>
        </div>
    )
}