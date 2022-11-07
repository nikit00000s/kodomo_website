;
"use strict";
function Breadcrumb() {
    var breadcrumb = document.getElementById("breadcrumb");
    var components = breadcrumb.getElementsByTagName("a");
    var z_index = 10000000;
    breadcrumb.style.zIndex = z_index;
    for (var i = 0; i < components.length; i++) {
        components[i].style.zIndex = (z_index - i).toString();
    }
}

window.onloadFuncs.push(Breadcrumb);