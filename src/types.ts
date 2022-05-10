import { StyleProp, ViewProps, ViewStyle } from "react-native";

export type IosBlurType =
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

  export type AndroidBlurType =
  | 'dark'
  | 'light'
  | 'xlight';

export interface IosProps extends ViewProps {
  blurType: IosBlurType;
  blurAmount: number;
}

export interface AndroidProps extends ViewProps {
    blurType: AndroidBlurType;
    blurAmount: number;
    downsampleFactor: number;
    blurRadius?: number;
    overlayColor?: string;
}

export interface BlurViewProperties {
    blurType?: IosBlurType;
    blurAmount?: number // 0 - 100
    reducedTransparencyFallbackColor?: string
    style?: StyleProp<ViewStyle>
    blurRadius?: number
    downsampleFactor?: number
    overlayColor?: string
  }
