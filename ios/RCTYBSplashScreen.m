#import "RCTYBSplashScreen.h"
#import <React/RCTUtils.h>

static bool isVisible = false;
static UIView *defaultLogoView = nil;
static UIView *containerView = nil;

@implementation RCTYBSplashScreen

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"splashScreenDidHide"];
}

+ (void)createDefaultLogoView
{
    if (!defaultLogoView) {
        // Ana container view oluştur
        containerView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
        containerView.backgroundColor = [UIColor whiteColor];
        
        // YB logosu için view (mavi daire)
        defaultLogoView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
        defaultLogoView.backgroundColor = [UIColor colorWithRed:52.0/255.0 
                                                        green:152.0/255.0 
                                                        blue:219.0/255.0 
                                                        alpha:1.0];
        defaultLogoView.layer.cornerRadius = 50;
        defaultLogoView.clipsToBounds = YES;
        
        // YB yazısı
        UILabel *ybLabel = [[UILabel alloc] initWithFrame:defaultLogoView.bounds];
        ybLabel.text = @"YB";
        ybLabel.textColor = [UIColor whiteColor];
        ybLabel.textAlignment = NSTextAlignmentCenter;
        ybLabel.font = [UIFont boldSystemFontOfSize:40];
        
        // View'ları yerleştir
        [defaultLogoView addSubview:ybLabel];
        defaultLogoView.center = containerView.center;
        [containerView addSubview:defaultLogoView];
    }
}

+ (void)updateLogoView:(NSDictionary *)config
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (containerView) {
            // Arka plan rengini güncelle
            if (config[@"backgroundColor"]) {
                containerView.backgroundColor = [RCTConvert UIColor:config[@"backgroundColor"]];
            }
            
            // Logo rengini güncelle
            if (config[@"logoColor"]) {
                defaultLogoView.backgroundColor = [RCTConvert UIColor:config[@"logoColor"]];
            }
        }
    });
}

+ (void)show
{
    if (!isVisible) {
        isVisible = true;
        dispatch_async(dispatch_get_main_queue(), ^{
            UIWindow *window = RCTSharedApplication().keyWindow;
            [self createDefaultLogoView];
            [window addSubview:containerView];
            window.hidden = NO;
        });
    }
}

+ (void)hide
{
    if (isVisible) {
        isVisible = false;
        dispatch_async(dispatch_get_main_queue(), ^{
            [UIView animateWithDuration:0.25 animations:^{
                containerView.alpha = 0;
            } completion:^(BOOL finished) {
                [containerView removeFromSuperview];
                [[NSNotificationCenter defaultCenter] postNotificationName:@"splashScreenDidHide" 
                                                                  object:nil];
            }];
        });
    }
}

RCT_EXPORT_METHOD(show)
{
    [RCTYBSplashScreen show];
}

RCT_EXPORT_METHOD(hide)
{
    [RCTYBSplashScreen hide];
}

RCT_EXPORT_METHOD(updateConfig:(NSDictionary *)config)
{
    [RCTYBSplashScreen updateLogoView:config];
}

@end