/*jshint esversion: 6 */
var subscription;

const CHINESE_REGEX = /[\u3400-\u9FBF]/;

function containsChinese(text) {
  return CHINESE_REGEX.test(text);
}

function convertChinese(currentNode, transferType) {
  for (const node of currentNode.childNodes) {
    if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') continue;
    if (node.nodeType === Node.TEXT_NODE && containsChinese(node.nodeValue)) {
      if (containsChinese(node.nodeValue)) {
        if (transferType === 'off') {
          if (node.nodeValueOld !== undefined)
            node.nodeValue = node.nodeValueOld;
        } else {
          browser.runtime
            .sendMessage({ text: node.nodeValue, transferType })
            .then((response) => {
              if (response != undefined && response != node.nodeValue) {
                if (node.nodeValueOld == undefined)
                  node.nodeValueOld = node.nodeValue;
                node.nodeValue = response;
              }
            });
        }
      }
    } else if (node.tagName === 'META') {
      if (
        (node.name === 'description' || node.name === 'keywords') &&
        containsChinese(node.content)
      ) {
        if (containsChinese(node.content)) {
          if (transferType === 'off') {
            if (node.contentOld !== undefined) node.content = node.contentOld;
          } else
            browser.runtime
              .sendMessage({ text: node.content, transferType })
              .then((response) => {
                // console.log("Received response: ", response);
                if (response != undefined && response != node.content) {
                  if (node.contentOld == undefined)
                    node.contentOld = node.content;
                  node.content = response;
                }
              });
        }
      }
    } else if (node.tagName === 'IMG' && containsChinese(node.alt)) {
      if (containsChinese(node.alt)) {
        if (transferType === 'off') {
          if (node.altOld !== undefined) node.alt = node.altOld;
        } else
          browser.runtime
            .sendMessage({ text: node.alt, transferType })
            .then((response) => {
              // console.log("Received response: ", response);
              if (response != undefined && response != node.alt) {
                if (node.altOld == undefined) node.altOld = node.alt;
                node.alt = response;
              }
            });
      }
    } else if (
      node.tagName === 'INPUT' &&
      node.type === 'button' &&
      containsChinese(node.value)
    ) {
      if (containsChinese(node.value)) {
        if (transferType === 'off') {
          if (node.valueOld !== undefined) node.value = node.valueOld;
        } else
          browser.runtime
            .sendMessage({ text: node.value, transferType })
            .then((response) => {
              // console.log("Received response: ", response);
              if (response != undefined && response != node.value) {
                if (node.valueOld == undefined) node.valueOld = node.value;
                node.value = response;
              }
            });
      }
    } else {
      convertChinese(node, transferType);
    }
  }
}

(function () {
  'use strict';
  var transferType;
  subscription = new BrowserStorageSubscription(function (options) {
    console.log('BrowserStorageSubscription change', options);
    transferType = options.transferType;
    convertChinese(document, transferType);
  });

  const callback = (mutationsList) => {
      if (transferType) {
        mutationsList.forEach((mutation) => {
          if (mutation.type == 'childList' && mutation.addedNodes.length > 0) {
            Array.from(mutation.addedNodes).find((node) => {
              convertChinese(node, transferType);
            });
          }
        });
      }
  };
  const observer = new MutationObserver(callback);
  observer.observe(window.document.body, { childList: true, subtree: true });
})();
