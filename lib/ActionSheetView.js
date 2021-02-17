/**
 * Created by nghinv on Sat Jan 09 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, BackHandler } from 'react-native';
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { defaultSpringConfig, defaultTimingConfig } from './utils';
import { isNullOrUndefined } from './utils';
import ModalCustom from './components/ModalCustom';
import Overlay from './components/Overlay';
import Separator, { SeparatorProps } from './components/Separator';
import Button, { ButtonActionSheetProps } from './components/Button';
import BottomButton, { BottomButtonActionSheetProps } from './components/BottomButton';
import Header, { HeaderActionSheetProps } from './components/Header';

type ButtonActionSheetType = {
  autoDismiss?: Boolean;
}
type OptionsActionSheet = Array<ButtonActionSheetProps | ButtonActionSheetType>

export interface ActionSheetViewProps {
  title?: String;
  message?: String;
  bottomTitle?: String;
  options: OptionsActionSheet;
  renderContent?: React.FC;
  renderBackground?: React.FC;
  borderRadius?: Number;
  width?: Number | String;
  nativeModal: Boolean;
  backgroundColor?: String;
  separatorColor?: String;
  animationType?: 'spring' | 'timing';
  springAnimationConfig: Object;
  timingAnimationConfig: Object;
  onHide?: () => void;
  zIndex?: Number | null;
  headerProps?: HeaderActionSheetProps;
  buttonProps?: ButtonActionSheetProps;
  bottomButtonProps?: BottomButtonActionSheetProps;
  testIDActionSheet?: String;
  accessibilityLabelActionSheet?: String;
  showStatusBar?: Boolean;
}

interface ActionSheetViewInterface extends React.FC<ActionSheetViewProps> {
  Button: React.FC<ButtonActionSheetProps>;
  BottomButton: React.FC<BottomButtonActionSheetProps>;
  Header: React.FC<HeaderActionSheetProps>;
  Separator: React.FC<SeparatorProps>;
}

const SCREEN = Dimensions.get('window');

function ActionSheetViewComponent(props?: ActionSheetViewProps, ref: React.Ref) {
  const {
    title,
    message,
    bottomTitle,
    options,
    width,
    renderContent,
    nativeModal,
    backgroundColor,
    separatorColor,
    animationType,
    springAnimationConfig,
    timingAnimationConfig,
    avoidKeyboard,
    onHide,
    renderBackground,
    borderRadius,
    headerProps,
    buttonProps,
    bottomButtonProps,
    zIndex,
    testIDActionSheet,
    accessibilityLabelActionSheet,
    showStatusBar,
  } = props;
  const [visible, setVisible] = useState(props.visible);
  const progress = useSharedValue(0);
  const backHandler = useRef();
  const _mounted = useRef(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      onDismissModal();
    },
  }));

  useEffect(() => {
    if (visible) {
      backHandler.current = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      if (animationType === 'spring') {
        progress.value = withSpring(1, springAnimationConfig);
      } else {
        progress.value = withTiming(1, timingAnimationConfig);
      }
    }
  }, [visible]);

  useEffect(() => {
    _mounted.current = true;

    return () => {
      _mounted.current = false;
    };
  }, []);

  const handleBackButton = () => {
    onDismissModal();
    return true;
  };

  const onDismissModal = useCallback(() => {
    if (backHandler.current) {
      backHandler.current.remove();
      backHandler.current = null;
    }

    progress.value = withTiming(0, { duration: 150, easing: Easing.linear }, () => {
      runOnJS(oncancel)();
    });
  }, []);

  const oncancel = useCallback(() => {
    _mounted.current && setVisible(false);
    onHide && onHide();
  }, [onHide]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(progress.value, [0, 1], [SCREEN.height, 0], Extrapolate.CLAMP) },
      ],
    };
  });

  const safeArea = useSafeAreaInsets();
  const hadHeader = !isNullOrUndefined(title) || !isNullOrUndefined(message);

  return (
    <ModalCustom
      nativeModal={nativeModal}
      visible={visible}
      avoidKeyboard={avoidKeyboard}
      onDismiss={onDismissModal}
      zIndex={zIndex}
    >
      <Overlay showStatusBar={showStatusBar} progress={progress} onPress={onDismissModal} />
      <View pointerEvents='box-none' style={styles.container}>
        <Animated.View testID={testIDActionSheet} accessibilityLabel={accessibilityLabelActionSheet} pointerEvents='box-none' style={contentStyle}>
          {
            renderContent ? renderContent() : (
              <View pointerEvents='box-none' style={[styles.viewContent, { width, borderRadius, paddingTop: safeArea.top, paddingBottom: safeArea.bottom }]}>
                <View style={[styles.viewTop, { backgroundColor, borderRadius }]}>
                  {
                    renderBackground && (
                      <View style={StyleSheet.absoluteFillObject}>
                        {renderBackground()}
                      </View>
                    )
                  }
                  {
                    hadHeader && (
                      <>
                        <Header
                          {...headerProps}
                          title={title}
                          message={message}
                        />
                        <Separator backgroundColor={separatorColor} />
                      </>
                    )
                  }
                  {
                    Array.isArray(options) && options.length > 0 && (
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                          maxHeight: SCREEN.height - (hadHeader ? 64 : 0) - (!isNullOrUndefined(bottomTitle) ? 56 : 0) - 16 - 24 - (safeArea.top + safeArea.bottom),
                        }}
                        bounces={false}
                      >
                        {
                          options.map((option, idx) => (
                            <React.Fragment key={String(idx)}>
                              {
                                idx > 0 && idx < options.length && <Separator backgroundColor={separatorColor} />
                              }
                              <Button
                                {...buttonProps}
                                {...option}
                                onPress={() => {
                                  option.autoDismiss !== false && onDismissModal();
                                  if (nativeModal) {
                                    setTimeout(() => {
                                      option.onPress && option.onPress(onDismissModal);
                                    }, 200);
                                  } else {
                                    option.onPress && option.onPress(onDismissModal);
                                  }
                                }}
                              />
                            </React.Fragment>
                          ))
                        }
                      </ScrollView>
                    )
                  }
                </View>
                {
                  !isNullOrUndefined(bottomTitle) && (
                    <View style={styles.viewBottom}>
                      {
                        renderBackground && (
                          <View style={[StyleSheet.absoluteFillObject, { borderRadius, overflow: 'hidden' }]}>
                            {renderBackground()}
                          </View>
                        )
                      }
                      <BottomButton
                        {...bottomButtonProps}
                        borderRadius={borderRadius}
                        backgroundColor={backgroundColor}
                        onPress={onDismissModal}
                        title={bottomTitle}
                      />
                    </View>
                  )
                }
              </View>
            )
          }
        </Animated.View>
      </View>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewContent: {
    marginHorizontal: 8,
    marginBottom: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  viewTop: {
    overflow: 'hidden',
    flexWrap: 'nowrap',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  viewBottom: {
    marginTop: 8,
  },
  row: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ActionSheetView: ActionSheetViewInterface = React.memo(forwardRef(ActionSheetViewComponent));

ActionSheetView.defaultProps = {
  backgroundColor: 'white',
  animationType: 'timing',
  options: [],
  borderRadius: 13,
  width: Math.min(SCREEN.width - 16, 450),
  nativeModal: true,
  visible: false,
  springAnimationConfig: defaultSpringConfig,
  timingAnimationConfig: defaultTimingConfig,
};

// Component ActionSheet Header
ActionSheetView.Header = Header;

// Component ActionSheet Button
ActionSheetView.Button = Button;

// Component ActionSheet Separator
ActionSheetView.Separator = Separator;

// Component ActionSheet BottomButton
ActionSheetView.BottomButton = BottomButton;

export default ActionSheetView;
