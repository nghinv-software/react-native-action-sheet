/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, StatusBar } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

export interface OverlayProps {
  progress: Animated.SharedValue<Number>;
  onPress?: () => void;
  backgroundColor?: String;
  overlayOpacity?: Number;
  showStatusBar?: Boolean;
}

Overlay.defaultProps = {
  backgroundColor: 'black',
  overlayOpacity: 0.25,
  showStatusBar: true,
};

export default function Overlay(props?: OverlayProps) {
  const { onPress, progress, backgroundColor, overlayOpacity, showStatusBar } = props;

  const containerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, overlayOpacity], Extrapolate.CLAMP),
    };
  });

  return (
    <>
      {
        showStatusBar && <StatusBar backgroundColor='transparent' barStyle='light-content' animated />
      }
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor }, containerStyle]} />
      </TouchableWithoutFeedback>
    </>
  );
}
