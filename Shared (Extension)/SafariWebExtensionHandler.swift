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
    let converterT = try! ChineseConverter(options: [.traditionalize, .twStandard, .twIdiom])
    let converterS = try! ChineseConverter(options: [.simplify, .twStandard, .twIdiom])

    func beginRequest(with context: NSExtensionContext) {
        
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey] as? [String: Any]
        
        guard let text = message?["text"] as? String else {
                    return
        }
        guard let transferType = message?["transferType"] as? String else {
                    return
        }
        let response = NSExtensionItem()
        if ("hant" == transferType) {
            response.userInfo = [ SFExtensionMessageKey: [ "text": converterT.convert(text), "transferType": transferType] ]
        } else if ("hans" == transferType) {
            response.userInfo = [ SFExtensionMessageKey: [ "text": converterS.convert(text), "transferType": transferType] ]
        }

        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
