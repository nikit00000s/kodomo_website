;
"use strict";
window.ondomloadFuncs = [];
window.onloadFuncs = [];
window.renderFuncs = [];
window.onscrollFuncs = [];
window.onresizeFuncs = [];
window.onstopresizeFuncs = [];

function getGradientColor (start_color, end_color, percent) {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');

    percent = percent / 100;

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(start_color.length === 3){
        start_color = start_color.replace(/(.)/g, '$1$1');
    }

    if(end_color.length === 3){
        end_color = end_color.replace(/(.)/g, '$1$1');
    }

    // get colors
    var start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);

    var end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);

    // calculate new color
    var diff_red = end_red - start_red;
    var diff_green = end_green - start_green;
    var diff_blue = end_blue - start_blue;

    diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
    diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
    diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

    // ensure 2 digits by color
    if( diff_red.length === 1 ) diff_red = '0' + diff_red;
    if( diff_green.length === 1 ) diff_green = '0' + diff_green;
    if( diff_blue.length === 1 ) diff_blue = '0' + diff_blue;

    return '#' + diff_red + diff_green + diff_blue;
}

function vwTOpx(vw) {
    return (parseFloat(vw.slice(0, -2)) * document.documentElement.clientWidth / 100).toString();
}

function vhTOpx(vh) {
    return (parseFloat(vh.slice(0, -2)) * document.documentElement.clientHeight / 100).toString();
}

function remTOpx(rem) {
    return (parseFloat(rem.slice(0, -3)) * parseFloat(getComputedStyle(document.documentElement).fontSize)).toString();
}

function fromAnyToPx(value) {
    var result;
    if (value.slice(-2) === "vh") {
        result = vhTOpx(value);
    } else if (value.slice(-2) === "vw") {
        result = vwTOpx(value);
    } else if (value.slice(-3) === "rem") {
        result = remTOpx(value);
    } else {
        result = value.slice(-2);
    }
    return parseFloat(result);
}

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
}