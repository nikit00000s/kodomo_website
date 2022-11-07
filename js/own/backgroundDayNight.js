;
"use strict";

function InitDayNight() {
    //initialize
    $('body').append('<div id="backDayNight"></div>');
    window.backDayNight = document.getElementById("backDayNight");
    //styles
    window.backDayNight.style.position = "fixed";
    window.backDayNight.style.top = "0px";
    window.backDayNight.style.left = "0px";
    window.backDayNight.style.display = "block";
    window.backDayNight.style.height = "100vh";
    window.backDayNight.style.width = "100vw";
    window.backDayNight.style.zIndex = "-1";

    window.backDayNight.tick = 0;
    window.backDayNight.r = 0;
    window.backDayNight.b = 0;
    window.backDayNight.g = 0;

    window.backDayNight.colors = [];
    for(var i = 0; i < 720; i = i + 0.5) {
        var r = (Math.round(Math.sin(Math.PI * i / 180 + Math.PI / 2) * 30 * 2 + 30)).toString();
        var b = (Math.round(Math.sin(Math.PI * i / 360) * 80 + 140)).toString();
        var g = (Math.round(Math.sin(Math.PI * i / 360) * 60 + 60)).toString();
        window.backDayNight.colors.push("rgb(" + r + ", " + g + ", " + b + ")");
    }
    console.log(window.backDayNight.colors);
}

function NotInitDayNight() {
    //initialize
    $('body').append('<div id="backDayNight"></div>');
    window.backDayNight = document.getElementById("backDayNight");
    //styles
    window.backDayNight.style.position = "fixed";
    window.backDayNight.style.top = "0px";
    window.backDayNight.style.left = "0px";
    window.backDayNight.style.display = "block";
    window.backDayNight.style.height = "100vh";
    window.backDayNight.style.width = "100vw";
    window.backDayNight.style.zIndex = "-1";

    window.backDayNight.style.background = "#111";
}

function RenderDayNight() {
    window.backDayNight.tick = window.backDayNight.tick + 0.5;
    if (window.backDayNight.tick === 720) {
        window.backDayNight.tick = 0;
    }
    window.backDayNight.style.background = window.backDayNight.colors[window.backDayNight.tick * 2];
}


window.ondomloadFuncs.push(InitDayNight);
window.renderFuncs.push(RenderDayNight);
//window.notRenderInitFunctions.push(NotInitDayNight);
console.log(window.onloadFuncs);

/*    window.backDayNight.r = Math.sin(Math.PI * window.backDayNight.tick / 180 + Math.PI / 2) * 31.875 * 2 + 31.875;
    window.backDayNight.b = Math.sin(Math.PI * window.backDayNight.tick / 360) * 125.5 + 125.5;
    window.backDayNight.g = Math.sin(Math.PI * window.backDayNight.tick / 360) * 63.75 + 63.75;*/