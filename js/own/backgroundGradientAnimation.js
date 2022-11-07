;
"use strict";

/*Animate gradient backgrounds for elements with class name "backGradAnimation"
*
*
*
* */

function InitGradAnimation() {
    window.backGradAnimation = document.getElementsByClassName("backGradAnimation");

    for (var i = 0; i < window.backGradAnimation.length; i++) {
        window.backGradAnimation[i].tick = 0;
        window.backGradAnimation[i].r = 0;
        window.backGradAnimation[i].b = 0;
        window.backGradAnimation[i].g = 0;
    }
}

function RenderGradAnimation() {
    for (var i = 0; i < window.backGradAnimation.length; i++) {

        window.backGradAnimation[i].tick = window.backGradAnimation[i].tick + 0.5;
        if (window.backGradAnimation[i].tick === 720) {
            window.backGradAnimation[i].tick = 0;
        }
        window.backGradAnimation[i].r = Math.sin(Math.PI * window.backGradAnimation[i].tick / 180 + Math.PI / 2) * 30 * 2 + 30;
        window.backGradAnimation[i].b = Math.sin(Math.PI * window.backGradAnimation[i].tick / 360) * 80 + 140;
        window.backGradAnimation[i].g = Math.sin(Math.PI * window.backGradAnimation[i].tick / 360) * 60 + 60;
        window.backGradAnimation[i].style.background = "rgb(" + window.backGradAnimation[i].r.toString() + ", " + window.backGradAnimation[i].g.toString() + ", " + window.backGradAnimation[i].b.toString() + ")";
    }
}

/*    window.backGradAnimation[i].r = Math.sin(Math.PI * window.backGradAnimation[i].tick / 180 + Math.PI / 2) * 31.875 * 2 + 31.875;
    window.backGradAnimation[i].b = Math.sin(Math.PI * window.backGradAnimation[i].tick / 360) * 125.5 + 125.5;
    window.backGradAnimation[i].g = Math.sin(Math.PI * window.backGradAnimation[i].tick / 360) * 63.75 + 63.75;*/