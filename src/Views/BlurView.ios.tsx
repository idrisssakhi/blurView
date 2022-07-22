import React from 'react'
import { requireNativeComponent, StyleSheet, ViewStyle } from 'react-native';

import type { BlurViewProperties } from '../types';

const BlurView = (props: BlurViewProperties) => {
  return (
    <NativeBlurView style={StyleSheet.compose(styles.transparent, props?.style)} {...props} />
  );
};

const styles = StyleSheet.create<{transparent: ViewStyle}>({
  transparent: {backgroundColor: 'transparent'},
});

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

// requireNativeComponent automatically resolves 'BlurView' to 'BlurViewManager'
const NativeBlurView = requireNativeComponent<BlurViewProperties>('BlurView');

export default BlurView;