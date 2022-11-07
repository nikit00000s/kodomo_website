;
"use strict";

/*Creates flows of elements inside of ".rf-container". Flow - ".rf-row". Element - ".rf-elem".
*
* Width of flow reveals from attribute "data-rf-width" (in px, rem, vw)
* Width of gaps reveals from attribute "data-rf-gaps" (in px, rem, vw)
* Target height of .rf-container reveals from attribute "data-rf-target" (id)
* Row alignment reveals from attribute "data-rf-row-align" ("left / right")
* Speed reveals from attribute "data-rf-speed"
* */

function preInitRandomFlow() {
    window.random_flows = document.getElementsByClassName("rf-container");
    for (var i = 0; i < window.random_flows.length; i++) {
        window.random_flows[i].speed = window.random_flows[i].getAttribute("data-rf-speed");
        window.random_flows[i].rows = [];
        window.random_flows[i].style.overflow = "hidden";
        window.random_flows[i].style.position = "relative";
        window.random_flows[i].style.display = "flex!important";
        window.random_flows[i].row_width = fromAnyToPx(window.random_flows[i].getAttribute("data-rf-width"));
        window.random_flows[i].gap_width = fromAnyToPx(window.random_flows[i].getAttribute("data-rf-gaps"));
    }
}

function initRandomFlow() {
    for (var i = 0; i < window.random_flows.length; i++) {
        var row_alignment = window.random_flows[i].getAttribute("data-rf-row-align");
        var target = document.getElementById(window.random_flows[i].getAttribute("data-rf-target"));
        window.random_flows[i].style.height = (target.offsetHeight).toString() + "px";
        var row_count = Math.floor(window.random_flows[i].offsetWidth / (window.random_flows[i].row_width + window.random_flows[i].gap_width));
        var elem_count = window.random_flows[i].offsetHeight / (window.random_flows[i].row_width * 2 + window.random_flows[i].gap_width) + 1;
        window.random_flows[i].height = (elem_count) * (window.random_flows[i].row_width * 3 + window.random_flows[i].gap_width);
        var row_height = window.random_flows[i].height.toString() + "px";
        var row_width = window.random_flows[i].row_width.toString() + "px";
        var pos_top = (-(window.random_flows[i].row_width + window.random_flows[i].gap_width) * 3).toString() + "px";
        for (var j = 0; j < row_count; j++) {
            var row = document.createElement("div");
            row.classList.add("rf-row");
            row.style.width = row_width;
            row.style.height = row_height;
            row.style.position = "absolute";
            row.style.top = pos_top;
            var row_x_pos = (j * (window.random_flows[i].gap_width + window.random_flows[i].row_width)).toString() + "px";
            if (row_alignment === "left") {
                row.style.left = row_x_pos;
            } else if (row_alignment === "right") {
                row.style.right = row_x_pos;
            }

            window.random_flows[i].appendChild(row);
        }
        window.random_flows[i].rows = window.random_flows[i].getElementsByClassName("rf-row");

        for (var j = 0; j < row_count; j++) {
            var pos_from_top = 0;
            for (var k = 0; k < elem_count; k++) {
                var elem = document.createElement("div");
                elem.pose_top = pos_from_top;
                elem.style.width = row_width;
                var elem_height = (Math.floor(Math.random() * 2) + 2) * window.random_flows[i].row_width;
                elem.style.height = elem_height.toString() + "px";
                elem.classList.add("rf-elem");
                elem.style.position = "absolute";
                elem.style.top = pos_from_top.toString() + "px";
                pos_from_top = pos_from_top + elem_height + window.random_flows[i].gap_width;
                window.random_flows[i].rows[j].appendChild(elem);
            }
            window.random_flows[i].rows[j].elems = window.random_flows[i].rows[j].getElementsByClassName("rf-elem");
            window.random_flows[i].rows[j].speed = pos_from_top / window.random_flows[i].height;
            window.random_flows[i].rows[j].start_difference = 0;
        }
    }
}

function resizeRandomFlow() {
    for (var i = 0; i < window.random_flows.length; i++) {
        var amount = window.random_flows[i].rows.length;
        for (var j = 0; j < amount; j++) {
            window.random_flows[i].removeChild(window.random_flows[i].rows[0]);
        }
    }
    initRandomFlow();
}

function renderRandomFlow() {

    for (var i = 0; i < window.random_flows.length; i++) {

        for (var j = 0; j < window.random_flows[i].rows.length; j++) {

            window.random_flows[i].rows[j].start_difference += window.random_flows[i].rows[j].speed * window.random_flows[i].speed;

            for (var k = 0; k < window.random_flows[i].rows[j].elems.length; k++) {
                window.random_flows[i].rows[j].elems[k].pose_top += window.random_flows[i].rows[j].speed * window.random_flows[i].speed;
                window.random_flows[i].rows[j].elems[k].style.top = window.random_flows[i].rows[j].elems[k].pose_top.toString() + "px";
            }

            if (window.random_flows[i].rows[j].start_difference > window.random_flows[i].row_width * 3 + window.random_flows[i].gap_width) {
                var max_index = 0;
                var max_value = 0;
                for (var l = 0; l < window.random_flows[i].rows[j].elems.length; l++) {
                    if (window.random_flows[i].rows[j].elems[l].pose_top > max_value) {
                        max_index = l;
                        max_value = window.random_flows[i].rows[j].elems[l].pose_top;
                    }
                }
                var elem_height = (Math.floor(Math.random() * 2) + 2) * window.random_flows[i].row_width;
                var elem_top_pos = 3 * window.random_flows[i].row_width - elem_height;
                window.random_flows[i].rows[j].start_difference = elem_top_pos;
                window.random_flows[i].rows[j].elems[max_index].style.height = elem_height.toString() + "px";
                window.random_flows[i].rows[j].elems[max_index].style.top = elem_top_pos.toString() + "px";
                window.random_flows[i].rows[j].elems[max_index].pose_top = elem_top_pos;
            }
        }
    }
}


window.ondomloadFuncs.push(preInitRandomFlow);
window.onloadFuncs.push(initRandomFlow);
window.onstopresizeFuncs.push(resizeRandomFlow);
window.renderFuncs.push(renderRandomFlow);