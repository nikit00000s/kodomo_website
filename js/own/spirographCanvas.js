;
"use strict";
function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function InitSpirographCanvas()
{
    //get elem, context, set height & width
    window.spiroCanvas = document.getElementById("spirograph-canvas");
    window.spiroCanvas_ctx = window.spiroCanvas.getContext('2d');
    if(window.spiroCanvas.style.width === undefined)
        window.spiroCanvas.setAttribute('width', "300");
    window.spiroCanvas.style.setProperty('width', window.spiroCanvas.width.toString() + 'px', 'important');
    window.spiroCanvas.style.setProperty('height', window.spiroCanvas.width.toString() + 'px', 'important');
    window.spiroCanvas.setAttribute('height', window.spiroCanvas.width);

    //set variables
    window.spiroCanvas.R = randomIntFromInterval(Math.round(window.spiroCanvas.width * 0.2), Math.round(window.spiroCanvas.width * 0.35));
    window.spiroCanvas.r = randomIntFromInterval(Math.round(window.spiroCanvas.R * 0.15), Math.round(window.spiroCanvas.R * 0.9));
    window.spiroCanvas.d = randomIntFromInterval(Math.round(window.spiroCanvas.width * 0.1), Math.round(window.spiroCanvas.R * 0.9));
    window.spiroCanvas.teta = randomIntFromInterval(0, 359);
    window.spiroCanvas.tetaIncrement = randomIntFromInterval(10, 100) / 500;
    window.spiroCanvas.tick = 0;
}

function RenderSpirographCanvas() {
    //new x
    window.spiroCanvas.x =
        (window.spiroCanvas.R - window.spiroCanvas.r) * Math.cos(window.spiroCanvas.teta) +
        window.spiroCanvas.d * Math.cos((window.spiroCanvas.R - window.spiroCanvas.r) * window.spiroCanvas.teta / window.spiroCanvas.r);
    //new y
    window.spiroCanvas.y =
        (window.spiroCanvas.R - window.spiroCanvas.r) * Math.sin(window.spiroCanvas.teta) -
        window.spiroCanvas.d * Math.sin((window.spiroCanvas.R - window.spiroCanvas.r) * window.spiroCanvas.teta / window.spiroCanvas.r);
    //new teta (step) tick
    window.spiroCanvas.teta = window.spiroCanvas.teta + window.spiroCanvas.tetaIncrement;
    window.spiroCanvas.tick = window.spiroCanvas.tick + 1;

    //draw, centering
    window.spiroCanvas_ctx.fillRect(window.spiroCanvas.height / 2 + window.spiroCanvas.x, window.spiroCanvas.width / 2 + window.spiroCanvas.y, 2, 2);
}

//window.onloadFuncs.push(InitSpirographCanvas);
//window.renderFuncs.push(RenderSpirographCanvas);
//console.log(window.onloadFuncs);