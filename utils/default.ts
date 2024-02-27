import {Animated,} from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {ToastType} from "./interfaces";
import {Colors} from '../config/theme'


export const defaultProps = {
    theme: 'light',
    style: {},
    textStyle: {},
    position: 'top',
    positionValue: 50,
    animationInTiming: 300,
    animationOutTiming: 300,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
    animationIn: '',
    animationOut: '',
    animationStyle: 'slide',
    hasBackdrop: false,
    backdropColor: 'black',
    backdropOpacity: 0.2,
}


export const defaultToastData: Partial<ToastType> = {
    position: 'top',
    duration: 3000,
    text: '',
    barColor: Colors.default,
    icon: 'checkmark-circle',
    barWidthAnimation: new Animated.Value(RFPercentage(32)),
    width: RFPercentage(32),
    height: RFPercentage(8.5),
}