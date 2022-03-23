/**
 * Created by nghinv on Sat Jan 09 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { Icon, IconType } from '@nghinv/react-native-icons';
import { isNullOrUndefined } from '../utils';

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
  iconCheckSize?: Number;
  leftIconComponent?: React.ReactNode;
}

Button.defaultProps = {
  titleColor: '#0066FF',
  iconCheckColor: '#0066FF',
  leftIconColor: '#0066FF',
  titleCenter: true,
  iconCheckSize: 24,
};

export default function Button(props?: ButtonActionSheetProps) {
  const {
    title,
    onPress,
    checked,
    titleColor,
    iconCheckColor,
    leftIconName,
    leftIconColor,
    leftIconType,
    renderRight,
    testIDButton,
    accessibilityLabelButton,
    testIDTitle,
    accessibilityLabelTitle,
    titleCenter,
    titleStyle,
    iconCheckSize,
    iconCheckStyle,
    leftIconComponent,
  } = props;
  const textCenter = (isNullOrUndefined(checked) && !leftIconName && !leftIconComponent && !renderRight) || titleCenter;
  return (
    <TouchableOpacity
      testID={testIDButton}
      accessibilityLabel={accessibilityLabelButton}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, textCenter && { justifyContent: 'center' }]}
    >
      {
        leftIconComponent ? leftIconComponent : leftIconName ? (
          <Icon
            style={styles.leftIcon}
            type={leftIconType}
            name={leftIconName}
            color={leftIconColor}
            size={32}
          />
        ) : null
      }
      <Text
        testID={testIDTitle}
        accessibilityLabel={accessibilityLabelTitle}
        numberOfLines={2}
        style={[styles.txtTitle, { color: titleColor }, !textCenter && { flex: 1 }, titleStyle]}
      >
        {title}
      </Text>
      {renderRight && renderRight()}
      {
        checked && (
          <Icon
            style={[styles.icon, iconCheckStyle]}
            name='check'
            color={iconCheckColor}
            size={iconCheckSize}
          />
        )
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 54,
    alignItems: 'center',
    padding: 12,
    flexDirection: 'row',
  },
  leftIcon: {
    marginRight: 8,
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24,
  },
  icon: {
    marginLeft: 8,
  },
});
