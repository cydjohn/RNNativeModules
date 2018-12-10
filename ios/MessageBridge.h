//
//  messageBridge.h
//  crossPlatformDemo
//
//  Created by Yudong Cao on 12/7/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Foundation/Foundation.h>


@interface MessageBridge : RCTEventEmitter<RCTBridgeModule>

@end


