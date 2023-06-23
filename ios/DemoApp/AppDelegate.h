#import <React/RCTBridgeDelegate.h>
#import <RNCAsyncStorage.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, RNCAsyncStorageDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
