;
"use strict";

/*Introducing a feed of something. Feed is represented by ".aos-feed".
* Element of feed is represented by ".aos-elem". New elements of feed
* are revealing as user scrolls to end of feed. There is also a
* asynchronous revealing of element's children (you can indicate them
* by ".aos-opacity".
*
* For ".aos-feed"
* The distance from bottom of element used to detect and trigger the
* opacity change and reveal reveals from attribute "data-aos-distance"
* (in px, rem, vh)
* Automatic scroll reveals from attribute "data-aos-scroll" (on / off)
*
* For ".aos-elem":
* Delay for opacity reveals from attribute "data-aos-delay" (in seconds)
* Speed of animation reveals from attribute "data-aos-speed" (in seconds)
* Display type of .aos-section reveals from attribute "data-aos-display"
*
* For ".aos-opacity":
* Delay for opacity reveals from attribute "data-aos-delay" (in seconds,
* relative to parent's delay).
* Speed of animation reveals from attribute "data-aos-speed" (in seconds)
*
* 
* */

/*
* |----------Feeds-------
* |
* |  |-------Feed1-------
* |  |
* |  |  |----Elem1-------
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |----------------
* |  |
* |  |          | data-aos-distance <- detection here
* |  |
* |  |  |----Elem2-------
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |----------------
* |  |
* |  |-------------------
* |
* |  |-------Feed2-------
* |  |
* |  |  |----Elem1-------
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |----------------
* |  |
* |  |  |----Elem1-------
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |  |-Opacity-Elem
* |  |  |
* |  |  |----------------
* |  |
* |  |-------------------
* |
* |----------------------
*
* */

function preInitFeed() {
    // Feeds level
    window.feeds = document.getElementsByClassName("aos-feed"); // Sum of feeds

    for (var i = 0; i < window.feeds.length; i++) {
        // Feed level
        window.feeds[i].elems = window.feeds[i].getElementsByClassName("aos-elem"); // Sum of elements - feed

        for (var j = 1; j < window.feeds[i].elems.length; j++) {
            // Element level
            window.feeds[i].elems[j].style.display = "none";
            window.feeds[i].elems[j].style.opacity = "0";

            window.feeds[i].elems[j].components = window.feeds[i].elems[j].getElementsByClassName("aos-opacity");
            for (var k = 0; k < window.feeds[i].elems[j].components.length; k++) {
                // Element opacity components level
                window.feeds[i].elems[j].components[k].style.opacity = "0";
            }

        }
    }
}

function getTriggerCoordsFeed() {
    for (var i = 0; i < window.feeds.length; i++) {
        window.feeds[i].trigger_pos = getCoords(window.feeds[0]).top + window.feeds[0].offsetHeight;
    }
}

function initFeed() {
    preInitFeed();
    if (window.feeds.length === 0) {
        return;
    }
    // Feeds level

    getTriggerCoordsFeed();

    for (var i = 0; i < window.feeds.length; i++) {
        // Feed level
        window.feeds[i].elem_num = 1;

        for (var j = 1; j < window.feeds[i].elems.length; j++) {
            // Element level
            var delay = window.feeds[i].elems[j].getAttribute("data-aos-delay");
            window.feeds[i].elems[j].style.transition = "opacity " + window.feeds[i].elems[j].getAttribute("data-aos-speed") + "s ease-in-out " + delay + "s";

            for (var k = 0; k < window.feeds[i].elems[j].components.length; k++) {
                // Element opacity components level
                var delay_children = parseFloat(window.feeds[i].elems[j].components[k].getAttribute("data-aos-delay")) + parseFloat(delay);
                window.feeds[i].elems[j].components[k].style.transition =
                    "opacity " + window.feeds[i].elems[j].components[k].getAttribute("data-aos-speed") +
                    "s ease-in-out " + delay_children.toString() + "s";
            }
        }
    }
}

function feed() {
    // Feeds level

    for (var i = 0; i < window.feeds.length; i++) {
        // Feed level
        var position = window.innerHeight + window.pageYOffset;
        if (Math.abs(position - window.feeds[i].trigger_pos) < window.innerHeight / 10/*< window.innerHeight / 4*/) {

            window.feeds[i].elems[window.feeds[i].elem_num].style.display = window.feeds[i].elems[window.feeds[i].elem_num].getAttribute("data-aos-display");
            window.feeds[i].elems[window.feeds[i].elem_num].style.opacity = "1";
            window.scrollTo({
                top: getCoords(window.feeds[i].elems[window.feeds[i].elem_num]).top,
                behavior: "smooth"
            });
            for (var k = 0; k < window.feeds[i].elems[window.feeds[i].elem_num].components.length; k++) {
                window.feeds[i].elems[window.feeds[i].elem_num].components[k].style.opacity = "1";
            }
            window.feeds[i].trigger_pos = getCoords(window.feeds[0]).top + parseFloat(window.feeds[0].offsetHeight);
            window.feeds[i].elem_num += 1;
            console.log(window.feeds[i].elem_num);
            if (window.feeds[i].elem_num == window.feeds[i].elems.length) {
                window.feeds.splice(i, i);
            }
        }
    }
}

window.onresizeFuncs.push(getTriggerCoordsFeed);
window.onloadFuncs.push(initFeed);
window.onscrollFuncs.push(feed);


