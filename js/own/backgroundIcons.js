;
"use strict";

/*Draws some number of IconsOnBackground in .icons-on-background
*
* Count of molecules reveals from attribute data-iob-count
* */

function IconsOnBackground() {
    var background_DNA = document.getElementsByClassName("icons-on-background");
    for (var j = 0; j < background_DNA.length; j++) {
        background_DNA[j].style.position = "relative";
        var _width = background_DNA[j].offsetWidth;
        var _height = background_DNA[j].offsetHeight;
        var count = background_DNA[j].getAttribute("data-iob-count");
        for (var i = 0; i < count; i++) {
            var div = document.createElement("div");
            div.className += "item_icons-on-background";
            div.style.position = "absolute";
            var h = Math.floor(_height * Math.random());
            var w = Math.floor(_width * Math.random());
            div.style.top = h.toString() + "px";
            div.style.left = w.toString() + "px";
            div.style.zIndex = "0";
            div.style.fontSize = (1 + Math.floor(Math.random() * 10) / 20).toString() + "em";
            div.style.opacity = "0.35";
            div.style.transform = "rotate(" + Math.floor(Math.random() * 360).toString() + "deg)";
            background_DNA[j].prepend(div);
        }
    }
}

window.onloadFuncs.push(IconsOnBackground);