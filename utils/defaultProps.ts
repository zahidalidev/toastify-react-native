import { SCALE } from './helpers'
import { ToastManagerProps } from './interfaces'

const defaultProps: ToastManagerProps = {
  theme: 'light',
  width: '90%',
  height: SCALE(61),
  style: {},
  textStyle: {},
  position: 'top',
  positionValue: 50,
  end: 0,
  duration: 3000,
  animationInTiming: 300,
  animationOutTiming: 300,
  backdropTransitionInTiming: 300,
  backdropTransitionOutTiming: 300,
  animationIn: '',
  animationOut: '',
  animationStyle: 'fade',
  hasBackdrop: false,
  backdropColor: 'black',
  backdropOpacity: 0.2,
  topOffset: 40,
  bottomOffset: 40,
  showCloseIcon: true,
  showProgressBar: true,
  isRTL: false,
}

export default defaultProps
