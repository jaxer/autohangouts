// ==UserScript==
// @name         Auto Hangouts
// @namespace    http://grabcad.com
// @version      0.2.4
// @description  Unmute and auto-join
// @author       alex
// @match        https://*.google.com/hangouts/_/*
// @grant        none
// @run-at       document-end
// @downloadURL https://github.com/jaxer/autohangouts/raw/master/tampermonkey.user.js
// ==/UserScript==

(function () {
    function simulate(target, evtName) {
        var evt = document.createEvent("MouseEvents");

        evt.initMouseEvent(evtName, true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, target);
        target.dispatchEvent(evt);
    }

    function simulateClick(target) {
        simulate(target, "mouseover");
        simulate(target, "mousedown");
        simulate(target, "mouseup");
        simulate(target, "mouseout");
    }

    var clickJoinInterval = setInterval(function () {
        var joinButton = document.querySelector('div[role=button][aria-label*=Join]');
        if (joinButton) {
            simulateClick(joinButton);
            clearInterval(clickJoinInterval);
        }
    }, 1000);

    setInterval(function () {
        var unmuteButton = document.querySelector('div[role=button][aria-label*="Unmute microphone"]');
        if (unmuteButton) {
            simulateClick(unmuteButton);
        }
    }, 1000);
})();