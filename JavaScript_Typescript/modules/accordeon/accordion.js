"use strict";
exports.__esModule = true;
function accordion(headersSelector, blockSelector) {
    var headers = document.querySelectorAll(headersSelector), blocks = document.querySelectorAll(blockSelector);
    function makeHeader(item) {
        item.style.borderBottom = "none";
        item.style.fontSize = "2.6rem";
        item.style.color = "#C51ABB";
    }
    function deleteHeader(item) {
        item.style.borderBottom = "2px dotted rgb(51, 51, 51)";
        item.style.fontSize = "2.2rem";
        item.style.color = "#333";
    }
    function hideBlocks() {
        headers.forEach(function (item) {
            item.style.position = "relative";
            item.style.zIndex = "10";
        });
        blocks.forEach(function (item, i) {
            item.style.transition = "none";
            item.style.maxHeight = "0px";
            item.style.padding = "0px 4rem";
            item.style.opacity = "0";
            deleteHeader(headers[i].firstElementChild);
            blocks[i].classList.remove('act');
        });
    }
    function hideBlock(i) {
        blocks[i].style.transition = "none";
        blocks[i].style.maxHeight = "0px";
        blocks[i].style.padding = "0rem 4rem";
        blocks[i].style.opacity = "0";
        deleteHeader(headers[i].firstElementChild);
        blocks[i].classList.remove('act');
    }
    function openBlock(i) {
        blocks[i].style.transition = "0.3s maxHeight ease-out, 0.3s opacity ease-out";
        blocks[i].style.maxHeight = "100%";
        blocks[i].style.opacity = "1";
        blocks[i].style.padding = "3rem 4rem";
    }
    hideBlocks();
    headers.forEach(function (item, i) {
        item.addEventListener('click', function (e) {
            if (blocks[i].classList.contains('act')) {
                hideBlock(i);
            }
            else {
                hideBlocks();
                openBlock(i);
                makeHeader(headers[i].firstElementChild);
                blocks[i].classList.add('act');
            }
        });
    });
}
exports["default"] = accordion;
