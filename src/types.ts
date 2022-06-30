import type { StyleProp, ViewStyle } from "react-native";

export type BlurType =
  | 'dark'
  | 'light'
  | 'xlight'
  | 'prominent'
  | 'regular'
  | 'extraDark'
  | 'chromeMaterial'
  | 'material'
  | 'thickMaterial'
  | 'thinMaterial'
  | 'ultraThinMaterial'
  | 'chromeMaterialDark'
  | 'materialDark'
  | 'thickMaterialDark'
  | 'thinMaterialDark'
  | 'ultraThinMaterialDark'
  | 'chromeMaterialLight'
  | 'materialLight'
  | 'thickMaterialLight'
  | 'thinMaterialLight'
  | 'ultraThinMaterialLight';

export interface BlurViewProperties {
  blurType: BlurType;
  blurAmount: number; // 0 - 100
  blurRadius: number;
  reducedTransparencyFallbackColor?: string;
  style?: StyleProp<ViewStyle>;
  downsampleFactor?: number;
  overlayColor?: string;
}
