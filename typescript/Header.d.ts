/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { ViewStyle, TextStyle, TextProps } from 'react-native';

export interface HeaderActionSheetProps {
  title?: String;
  titleColor?: String;
  titleStyle?: TextStyle;
  messageColor?: String;
  messageStyle?: TextStyle;
  message?: String;
  style?: ViewStyle;
  titleProps?: TextProps;
  messageProps?: TextProps;
}
