/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { ActionSheetViewProps } from "./ActionSheetView";

export interface ActionSheetServiceType {
  show: (content: ActionSheetViewProps) => void;
  hide: () => void;
  hideAll: () => void;
}

interface ActionSheetViewPropsType extends ActionSheetViewProps {
  reference?: (data: ActionSheetServiceType) => void;
}

export const ActionSheet: ActionSheetServiceType;

export declare function ActionSheetService(props: ActionSheetViewPropsType): JSX.Element;
