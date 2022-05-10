import {requireNativeComponent, StyleSheet, ViewProps} from 'react-native';
import { IosProps } from './types';

const BlurView = (props: IosProps) => {
  return (
    <NativeBlurView style={[styles.transparent, props?.style]} {...props} />
  );
};

const styles = StyleSheet.create({
  transparent: {backgroundColor: 'transparent'},
});

BlurView.defaultProps = {
  blurType: 'dark',
  blurAmount: 10,
};

const NativeBlurView = requireNativeComponent('BlurView', BlurView);

module.exports = BlurView;
