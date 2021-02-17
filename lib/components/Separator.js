/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

export interface SeparatorProps {
  type?: 'horizontal' | 'vertical';
  style?: ViewStyle;
  lineWidth?: Number;
  backgroundColor?: String;
}

Separator.defaultProps = {
  type: 'horizontal',
  lineWidth: StyleSheet.hairlineWidth,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
};

export default function Separator(props?: SeparatorProps) {
  const { type, style, lineWidth, backgroundColor } = props;
  const separatorStyle = {
    [type === 'horizontal' ? 'height' : 'width']: lineWidth,
  };

  return (
    <View style={[{ backgroundColor }, separatorStyle, style]} />
  );
}
