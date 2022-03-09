const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

function convert_trad(currentNode) {
  console.log(currentNode);
  for (const node of currentNode.childNodes) {
    if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') continue;
    if (node.nodeType === Node.TEXT_NODE) {
      var result = converter(node.nodeValue);
      if (result != node.nodeValue) {
        node.nodeValue = result;
      }
    } else if (node.tagName === 'META') {
      if (node.name === 'description' || node.name === 'keywords')
        node.content = converter(node.content);
    } else if (node.tagName === 'IMG') {
      var result = converter(node.alt);
      if (result != node.alt) {
        node.alt = result;
      }
    } else if (node.tagName === 'INPUT' && node.type === 'button') {
      var result = converter(node.value);
      if (result != node.value) {
        node.value = result;
      }
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
