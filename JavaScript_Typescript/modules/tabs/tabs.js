"use strict";
exports.__esModule = true;
function tabs(headerTabSelector, tabSelector, activeClass, displayType, justify) {
    if (displayType === void 0) { displayType = "block"; }
    if (justify === void 0) { justify = "center"; }
    var headerTab = document.querySelectorAll(headerTabSelector), tabs = document.querySelectorAll(tabSelector);
    function hideTab() {
        tabs.forEach(function (item) {
            item.style.display = "none";
        });
        headerTab.forEach(function (item) {
            item.classList.remove(activeClass);
        });
    }
    function showTab(i) {
        if (i === void 0) { i = 0; }
        tabs[i].style.display = displayType;
        headerTab[i].classList.add(activeClass);
    }
    hideTab();
    showTab();
    headerTab.forEach(function (item, i) {
        item.addEventListener('click', function (e) {
            if (e.target) {
                e.preventDefault();
            }
            hideTab();
            showTab(i);
        });
    });
}
exports["default"] = tabs;
