;
"use strict";

/*Draws circles inside ".oc-container".
*
* Attributes:
* 1. Count of arranged circles reveals from "data-oc-count"
* 2. Maximum radius reveals from "data-oc-max-radius" (in rem, px)
* 3. Minimum radius reveals from "data-oc-min-radius" (in rem, px)
* 4. Maximum opacity reveals from "data-oc-max-opacity" (in %)
* 5. Minimum opacity reveals from "data-oc-min-opacity" (in %)
* 6. Start color reveals from "data-oc-start-color" (in "#______" format)
* 7. End color reveals from "data-oc-end-color" (in "#______" format)
* 8. Position x of start point reveals from "data-oc-x" (in %)
* 9. Position y of start point reveals from "data-oc-y" (in %)
* 10. Count of opacity levels reveals from "data-oc-levels"
* */

function preInitOpacityCircles() {
    window.circles_containers = document.getElementsByClassName("oc-container");
    for (var i = 0; i < window.circles_containers.length; i++) {
        window.circles_containers[i].count = parseInt(window.circles_containers[i].getAttribute("data-oc-count"));
        window.circles_containers[i].max_radius = fromAnyToPx(window.circles_containers[i].getAttribute("data-oc-max-radius"));
        window.circles_containers[i].min_radius = fromAnyToPx(window.circles_containers[i].getAttribute("data-oc-min-radius"));
        window.circles_containers[i].max_opacity = parseInt(window.circles_containers[i].getAttribute("data-oc-max-opacity")) / 100;
        window.circles_containers[i].min_opacity = parseInt(window.circles_containers[i].getAttribute("data-oc-min-opacity")) / 100;
        window.circles_containers[i].start_color = window.circles_containers[i].getAttribute("data-oc-start-color");
        window.circles_containers[i].end_color = window.circles_containers[i].getAttribute("data-oc-end-color");
        window.circles_containers[i].x = parseInt(window.circles_containers[i].getAttribute("data-oc-x")) / 100;
        window.circles_containers[i].y = parseInt(window.circles_containers[i].getAttribute("data-oc-y")) / 100;
        window.circles_containers[i].levels_count = parseInt(window.circles_containers[i].getAttribute("data-oc-levels"));
    }
}

function initOpacityCircles() {
    preInitOpacityCircles();

    for (var i = 0; i < window.circles_containers.length; i++) {
        var width = window.circles_containers[i].offsetWidth;
        var height = window.circles_containers[i].offsetHeight;
        var point_x = width * window.circles_containers[i].x;
        var point_y = height * window.circles_containers[i].y;

        window.circles_containers[i].max_distance = 0;
        for (var a = 0; a < 2; a++) {
            for (var b = 0; b < 2; b++) {
                var current_distance_squared = (a * width - point_x) * (a * width - point_x) + (b * height - point_y) * (b * height - point_y);
                if (current_distance_squared - window.circles_containers[i].max_distance * window.circles_containers[i].max_distance > 0) {
                    window.circles_containers[i].max_distance = Math.sqrt(current_distance_squared);
                }
            }
        }
        
        var diff_opacity = window.circles_containers[i].max_opacity - window.circles_containers[i].min_opacity;
        var opacity_step = diff_opacity / window.circles_containers[i].levels_count;
        var diff_radius = window.circles_containers[i].max_radius - window.circles_containers[i].min_radius;
        for (var j = 0; j < window.circles_containers[i].count; j++) {
            var circle = document.createElement("div");
            circle.classList.add("oc-circle");
            var x = Math.round(Math.random() * width);
            var y = Math.round(Math.random() * height);
            var opacity = Math.floor(Math.random() * window.circles_containers[i].levels_count + 1) * opacity_step + window.circles_containers[i].min_opacity;
            var radius = Math.round(diff_radius * Math.random() * 100) / 100 + window.circles_containers[i].min_radius;
            var color = getGradientColor(window.circles_containers[i].start_color, window.circles_containers[i].end_color, Math.round(100 * Math.sqrt((x - point_x) * (x - point_x) + (y - point_y) * (y - point_y)) / window.circles_containers[i].max_distance));
            circle.style.position = "absolute";
            circle.style.left = (100 * Math.round(x - radius) / width).toString() + "%";
            circle.style.top = (100 * Math.round(y - radius) / height).toString() + "%";
            circle.style.background = color;
            circle.style.opacity = opacity;
            circle.style.width = (radius * 2).toString() + "px";
            circle.style.height = circle.style.width;
            circle.style.borderRadius = radius.toString() + "px";

            window.circles_containers[i].appendChild(circle);
        }
    }
}

window.onloadFuncs.push(initOpacityCircles);