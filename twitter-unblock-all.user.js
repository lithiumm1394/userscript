// ==UserScript==
// @name     Twitter Unblock All
// @version  0.9.0
// @grant    none
// @match    https://twitter.com/settings/blocked/all
// @run-at   document-idle
// ==/UserScript==

'use strict';

// TODO: add button to run the program.

const block_label = "[aria-label='Blocked']";

[...document.querySelectorAll(block_label)].forEach(button => button.click());

function callback(mutationsList, observer) {
  for(const { addedNodes } of mutationsList) {
    if (addedNodes.length === 0) continue;
    [...addedNodes]
      .map(node => node.querySelector(block_label))
      .filter(node => node !== null)
      .forEach(button => button.click());
  }
}

const observer = new MutationObserver(callback);
observer.observe(
  document.querySelector("div[aria-label='Timeline: Blocked accounts'] > div > div"),
  { childList: true },
);

const intervalID = setInterval(window.scrollBy, 100, { top: 100, left: 0, behavior: 'smooth' });

// TODO: detect the end of the list, and stop & clean
// clearInterval(intervalID);
// observer.disconnect();
