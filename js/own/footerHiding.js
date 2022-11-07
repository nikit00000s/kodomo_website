;
"use strict";
function hideFooter() {
    if (!window.isTouch) {
        var footer = document.getElementsByTagName("footer")[0];
        footer.classList.add("hide_now");
        var columns = footer.getElementsByClassName("col");
        console.log(columns[1]);
        for (var i = 0; i < columns.length; i++) {
            columns[i].classList.remove("col-sm-6");
        }
    }
}

window.onloadFuncs.push(hideFooter);