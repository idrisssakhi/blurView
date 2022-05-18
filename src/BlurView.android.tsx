import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import {
  requireNativeComponent,
  DeviceEventEmitter,
  StyleSheet,
} from 'react-native';
import { AndroidProps } from './types';

const OVERLAY_COLORS = {
  light: 'rgba(255, 255, 255, 0.2)',
  xlight: 'rgba(255, 255, 255, 0.75)',
  dark: 'rgba(16, 12, 12, 0.64)',
};

const BlurView = (props: PropsWithChildren<AndroidProps>) => {

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
      return OVERLAY_COLORS[props.blurType] || OVERLAY_COLORS.dark;
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

  const downsampleFactor = useMemo(() => {
    const {downsampleFactor, blurRadius} = props;
    if (downsampleFactor != null) {
      return downsampleFactor;
    }
    return blurRadius;
  }, []);



    return (
      <NativeBlurView
        blurRadius={blurRadius}
        downsampleFactor={downsampleFactor}
        overlayColor={overlayColor}
        pointerEvents="none"
        style={[styles.transparent, props.style]}>
        {props.children}
      </NativeBlurView>
    );
}

const styles = StyleSheet.create({
  transparent: {backgroundColor: 'transparent'},
});

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

const NativeBlurView = requireNativeComponent('BlurView');

module.exports = BlurView;