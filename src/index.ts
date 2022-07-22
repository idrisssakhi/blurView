import type { View } from 'react-native';
//@ts-ignore
import NativeBlurView from './Views/BlurView';
import type { BlurViewProperties } from './types';

const BlurView = NativeBlurView as React.ComponentType<BlurViewProperties & React.RefAttributes<View>>;

export { BlurView };
export type { BlurViewProperties };