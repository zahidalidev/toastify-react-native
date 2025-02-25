type AnimationStyle = any;

type Position = "top" | "center" | "bottom" | undefined;

export interface ToastManagerProps {
  positionValue: number;
  width: number | "auto";
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
  height: number | "auto";
  style: any;
  textStyle: any;
  theme: any;
  animationStyle?: AnimationStyle;
  position?: Position;
  showCloseIcon: boolean;
  showActionIcon: boolean;
  showProgressBar: boolean;
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
