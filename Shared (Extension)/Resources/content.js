
const CHINESE_REGEX = /[\u3400-\u9FBF]/;

function containsChinese(text) {
  return CHINESE_REGEX.test(text);
}

function converter(node) {
  if (containsChinese(node.nodeValue)) {

  }
}

function convert_trad(currentNode) {
  for (const node of currentNode.childNodes) {
    if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') continue;
    if (node.nodeType === Node.TEXT_NODE && containsChinese(node.nodeValue)) {
      browser.runtime.sendMessage({ text: node.nodeValue }).then((response) => {
        // console.log("Received response: ", response);
        if (response != node.nodeValue ) {
          node.nodeValue = response;
        }
      });
    } else if (node.tagName === 'META') {
      if ((node.name === 'description' || node.name === 'keywords') && containsChinese(node.content)) {
        browser.runtime.sendMessage({ text: node.content }).then((response) => {
          // console.log("Received response: ", response);
          if (response != node.content ) {
            node.content = response;
          }
        });
      }
    } else if (node.tagName === 'IMG' && containsChinese(node.alt)) {
      browser.runtime.sendMessage({ text: node.alt }).then((response) => {
        // console.log("Received response: ", response);
        if (response != node.alt ) {
          node.alt = response;
        }
      });
    } else if (node.tagName === 'INPUT' && node.type === 'button' && containsChinese(node.value)) {
      browser.runtime.sendMessage({ text: node.value }).then((response) => {
        // console.log("Received response: ", response);
        if (response != node.value ) {
          node.value = response;
        }
      });
    } else {
      convert_trad(node);
    }
  }
}

(function () {
  'use strict';
  convert_trad(document);

  const callback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type == 'childList' && mutation.addedNodes.length > 0) {
        Array.from(mutation.addedNodes).find((node) => {
          convert_trad(node);
        });
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(window.document.body, { childList: true, subtree: true });
})();
