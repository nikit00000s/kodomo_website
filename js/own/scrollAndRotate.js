;
"use strict";

/*
* Rotates .rotate-scrolling elements
*
* Attributes:
*
* 1. data-corner: choose bottom angle (left or right) from that rotation will happen
*
* */

function getCoords(elem) {
    // (1)
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    // (2)
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    // (3)
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    // (4)
    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top: top,
        left: left
    };
}

function scrollRotateInit() {
    var hypotenuse = Math.sqrt(window.innerHeight * window.innerHeight + window.innerWidth * window.innerWidth).toString() + "px";
    window.rotateObjects = document.getElementsByClassName("rotate-scrolling");
    for (var i = 0; i < window.rotateObjects.length; i++) {
        window.rotateObjects[i].style.position = "absolute";
        window.rotateObjects[i].style.bottom = "0";
        if (window.rotateObjects[i].getAttribute("data-corner") === "left") {
            window.rotateObjects[i].corner = -1;
            window.rotateObjects[i].style.transformOrigin = "bottom left";
            window.rotateObjects[i].style.left = "0";

        }
        if (window.rotateObjects[i].getAttribute("data-corner") === "right") {
            window.rotateObjects[i].corner = 1;
            window.rotateObjects[i].style.transformOrigin = "bottom right";
            window.rotateObjects[i].style.right = "0";
        }
        window.rotateObjects[i].style.width = hypotenuse;
        window.rotateObjects[i].style.height = window.innerHeight.toString() + "px";
    }
}

function sizeScrollRotate() {
    var hypotenuse = Math.sqrt(window.innerHeight * window.innerHeight + window.innerWidth * window.innerWidth).toString() + "px";
    for (var i = 0; i < window.rotateObjects.length; i++) {
        window.rotateObjects[i].style.width = hypotenuse;
        window.rotateObjects[i].style.height = window.innerHeight.toString() + "px";
    }
}

function scrollRotate() {
    for (var i = 0; i < window.rotateObjects.length; i++) {
        console.log(getCoords(window.rotateObjects[i]));
        var theta = (window.pageYOffset / window.innerHeight) * Math.PI * 0.5 * window.rotateObjects[i].corner;
        //window.rotateObjects[i].style.transform = "rotate(" + theta.toString() + "rad)";
    }
}

window.onloadFuncs.push(scrollRotateInit);
window.onscrollFuncs.push(scrollRotate);
window.onresizeFuncs.push(sizeScrollRotate);
