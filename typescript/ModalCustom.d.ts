/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

interface ModalCustomProps {
  nativeModal?: Boolean;
  visible?: Boolean;
  avoidKeyboard?: Boolean;
  onDismiss?: () => void;
  zIndex?: Number | null;
}

export declare function ModalCustom(props: ModalCustomProps): JSX.Element;
