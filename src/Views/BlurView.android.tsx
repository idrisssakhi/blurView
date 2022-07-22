import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import {
  requireNativeComponent,
  DeviceEventEmitter,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';

const OVERLAY_COLORS = {
  light: 'rgba(255, 255, 255, 0.2)',
  xlight: 'rgba(255, 255, 255, 0.75)',
  dark: 'rgba(16, 12, 12, 0.64)',
};

type AndroidBlurType =
  | 'dark'
  | 'light'
  | 'xlight';

interface AndroidProps extends ViewProps {
  blurType: AndroidBlurType;
  blurAmount: number;
  downsampleFactor: number;
  blurRadius?: number;
  overlayColor?: string;
}

const BlurView = ({ blurRadius, blurAmount, blurType, overlayColor, downsampleFactor, ...nativeProps}: PropsWithChildren<AndroidProps>) => {
  const calclatedBlurType: AndroidBlurType = ['light', 'xlight', 'dark'].includes(blurType) ? blurType as AndroidBlurType : 'dark';

  useEffect(() => {
    DeviceEventEmitter.addListener('ReactNativeBlurError', (message) => {
        throw new Error(`[ReactNativeBlur]: ${message}`);
      });
      return () => {
        DeviceEventEmitter.removeAllListeners('ReactNativeBlurError');
      }
  }, []);

  const calculatedOverlayColor = useMemo(() => {
    if (overlayColor) {
      return overlayColor;
    }
      return OVERLAY_COLORS[calclatedBlurType];
  }, [overlayColor, calclatedBlurType]);

  const calculatedBlurRadius = useMemo(() => {

    if (blurRadius != null) {
      if (blurRadius > 25) {
        throw new Error(
          `[ReactNativeBlur]: blurRadius cannot be greater than 25! (was: ${blurRadius})`,
        );
      }
      return blurRadius;
    }

    // iOS seems to use a slightly different blurring algorithm (or scale?).
    // Android blurRadius + downsampleFactor is approximately 80% of blurAmount.
    const equivalentBlurRadius = Math.round(blurAmount * 0.8);

    if (equivalentBlurRadius > 25) {
      return 25;
    }
    return equivalentBlurRadius;
    }, [blurRadius, blurAmount]);

  const calculatedDownsampleFactor: number = useMemo(() => {
    if (downsampleFactor && downsampleFactor !== null) {
      return downsampleFactor;
    }
    return blurRadius ?? 8;
  }, [downsampleFactor, blurRadius]);

  const {style} = nativeProps;

  return (
    <NativeBlurView
      blurType={calclatedBlurType}
      blurAmount={calculatedBlurRadius}
      blurRadius={calculatedBlurRadius}
      downsampleFactor={calculatedDownsampleFactor}
      overlayColor={calculatedOverlayColor}
      pointerEvents="none"
      style={StyleSheet.compose(styles.transparent, style)}
      {...nativeProps}>
      {nativeProps.children}
    </NativeBlurView>
  );
}

const styles = StyleSheet.create<{transparent: ViewStyle}>({
  transparent: {backgroundColor: 'transparent'},
});

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

// requireNativeComponent automatically resolves 'BlurView' to 'BlurViewManager'
const NativeBlurView = requireNativeComponent<AndroidProps>('BlurView');

export default BlurView;