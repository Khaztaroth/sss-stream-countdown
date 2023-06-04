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

var nextStream = DateTime.fromFormat(`${MONTH}/${DAY}/${YEAR}, 9:00 PM`, 'f');
var timeDiff = nextStream.diff(nowInNY)

var timeDiffFormatted
if (timeDiff.days > 0) {
    timeDiffFormatted = timeDiff.toFormat(
    `dd'${timeDiff.days === 1 ? 'day' : 'days'}'
    hh'${timeDiff.hours === 1 ? 'hour' : 'hours'} 
    mm'${timeDiff.minutes === 1 ? 'minute' : 'minutes'} 
    ss'${timeDiff.seconds === 1 ? 'second' : 'seconds'}' `
    )
} else timeDiffFormatted = timeDiff.toFormat(
    `hh'${timeDiff.hours === 1 ? 'hour' : 'hours'}'
    mm'${timeDiff.minutes === 1 ? 'minute' : 'minutes'}'
    ss'${timeDiff.seconds === 1 ? 'second' : 'seconds'}' `
    )

useEffect(() => {
    const interval = setInterval(() => {
        setNowInNY(DateTime.local({zone: "America/New_York"}));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    return timeDiffFormatted
}