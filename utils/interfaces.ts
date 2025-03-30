import { DimensionValue, StyleProp, TextStyle, ViewStyle } from "react-native";

type AnimationStyle = any;

type Position = "top" | "center" | "bottom" | undefined;

export interface ToastManagerProps {
  positionValue: number;
  width: DimensionValue;
  duration: number;
  end: number;
  animationIn?: any;
  animationOut?: any;
  backdropTransitionOutTiming: number;
  backdropTransitionInTiming: number;
  animationInTiming: number;
  animationOutTiming: number;
  backdropColor: string;
  backdropOpacity: number;
  hasBackdrop: boolean;
  height: DimensionValue;
  style: StyleProp<ViewStyle>;
  textStyle: TextStyle;
  theme: any;
  animationStyle?: AnimationStyle;
  position?: Position;
  showCloseIcon: boolean;
  showProgressBar: boolean;
  isRTL: boolean;
}

export interface ToastManagerState {
  isShow: boolean;
  text: string;
  opacityValue: any;
  barWidth: any;
  barColor: string;
  icon: string;
  position: Position;
  duration?: number;
  oldDuration?: number;
  animationStyle: Record<
    AnimationStyle,
    {
      animationIn: string;
      animationOut: string;
    }
  >;
}
