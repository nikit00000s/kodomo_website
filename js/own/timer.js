function ondomload() {
    for (var i = 0; i < window.ondomloadFuncs.length; i++) {
        window.ondomloadFuncs[i]();
    }
}

function render() {
    for (var i = 0; i < window.renderFuncs.length; i++) {
        window.renderFuncs[i]();
    }
}

var timer_resize = null;

function onstopresize () {
    for (var i = 0; i < window.onstopresizeFuncs.length; i++) {
        window.onstopresizeFuncs[i]();
    }
}

document.addEventListener("DOMContentLoaded", ondomload);

window.onload = function () {
    for (var i = 0; i < window.onloadFuncs.length; i++) {
        window.onloadFuncs[i]();
    }

    window.onscroll = function () {
        for (var i = 0; i < window.onscrollFuncs.length; i++) {
            window.onscrollFuncs[i]();
        }
    };

    window.onresize = function () {
        for (var i = 0; i < window.onresizeFuncs.length; i++) {
            window.onresizeFuncs[i]();
        }
        if(timer_resize !== null) {
            clearTimeout(timer_resize);
        }
        timer_resize = setTimeout(onstopresize, 500);
    };


    var timer = setInterval(render, 16);
};


document.addEventListener('resize', function() {

}, false);


