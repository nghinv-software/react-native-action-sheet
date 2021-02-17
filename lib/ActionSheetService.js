/**
 * Created by nghinv on Mon Jan 11 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useEffect } from 'react';
import WrapActionSheetView from './WrapActionSheetView';
import WrapActionSheetViewNativeModal from './WrapActionSheetViewNativeModal';
import { ActionSheetViewProps } from './ActionSheetView';

export interface ActionSheetServiceType {
  show: (content: ActionSheetViewProps) => void;
  hide: () => void;
  hideAll: () => void;
}

interface ActionSheetViewPropsType extends ActionSheetViewProps {
  reference?: (data: ActionSheetServiceType) => void;
}

// eslint-disable-next-line import/no-mutable-exports
let ActionSheet: ActionSheetServiceType;

export default function ActionSheetService({ children, nativeModal = true, reference, ...defaultProps }: ActionSheetViewPropsType) {
  useEffect(() => {
    reference && reference(ActionSheet);
  }, [reference]);

  return (
    <>
      {children}
      {
        nativeModal ? (
          <WrapActionSheetViewNativeModal {...defaultProps} nativeModal={nativeModal} ref={refs => { ActionSheet = refs; }} />
        ) : <WrapActionSheetView {...defaultProps} nativeModal={nativeModal} ref={refs => { ActionSheet = refs; }} />
      }
    </>
  );
}

export { ActionSheet };
