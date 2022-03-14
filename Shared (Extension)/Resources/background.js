browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    browser.runtime.sendNativeMessage("application.id", {text: request.text}, function(nativeResponse) {
        console.log("Received sendNativeMessage response: ", request.text, nativeResponse.text);
        // console.log("result: ", result);
        if (nativeResponse.text != request.text)
            sendResponse( nativeResponse["text"] );
    });
    return true;
});
