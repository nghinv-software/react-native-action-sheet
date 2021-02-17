/**
 * Created by nghinv on Tue Jan 12 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Modal, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

interface ModalCustomProps {
  nativeModal?: Boolean;
  visible?: Boolean;
  avoidKeyboard?: Boolean;
  onDismiss?: () => void;
  zIndex?: Number | null;
}

ModalCustom.defaultProps = {
  nativeModal: true,
  avoidKeyboard: false,
  visible: false,
};

export default function ModalCustom(props?: ModalCustomProps) {
  const { children, nativeModal, avoidKeyboard, visible, onDismiss, zIndex } = props;

  if (nativeModal) {
    return (
      <Modal visible={visible} transparent animationType='none' onDismiss={onDismiss}>
        {
          avoidKeyboard ? (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              pointerEvents='box-none'
              style={StyleSheet.absoluteFillObject}
            >
              {children}
            </KeyboardAvoidingView>
          ) : children
        }
      </Modal>
    );
  }

  if (!visible) return null;

  return (
    <View
      pointerEvents='box-none'
      style={[StyleSheet.absoluteFillObject, { zIndex }]}
    >
      {
        avoidKeyboard ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            pointerEvents='box-none'
            style={StyleSheet.absoluteFillObject}
          >
            {children}
          </KeyboardAvoidingView>
        ) : children
      }
    </View>
  );
}
