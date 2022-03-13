const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log("Received request: ", request.text);
    let result = converter(request.text);
    // await
    browser.runtime.sendNativeMessage("application.id", {text: request.text}, function(response) {
        console.log("Received sendNativeMessage response: ", response);
        // console.log("result: ", result);
        // sendResponse(response);
    });
});
