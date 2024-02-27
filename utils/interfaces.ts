import {Animated} from "react-native";
import {ModalProps} from "react-native-modal/dist/modal";

type AnimationStyle = "upInUpOut" | "rightInOut" | "zoomInOut"

type Position = "top" | 'bottom'

export interface ToastManagerProps {
    positionValue: number
    position?: Position
    animationIn?: ModalProps['animationIn']
    animationOut?: ModalProps['animationOut']
    backdropTransitionOutTiming: number
    backdropTransitionInTiming: number
    animationInTiming: number
    animationOutTiming: number
    backdropColor: string
    backdropOpacity: number
    hasBackdrop: boolean
    style: any
    textStyle: any
    theme: any
    animationStyle?: AnimationStyle
}

export interface ToastManagerState {
    toasts: ToastType[];
    keyboardHeight: number;
}

export interface ToastType {
    position: string;
    duration: number;
    text: string;
    barColor: string;
    icon: string;
    id: string;
    barWidthAnimation: Animated.Value;
    width: number;
    height?: number;
};

export interface NotificationArgumentsType extends ToastType {
    key?: string;
    positionOffset?: number;
};


export type AnimationStyleProps = Record<string, {
    animationIn: ModalProps['animationIn'],
    animationOut: ModalProps['animationOut'],
}>