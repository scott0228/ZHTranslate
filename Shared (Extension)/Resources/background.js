/*jshint esversion: 6 */

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    browser.runtime.sendNativeMessage("application.id", request, function(nativeResponse) {
        console.log("Received sendNativeMessage response: ", request.text, nativeResponse.text, request.transferType);
        // console.log("result: ", result);
        if (nativeResponse.text != request.text)
            sendResponse( nativeResponse['text'] );
    });
    return true;
});
