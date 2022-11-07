;
"use strict";
function InitYear() {
    //current year
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var containerYear = document.getElementById('CurrentYear');
    if (containerYear != null) {
        containerYear.innerHTML = year.toString();
    }
}
InitYear();
