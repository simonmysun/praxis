// ==UserScript==
// @name         Prevent Spotify advertisement crash itself
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://open.spotify.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  new MutationObserver(function(mutations) {
    if(mutations[0].target.nodeValue === 'Advertisement - Spotify') {
      alert('Advertisement! ');
    }
  }).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true }
  );
  // Your code here...
})();
