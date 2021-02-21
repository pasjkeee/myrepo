"use strict";
exports.__esModule = true;
exports.calcScroll = exports.closeAllModal = void 0;
function calcScroll() {
    var div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
}
exports.calcScroll = calcScroll;
function closeAllModal() {
    var windows = document.querySelectorAll('[data-modal]');
    windows.forEach(function (item) {
        item.style.zIndex = "100";
        item.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = "0px";
        item.classList.add('animated', 'fadeIn');
    });
}
exports.closeAllModal = closeAllModal;
var modals = function () {
    var btnPressed = false;
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay) {
        if (closeClickOverlay === void 0) { closeClickOverlay = true; }
        var trigger = document.querySelectorAll(triggerSelector), modal = document.querySelector(modalSelector), close = document.querySelector(closeSelector);
        var scroll = calcScroll();
        closeAllModal();
        trigger.forEach(function (item) {
            item.addEventListener('click', function (e) {
                if (e.target) {
                    e.preventDefault();
                }
                btnPressed = true;
                closeAllModal();
                modal.classList.add('faded');
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = scroll + "px";
            });
        });
        close.addEventListener('click', function () {
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = "0px";
            closeAllModal();
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal && closeClickOverlay) {
                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = "0px";
                closeAllModal();
            }
        });
    }
    function showModalByTime(selector, time) {
        setTimeout(function () {
            var display = "none";
            document.querySelectorAll('[data-modal]').forEach(function (item) {
                if (getComputedStyle(item) == "none") {
                    display = "block";
                }
            });
            if (display == "none") {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
            }
        }, time);
    }
    function openByScroll(selector) {
        window.addEventListener('scroll', function () {
            var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', false);
    showModalByTime('.popup-consultation', 60000);
    openByScroll('.fixed-gift');
};
exports["default"] = modals;
