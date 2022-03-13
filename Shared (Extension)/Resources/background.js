const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log("Received request: ", request.text);
    let result = converter(request.text);
    // console.log("result: ", result);
    sendResponse(result);
});
