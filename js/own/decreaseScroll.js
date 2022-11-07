;
"use strict";

/*Decrease in height of ".ds-height" as user scrolls down
*
* Start height reveals from attribute "data-ds-start"
* End height reveals from attribute "data-ds-end" (not 0)
* Values in rem, px, vh.
* */

/*
* "valueMeasurement_units"
 */

function preInitDecreaseScroll() {
    window.dsElems = document.getElementsByClassName("ds-height");
}

function decreaseScroll() {
    for (var i = 0; i < window.dsElems.length; i++) {

        var window_position_relative = window.pageYOffset - window.dsElems[i].pos_top;

        if (window_position_relative < 0) {
            window.dsElems[i].style.height = window.dsElems[i].start.toString() + "px";
        } else if (window_position_relative > window.dsElems[i].end) {
            window.dsElems[i].style.height = window.dsElems[i].end.toString() + "px";
        } else {
            var current_height = window.dsElems[i].start + Math.floor(window.dsElems[i].a * window_position_relative * window_position_relative);
            window.dsElems[i].style.height = current_height.toString() + "px";
        }
    }
}

function initDecreaseScroll() {
    for (var i = 0; i < window.dsElems.length; i++) {
        window.dsElems[i].style.overflow = "hidden";
        window.dsElems[i].start = window.dsElems[i].getAttribute("data-ds-start");
        window.dsElems[i].end = window.dsElems[i].getAttribute("data-ds-end");

        if (window.dsElems[i].start.slice(-2) === "vh") {
            window.dsElems[i].start = vhTOpx(window.dsElems[i].start);
        }
        if (window.dsElems[i].end.slice(-2) === "vh") {
            window.dsElems[i].end = vhTOpx(window.dsElems[i].end);
        }

        if (window.dsElems[i].start.slice(-3) === "rem") {
            window.dsElems[i].start = remTOpx(window.dsElems[i].start);
        }
        if (window.dsElems[i].end.slice(-3) === "rem") {
            window.dsElems[i].end = remTOpx(window.dsElems[i].end);
        }

        if (window.dsElems[i].start.slice(-2) === "px") {
            window.dsElems[i].start = window.dsElems[i].start.slice(0, -2);
        }
        if (window.dsElems[i].end.slice(-2) === "px") {
            window.dsElems[i].end = window.dsElems[i].end.slice(0, -2);
        }

        window.dsElems[i].start = parseFloat(window.dsElems[i].start);
        window.dsElems[i].end = parseFloat(window.dsElems[i].end);

        if (window.dsElems[i].end === 0) {
            throw Error();
        }

        window.dsElems[i].delta_height = window.dsElems[i].start - window.dsElems[i].end;
        window.dsElems[i].a = (-1) * window.dsElems[i].delta_height / (window.dsElems[i].end * window.dsElems[i].end);
        window.dsElems[i].pos_top = getCoords(window.dsElems[i]).top;
    }
    decreaseScroll();
}


window.ondomloadFuncs.push(preInitDecreaseScroll);
window.onloadFuncs.push(initDecreaseScroll);
window.onresizeFuncs.push(initDecreaseScroll);
window.onscrollFuncs.push(decreaseScroll);
