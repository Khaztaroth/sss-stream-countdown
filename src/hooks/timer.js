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
const timeDiff = nextStream.diff(nowInNY)

var timeDiffFormatted

if (timeDiff.as('days') > 1) {
    timeDiffFormatted = timeDiff.toFormat(
        `dd'${timeDiff.days === 1 ? 'day' : 'days'}'
        hh'${timeDiff.hours === 1 ? 'hour' : 'hours'}'
        mm'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
        ss'${timeDiff.seconds === 1 ? 'second' : 'seconds'}' `
        )
} else if (timeDiff.as('hours') > 1) {
    timeDiffFormatted = timeDiff.toFormat(
        `hh'${timeDiff.hours === 1 ? 'hour' : 'hours'}'
        mm'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
        ss'${timeDiff.seconds === 1 ? 'second' : 'seconds'}' `
        )
} else if (timeDiff.as('minutes') > 1) {
    timeDiffFormatted = timeDiff.toFormat(
        `mm'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
        ss'${timeDiff.seconds === 1 ? 'second' : 'seconds'}' `
        )
} else if (timeDiff.as('seconds') > 1) {
    timeDiffFormatted = timeDiff.toFormat(
        `ss'${timeDiff.seconds === 1 ? 'second' : 'seconds'}' `
        )
} else if (timeDiff.as('hours') < 0 && timeDiff.as('hours') > -2) {
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