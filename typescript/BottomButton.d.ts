/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { ViewStyle, TextStyle } from 'react-native';

export interface BottomButtonActionSheetProps {
  style?: ViewStyle;
  title?: String;
  titleColor?: String;
  borderRadius?: Number;
  backgroundColor?: String;
  titleStyle?: TextStyle;
  onPress?: () => void;
  testIDButton?: String;
  accessibilityLabelButton?: String;
  testIDTitle?: String;
  accessibilityLabelTitle?: String;
}
