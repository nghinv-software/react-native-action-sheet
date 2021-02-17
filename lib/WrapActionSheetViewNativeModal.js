/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import ActionSheetView from './ActionSheetView';

function WrapActionSheetViewNativeModal(props, ref) {
  const [actionSheetContent, setActionSheetContent] = useState(undefined);
  const actionSheetRef = useRef({});

  useImperativeHandle(ref, () => ({
    show: (content) => {
      setActionSheetContent({
        ...content,
        onHide: () => {
          content && content.onHide && content.onHide();
          setActionSheetContent(undefined);
        },
      });
      actionSheetRef.current.show();
    },
    hide: () => {
      actionSheetRef.current.hide();
    },
    hideAll: () => {
      actionSheetRef.current.close();
    },
  }));

  return (
    <ActionSheetView
      {...props}
      {...(actionSheetContent || {})}
      nativeModal
      ref={actionSheetRef}
    />
  );
}

export default React.memo(forwardRef(WrapActionSheetViewNativeModal));
