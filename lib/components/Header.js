/**
 * Created by nghinv on Sat Jan 09 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TextProps } from 'react-native';

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

Header.defaultProps = {
  titleColor: 'rgba(0, 0, 0, 0.6)',
  messageColor: 'rgba(0, 0, 0, 0.6)',
};

export default function Header(props?: HeaderActionSheetProps) {
  const { title, message, style, titleColor, titleStyle, messageColor, messageStyle, titleProps, messageProps } = props;
  return (
    <View style={[styles.container, style]}>
      {
        title !== undefined && <Text numberOfLines={1} {...titleProps} style={[styles.txtTitle, { color: titleColor }, titleStyle]}>{title}</Text>
      }
      {
        message !== undefined && <Text numberOfLines={1} {...messageProps} style={[styles.txtMessage, { color: messageColor }, messageStyle]}>{message}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 56,
    maxHeight: 64,
    justifyContent: 'center',
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  txtMessage: {
    textAlign: 'center',
    marginTop: 2,
    fontSize: 12,
    fontWeight: '400',
  },
});
