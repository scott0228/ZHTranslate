const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log("Received request: ", request.text);
    // let result = converter(request.text);
    // await
    browser.runtime.sendNativeMessage("application.id", {text: request.text}, function(nativeResponse) {
        console.log("Received sendNativeMessage response: ", request.text, nativeResponse.text);
        // console.log("result: ", result);
        if (nativeResponse.text != request.text)
            sendResponse( nativeResponse["text"] );
    });
    return true;
});
