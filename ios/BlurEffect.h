#import <UIKit/UIKit.h>

@interface BlurEffect : UIBlurEffect
@property (nonatomic, strong) NSNumber *blurAmount;

+ (instancetype)effectWithStyle:(UIBlurEffectStyle)style andBlurAmount:(NSNumber*)blurAmount;
@end
