#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCTYBSplashScreen : RCTEventEmitter <RCTBridgeModule>

/**
 * Splash screen'i göster
 */
+ (void)show;

/**
 * Splash screen'i gizle
 */
+ (void)hide;

/**
 * Varsayılan logo view'ını oluştur
 */
+ (void)createDefaultLogoView;

/**
 * Logo view'ını güncelle
 */
+ (void)updateLogoView:(NSDictionary *)config;

@end