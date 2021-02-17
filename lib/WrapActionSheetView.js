/**
 * Created by nghinv on Fri Jan 08 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useImperativeHandle, useState, useRef, useCallback, useEffect } from 'react';
import ActionSheetView from './ActionSheetView';

function WrapActionSheetView(props, ref) {
  const [actionSheetsContent, setActionSheetsContent] = useState([]);
  const actionSheetRef = useRef({});
  const actionSheetCount = useRef(0);
  const currentZIndex = useRef(undefined);

  const setVisible = useCallback((value, id) => {
    if (value) {
      setActionSheetsContent(currentActionSheets => currentActionSheets.map(actionSheet => (actionSheet.id === id ? { ...actionSheet, visible: value } : actionSheet)));
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(actionSheetsContent) && actionSheetsContent.length === 0) {
      currentZIndex.current = undefined;
    }
  }, [actionSheetsContent]);

  useImperativeHandle(ref, () => ({
    show: (content) => {
      actionSheetCount.current++;
      const id = actionSheetCount.current;
      if (content && content.zIndex !== undefined) {
        currentZIndex.current = content.zIndex;
      }
      setActionSheetsContent(currentActionSheets => currentActionSheets.concat({
        ...content,
        id,
        visible: true,
        zIndex: currentZIndex.current,
        setVisible: (value) => setVisible(value, id),
        onHide: () => {
          content && content.onHide && content.onHide();
          setActionSheetsContent(actionSheetsState => actionSheetsState.filter(actionSheet => actionSheet.id !== id));
          actionSheetCount.current--;
        },
      }));
    },
    hide: () => {
      actionSheetRef.current[actionSheetCount.current] && actionSheetRef.current[actionSheetCount.current].hide();
    },
    hideAll: () => {
      Object.keys(actionSheetRef.current).forEach(dataKey => {
        actionSheetRef.current[dataKey] && actionSheetRef.current[dataKey].hide();
      });
    },
  }), [actionSheetCount.current]);

  return actionSheetsContent.map((actionSheet, idx) => {
    return (
      <ActionSheetView
        {...props}
        {...actionSheet}
        nativeModal={false}
        key={`${actionSheet.id}_${idx}`}
        ref={refs => { actionSheetRef.current[actionSheet.id] = refs; }}
      />
    );
  });
}

export default React.memo(forwardRef(WrapActionSheetView));
