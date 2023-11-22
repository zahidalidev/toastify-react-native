type AnimationStyle = any

export interface ToastManagerProps {
  positionValue: number
  width: number
  duration: number
  end: number
  animationIn?: any
  animationOut?: any
  backdropTransitionOutTiming: number
  backdropTransitionInTiming: number
  animationInTiming: number
  animationOutTiming: number
  backdropColor: string
  backdropOpacity: number
  hasBackdrop: boolean
  height: number
  style: any
  textStyle: any
  theme: any
  animationStyle?: AnimationStyle
  position?: any
}

export interface ToastManagerState {
  isShow: boolean
  text: string
  opacityValue: any
  barWidth: any
  barColor: string
  icon: string
  position: string
  duration: number
  oldDuration: number
  animationStyle: Record<AnimationStyle, { animationIn: string; animationOut: string }>
}
