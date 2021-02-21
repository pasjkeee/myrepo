"use strict";
exports.__esModule = true;
function checkText(selector) {
    var inputs = document.querySelectorAll(selector);
    inputs.forEach(function (input) {
        input.addEventListener('keypress', function (e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });
}
exports["default"] = checkText;
