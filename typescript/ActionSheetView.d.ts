/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { ButtonActionSheetProps } from "./Button";
import { BottomButtonActionSheetProps } from "./BottomButton";
import { HeaderActionSheetProps } from "./Header";
import { SeparatorProps } from "./Separator";

type ButtonActionSheetType = {
  autoDismiss?: Boolean;
}

export interface OverlayProps {
  progress: Animated.SharedValue<Number>;
  onPress?: () => void;
  backgroundColor?: String;
  overlayOpacity?: Number;
  showStatusBar?: Boolean;
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
  overlayProps?: OverlayProps;
}

interface ActionSheetViewInterface extends React.FC<ActionSheetViewProps> {
  Button: React.FC<ButtonActionSheetProps>;
  BottomButton: React.FC<BottomButtonActionSheetProps>;
  Header: React.FC<HeaderActionSheetProps>;
  Separator: React.FC<SeparatorProps>;
}

export const ActionSheetView: ActionSheetViewInterface;
