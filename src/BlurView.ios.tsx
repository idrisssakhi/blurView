import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native';
import { styles } from './BlurView.style';
import type { BlurViewProperties } from './types';

export const BlurView = (props: BlurViewProperties) => {
  return (
    <NativeBlurView style={StyleSheet.compose(styles.transparent, props?.style)} {...props} />
  );
};

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

// requireNativeComponent automatically resolves 'BlurView' to 'BlurViewManager'
const NativeBlurView = requireNativeComponent<BlurViewProperties>(
  'BlurView',
  // @ts-expect-error because the type declarations are kinda wrong, no?
  BlurView,
);
