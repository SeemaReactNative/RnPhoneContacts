//
//  RnStorageModule.m
//  DemoApp
//
//  Created by Seema Devganiya on 06/01/23.
//

#import <Foundation/Foundation.h>
#import "RnStorageModule.h"
#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>
#import <React/RCTI18nUtil.h>


@implementation RnStorageModule

// To export a module named RnStorageModule
RCT_EXPORT_MODULE();

//exports a method getDeviceName to javascript
RCT_EXPORT_METHOD(getDeviceName:(RCTResponseSenderBlock)callback){
 @try{
   NSString *deviceName = [[UIDevice currentDevice] name];
   callback(@[[NSNull null], deviceName]);
 }
 @catch(NSException *exception){
   callback(@[exception.reason, [NSNull null]]);
 }
}

//exports a method readStorageValue to javascript
RCT_EXPORT_METHOD(readStorageValue:(NSString *)userLanguage
                  value:(NSString *)value callback: (RCTResponseSenderBlock)callback){
  NSLog(@"Your name is %@", value);
 @try{
   if([value  isEqual: @"fr"]) {
      [[RCTI18nUtil sharedInstance] allowRTL:YES];
        [[RCTI18nUtil sharedInstance] forceRTL:YES];
     callback(@[[NSNull null], value]);
   } else {
     [[RCTI18nUtil sharedInstance] allowRTL:NO];
       [[RCTI18nUtil sharedInstance] forceRTL:NO];
    callback(@[[NSNull null], value]);
   }
   

   
 }
 @catch(NSException *exception){
   callback(@[exception.reason, [NSNull null]]);
 }
}

@end
