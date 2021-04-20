"use strict";
exports.__esModule = true;
function checkNumber(selector) {
    var box = document.querySelectorAll(selector);
    box.forEach(function (item) {
        item.addEventListener('input', function () {
            item.value = item.value.replace(/\D/, "");
        });
    });
}
exports["default"] = checkNumber;
