function timer(daySelector: string, hourSelector: string, minuteSelector: string, secondSelector: string, endTime: string) {

    const dayNow = document.querySelector<HTMLElement>(daySelector),
    hoursNow = document.querySelector<HTMLElement>(hourSelector),
    minuteNow = document.querySelector<HTMLElement>(minuteSelector),
    secondsNow = document.querySelector<HTMLElement>(secondSelector);


    type StrOrNum = string | number;

    function setZero(obj: StrOrNum): string {
        if (obj < 10) {
            obj = '0' + obj;
        }
        return String(obj);
    }
    
    let Days: StrOrNum = null,
        Hours: StrOrNum = null,
        Minutes: StrOrNum = null,
        Seconds: StrOrNum = null;
    
    function gettingTime() {
        const time = Date.parse(endTime) - Date.parse(new Date() + "");
        Days = Math.floor(time/(1000*60*60*24));
        Days = setZero(Days);
        Hours = Math.floor((time - +Days*1000*60*60*24)/(1000*60*60));
        Hours = setZero(Hours);
        Minutes = Math.floor((time - +Days*1000*60*60*24 - +Hours*1000*60*60)/(1000*60));
        Minutes = setZero(Minutes);
        Seconds = Math.floor(time - +Days*1000*60*60*24 - +Hours*1000*60*60 - +Minutes*1000*60)/1000;
        Seconds = setZero(Seconds);
        dayNow.textContent = Days;
        hoursNow.textContent = Hours;
        minuteNow.textContent = Minutes;
        secondsNow.textContent = Seconds;
    }
    
    setInterval(gettingTime, 999);

}

export default timer;