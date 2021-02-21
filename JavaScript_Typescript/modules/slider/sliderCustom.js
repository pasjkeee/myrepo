"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
function sliderCustom(sliderSourse, sliderContainerSelector, sliderItemClass, sliderDirection, arrows) {
    if (sliderDirection === void 0) { sliderDirection = "horizontal"; }
    if (arrows === void 0) { arrows = true; }
    var sliderContainer = document.querySelector(sliderContainerSelector);
    var sliderPos = 0;
    var slideItem = [];
    if (sliderSourse.length < 3) {
        sliderSourse = __spreadArray(__spreadArray(__spreadArray([], sliderSourse), sliderSourse), sliderSourse);
    }
    sliderContainer.style.display = 'flex';
    if (sliderDirection == "vertical") {
        sliderContainer.style.flexDirection = "column";
        sliderContainer.style.overflowY = "hidden";
        sliderContainer.style.height = '600px';
        sliderContainer.style.width = 'auto';
        sliderContainer.style.top = '0px';
    }
    if (sliderDirection == "horizontal") {
        sliderContainer.style.left = '0px';
        sliderContainer.style.alignItems = 'center';
        sliderContainer.style.overflowX = "hidden";
        sliderContainer.style.width = '100%';
        sliderContainer.style.height = '400px';
    }
    function sliderInitRight(startClass, middleClass, endClass) {
        sliderPos++;
        if (sliderPos === sliderSourse.length) {
            sliderPos = 0;
        }
        if (sliderPos === 0) {
            slideItem[sliderSourse.length - 2].classList.remove(startClass);
        }
        else if (sliderPos === 1) {
            slideItem[sliderSourse.length - 1].classList.remove(startClass);
        }
        else {
            slideItem[sliderPos - 2].classList.remove(startClass);
        }
        if (sliderPos === 0) {
            slideItem[sliderSourse.length - 1].classList.remove(middleClass);
            slideItem[sliderSourse.length - 1].classList.add(startClass);
        }
        else {
            slideItem[sliderPos - 1].classList.remove(middleClass);
            slideItem[sliderPos - 1].classList.add(startClass);
        }
        slideItem[sliderPos].classList.remove(endClass);
        slideItem[sliderPos].classList.add(middleClass);
        if (sliderPos === sliderSourse.length - 1) {
            slideItem[0].classList.add(endClass);
        }
        else {
            slideItem[sliderPos + 1].classList.add(endClass);
        }
    }
    function sliderInitLeft(startClass, middleClass, endClass) {
        sliderPos--;
        if (sliderPos === -1) {
            sliderPos = sliderSourse.length - 1;
        }
        slideItem[sliderPos].classList.remove(startClass);
        slideItem[sliderPos].classList.add(middleClass);
        if (sliderPos === 0) {
            slideItem[sliderSourse.length - 1].classList.add(startClass);
        }
        else {
            slideItem[sliderPos - 1].classList.add(startClass);
        }
        if (sliderPos === sliderSourse.length - 1) {
            slideItem[1].classList.remove(endClass);
            slideItem[0].classList.remove(middleClass);
            slideItem[0].classList.add(endClass);
        }
        else if (sliderPos === sliderSourse.length - 2) {
            slideItem[0].classList.remove(endClass);
            slideItem[sliderPos + 1].classList.remove(middleClass);
            slideItem[sliderPos + 1].classList.add(endClass);
        }
        else {
            slideItem[sliderPos + 1].classList.remove(middleClass);
            slideItem[sliderPos + 1].classList.add(endClass);
            slideItem[sliderPos + 2].classList.remove(endClass);
        }
    }
    function slideRightBot() {
        if (sliderDirection == "vertical") {
            sliderInitRight('topSlide', 'mainSlide', 'bottomSlide');
        }
        if (sliderDirection == "horizontal") {
            sliderInitRight('leftSlide', 'mainSlide', 'rightSlide');
        }
    }
    function slideLeftTop() {
        if (sliderDirection == "vertical") {
            sliderInitLeft('topSlide', 'mainSlide', 'bottomSlide');
        }
        if (sliderDirection == "horizontal") {
            sliderInitLeft('leftSlide', 'mainSlide', 'rightSlide');
        }
    }
    var arrL = document.createElement('div'), arrR = document.createElement('div');
    function setArr(elem) {
        elem.style.position = "absolute";
        elem.style.zIndex = "100";
        elem.style.fontSize = "40px";
        elem.style.width = "30px";
        elem.style.height = "30px";
        elem.style.cursor = "pointer";
        elem.style.top = "50%";
        elem.style.transform = "translateY(-50%)";
        if (elem == arrL) {
            elem.style.left = "0px";
            elem.innerHTML = "<button class=\"main-slider-btn main-prev-btn\">\n                    <img src=\"../dist/assets/img/left-arr.png\" alt=\"left\">\n                </button>\n                ";
        }
        if (elem == arrR) {
            elem.style.right = "0px";
            elem.innerHTML = "\n                <button class=\"main-slider-btn main-next-btn\">\n                    <img src=\"../dist/assets/img/right-arr.png\" alt=\"right\">\n                </button>\n                ";
        }
    }
    if (arrows) {
        sliderContainer.style.position = 'relative';
        setArr(arrL);
        setArr(arrR);
        sliderContainer.appendChild(arrL);
        sliderContainer.appendChild(arrR);
        var intervalSlideRight_1 = setInterval(slideRightBot, 3000);
        arrL.addEventListener('click', function () {
            slideLeftTop();
            clearInterval(intervalSlideRight_1);
        });
        arrR.addEventListener('click', function () {
            slideRightBot();
            clearInterval(intervalSlideRight_1);
        });
    }
    sliderSourse.forEach(function (slide, i) {
        slideItem[i] = document.createElement('div');
        slideItem[i].classList.add(sliderItemClass);
        slideItem[i].style.width = "100%";
        slideItem[i].style.height = "100%";
        slideItem[i].style.transition = "0.3s all ease";
        // if(sliderDirection == "vertical"){
        //     slideItem[i].style.height = "100%";
        // }
        slideItem[i].innerHTML = "" + slide;
        slideItem[i].style.overflow = "hidden";
        sliderContainer.appendChild(slideItem[i]);
    });
    if (sliderDirection == "vertical") {
        slideItem[sliderSourse.length - 1].classList.add('topSlide');
        slideItem[sliderPos].classList.add('mainSlide');
        slideItem[sliderPos + 1].classList.add('bottomSlide');
    }
    if (sliderDirection == "horizontal") {
        slideItem[sliderSourse.length - 1].classList.add('leftSlide');
        slideItem[sliderPos].classList.add('mainSlide');
        slideItem[sliderPos + 1].classList.add('rightSlide');
    }
}
exports["default"] = sliderCustom;
