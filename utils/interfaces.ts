import { ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type ToastPosition = 'top' | 'center' | 'bottom'
export type ToastType = 'success' | 'error' | 'info' | 'warn' | 'default'
export type AnimationStyle = 'none' | 'slide' | 'fade'
export type IconFamily =
  | 'Ionicons'
  | 'MaterialIcons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'MaterialCommunityIcons'
  | 'Entypo'
  | 'Feather'
  | 'AntDesign'
  | 'Octicons'
  | 'SimpleLineIcons'

export interface ToastShowParams {
  type?: ToastType
  text1?: string
  text2?: string
  position?: ToastPosition
  visibilityTime?: number
  autoHide?: boolean
  topOffset?: number
  bottomOffset?: number
  props?: Record<string, any>
  onShow?: () => void
  onHide?: () => void
  onPress?: () => void
  progressBarColor?: string
  backgroundColor?: string
  textColor?: string
  iconColor?: string
  iconSize?: number
  icon?: string | ReactNode
  iconFamily?: IconFamily
  theme?: 'light' | 'dark'
  testID?: string
  useModal?: boolean
  closeIcon?: string | ReactNode
  closeIconSize?: number
  closeIconColor?: string
  closeIconFamily?: IconFamily
}

export interface ToastConfig {
  [key: string]: (props: ToastConfigParams) => ReactNode
}

export interface ToastConfigParams {
  text1?: string
  text2?: string
  type?: ToastType
  props?: any
  position?: ToastPosition
  hide?: () => void
  show?: (options: ToastShowParams) => void
  isVisible?: boolean
  onPress?: () => void
  barWidth?: any
  isRTL?: boolean
  duration?: number
  showProgressBar?: boolean
  showCloseIcon?: boolean
  progressBarColor?: string
  backgroundColor?: string
  textColor?: string
  iconColor?: string
  iconSize?: number
  icon?: string | ReactNode
  iconFamily?: IconFamily
  testID?: string
  width?: number | string
  minHeight?: number | string
  style?: StyleProp<ViewStyle>
  theme?: 'light' | 'dark'
  useModal?: boolean
  closeIcon?: string | ReactNode
  closeIconSize?: number
  closeIconColor?: string
  closeIconFamily?: IconFamily
}

export interface ToastManagerProps {
  width?: number | string | 'auto'
  minHeight?: number | string | 'auto'
  duration?: number
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  theme?: 'light' | 'dark'
  animationStyle?: AnimationStyle
  position?: ToastPosition
  showCloseIcon?: boolean
  showProgressBar?: boolean
  isRTL?: boolean
  config?: ToastConfig
  ref?: any
  topOffset?: number
  bottomOffset?: number
  testID?: string
  iconSize?: number
  icons?: {
    success?: string | ReactNode
    error?: string | ReactNode
    info?: string | ReactNode
    warn?: string | ReactNode
    default?: string | ReactNode
  }
  iconFamily?: IconFamily
  useModal?: boolean
  closeIcon?: string | ReactNode
  closeIconSize?: number
  closeIconColor?: string
  closeIconFamily?: IconFamily
}

export interface ToastRef {
  show: (options: ToastShowParams) => void
  hide: () => void
  success: (text: string, position?: ToastPosition) => void
  error: (text: string, position?: ToastPosition) => void
  info: (text: string, position?: ToastPosition) => void
  warn: (text: string, position?: ToastPosition) => void
}

export interface ToastState {
  isVisible: boolean
  type: ToastType
  text1: string
  text2?: string
  position: ToastPosition
  props?: Record<string, any>
  duration: number
  barWidth: any
  isPaused: boolean
  pausedDuration?: number
  onShow?: () => void
  onHide?: () => void
  onPress?: () => void
  progressBarColor?: string
  backgroundColor?: string
  textColor?: string
  iconColor?: string
  iconSize?: number
  icon?: string | ReactNode
  iconFamily?: IconFamily
  theme?: 'light' | 'dark'
  useModal?: boolean
  closeIcon?: string | ReactNode
  closeIconSize?: number
  closeIconColor?: string
  closeIconFamily?: IconFamily
}

export interface AnimationConfig {
  [key: string]: {
    animateIn: any
    animateOut: any
  }
}
