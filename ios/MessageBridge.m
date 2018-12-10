//
//  messageBridge.m
//  crossPlatformDemo
//
//  Created by Yudong Cao on 12/7/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "messageBridge.h"


@implementation messageBridge
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getMessage,:(NSString *)message
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSDictionary *data = @{@"success":@YES,@"message":[message stringByAppendingString:@" (Promises)"]};
  if (data) {
    resolve(data);
  } else {
    NSError *error = [[NSError alloc] initWithDomain:@"show" code:200 userInfo:nil];
    reject(@"no_events", @"There were no events", error);
  }
}


RCT_REMAP_METHOD(pushMessage,:(NSString *)message)
{
  NSDictionary *data = @{@"success":@YES,@"message":[message stringByAppendingString:@" (send event)"]};
  [self sendEventWithName:@"PushMessage" body:data];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"PushMessage"];
}

@end
