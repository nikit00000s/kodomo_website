;
"use strict";
function is_touch_device() {
    return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
}

function detectTouch() {
    return Boolean(
        'ontouchstart' in window ||
        window.navigator.maxTouchPoints > 0 ||
        window.navigator.msMaxTouchPoints > 0 ||
        window.DocumentTouch && document instanceof DocumentTouch
    );
}

function setTouch() {
    if (detectTouch()) {
        window.scroll_behaviour = "auto";
        window.isTouch = true;
    } else {
        window.scroll_behaviour = "smooth";
        window.isTouch = false;
    }
}

window.ondomloadFuncs.push(setTouch);