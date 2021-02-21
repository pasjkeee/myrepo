"use strict";
exports.__esModule = true;
function timer(daySelector, hourSelector, minuteSelector, secondSelector, endTime) {
    var dayNow = document.querySelector(daySelector), hoursNow = document.querySelector(hourSelector), minuteNow = document.querySelector(minuteSelector), secondsNow = document.querySelector(secondSelector);
    function setZero(obj) {
        if (obj < 10) {
            obj = '0' + obj;
        }
        return String(obj);
    }
    var Days = null, Hours = null, Minutes = null, Seconds = null;
    function gettingTime() {
        var time = Date.parse(endTime) - Date.parse(new Date() + "");
        Days = Math.floor(time / (1000 * 60 * 60 * 24));
        Days = setZero(Days);
        Hours = Math.floor((time - +Days * 1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        Hours = setZero(Hours);
        Minutes = Math.floor((time - +Days * 1000 * 60 * 60 * 24 - +Hours * 1000 * 60 * 60) / (1000 * 60));
        Minutes = setZero(Minutes);
        Seconds = Math.floor(time - +Days * 1000 * 60 * 60 * 24 - +Hours * 1000 * 60 * 60 - +Minutes * 1000 * 60) / 1000;
        Seconds = setZero(Seconds);
        dayNow.textContent = Days;
        hoursNow.textContent = Hours;
        minuteNow.textContent = Minutes;
        secondsNow.textContent = Seconds;
    }
    setInterval(gettingTime, 999);
}
exports["default"] = timer;
