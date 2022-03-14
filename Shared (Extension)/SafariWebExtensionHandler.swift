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
    let converter = try! ChineseConverter(options: [.traditionalize, .twStandard, .twIdiom])

    func beginRequest(with context: NSExtensionContext) {
        
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey] as? [String: Any]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)
        
        guard let text = message?["text"] as? String else {
                    return
        }
        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "text": converter.convert(text)] ]

        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
