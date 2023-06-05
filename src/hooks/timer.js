import {useEffect, useState} from 'react'

const { DateTime } = require('luxon');

export default function Calculator(){

const [nowInNY, setNowInNY] = useState(DateTime.local({zone: "America/New_York"}));

const startOfWeek = nowInNY.startOf('week');
const WED = 3;
const SUN = 7;
const daysToWED = (WED - startOfWeek.weekday + 7 ) %7;
const daysToSUN = (SUN - startOfWeek.weekday + 7 ) %7;

const nextWEDStream = startOfWeek.plus({days: daysToWED});
const nextSUNStream = startOfWeek.plus({days: daysToSUN});
// 
var YEAR
var MONTH
var DAY

if (nextWEDStream >= nowInNY) {
    YEAR = nextWEDStream.toFormat('yyyy')
    MONTH = nextWEDStream.toFormat('MM')
    DAY = nextWEDStream.toFormat('dd')
} else {
    YEAR = nextSUNStream.toFormat('yyyy')
    MONTH = nextSUNStream.toFormat('MM')
    DAY = nextSUNStream.toFormat('dd')
}

const nextStream = DateTime.fromFormat(`${MONTH}/${DAY}/${YEAR}, 9:00 PM`, 'f', {zone: "America/New_York"});
const timeDiff = nextStream.diff(nowInNY, ['days', 'hours', 'minutes', 'seconds'])

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
} else if (timeDiff.hours < 0 && timeDiff.hours > -2) {
    timeDiffFormatted = "Stream happening now! (probably)"
} else timeDiffFormatted = "Stream just ended (probably)"

useEffect(() => {
    const interval = setInterval(() => {
        setNowInNY(DateTime.local({zone: "America/New_York"}));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    return timeDiffFormatted
}