//
//  SafariWebExtensionHandler.swift
//  Shared (Extension)
//
//  Created by 楊慶堂 on 2022/3/9.
//

import SafariServices
import os.log
import OpenCC

let SFExtensionMessageKey = "message"

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        
        var str = "鼠标里面的硅二极管坏了，导致光标分辨率降低。1"
        let converter = try! ChineseConverter(options: [.traditionalize, .twStandard, .twIdiom])
        str = converter.convert(str)
        print(str)
        let converter1 = try! ChineseConverter(options: [.simplify, .twStandard, .twIdiom])
        str = converter1.convert(str)
        print(str)
        
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)

        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "Response to": message ] ]

        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
