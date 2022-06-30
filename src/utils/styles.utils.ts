import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

const castType =
  <Type>() =>
  (arg: Type) =>
    arg;

export const style = {
  view: castType<ViewStyle>(),
  text: castType<TextStyle>(),
  image: castType<ImageStyle>(),
};
