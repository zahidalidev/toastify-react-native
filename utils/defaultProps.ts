import { ToastManagerProps } from './interfaces'
import { SCALE } from './helpers'

const defaultProps: ToastManagerProps = {
  theme: 'light',
  width: '90%',
  height: SCALE(61),
  style: {},
  textStyle: {},
  position: 'top',
  duration: 3000,
  animationStyle: 'fade',
  topOffset: 40,
  bottomOffset: 40,
  showCloseIcon: true,
  showProgressBar: true,
  isRTL: false,
  iconSize: SCALE(22),
}

export default defaultProps
