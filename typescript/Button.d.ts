/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { TextStyle, ViewStyle } from 'react-native';
import { IconType } from '@nghinv/react-native-icons';

export interface ButtonActionSheetProps {
  title: String;
  onPress?: () => void;
  checked: Boolean;
  titleCenter: Boolean;
  titleColor?: String;
  iconCheckColor?: String;
  leftIconName?: String;
  leftIconColor?: String;
  leftIconType: IconType;
  renderRight?: () => void;
  testIDButton?: String;
  accessibilityLabelButton?: String;
  testIDTitle?: String;
  accessibilityLabelTitle?: String;
  titleStyle?: TextStyle;
  iconCheckStyle?: ViewStyle;
}
