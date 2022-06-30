import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import {
  requireNativeComponent,
  DeviceEventEmitter,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { styles } from './BlurView.style';

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

export const BlurView = (props: PropsWithChildren<AndroidProps>) => {

  const blurType: AndroidBlurType = ['light', 'xlight', 'dark'].includes(props.blurType) ? props.blurType as AndroidBlurType : 'dark';

  useEffect(() => {
    DeviceEventEmitter.addListener('ReactNativeBlurError', (message) => {
        throw new Error(`[ReactNativeBlur]: ${message}`);
      });
      return () => {
        DeviceEventEmitter.removeAllListeners('ReactNativeBlurError');
      }
  }, []);

  const overlayColor = useMemo(() => {
    if (props.overlayColor) {
        return props.overlayColor;
      }
      return OVERLAY_COLORS[blurType];
  }, []);

  const blurRadius = useMemo(() => {
    const {blurRadius, blurAmount} = props;

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
    }, []);

  const downsampleFactor: number = useMemo(() => {
    const {downsampleFactor, blurRadius} = props;
    if (downsampleFactor && downsampleFactor !== null) {
      return downsampleFactor;
    }
    return blurRadius ?? 8;
  }, []);

  const {style} = props;

    return (
      <NativeBlurView
        {...props}
        blurRadius={blurRadius}
        downsampleFactor={downsampleFactor}
        overlayColor={overlayColor}
        pointerEvents="none"
        style={StyleSheet.compose(styles.transparent, style)}>
        {props.children}
      </NativeBlurView>
    );
}

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

// requireNativeComponent automatically resolves 'BlurView' to 'BlurViewManager'
const NativeBlurView = requireNativeComponent<AndroidProps>(
  'BlurView',
  // @ts-expect-error because the type declarations are kinda wrong, no?
  BlurView,
);
