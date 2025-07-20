import { ToastManagerProps } from './interfaces'
import { SCALE } from './helpers'

const defaultProps: ToastManagerProps = {
  theme: 'light',
  width: '90%',
  minHeight: SCALE(61),
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
  iconFamily: 'Ionicons',
  icons: {
    success: 'checkmark-circle',
    error: 'alert-circle',
    info: 'information-circle',
    warn: 'warning',
    default: 'checkmark-circle',
  },
  useModal: true,
  closeIcon: 'close-outline',
  closeIconSize: SCALE(22),
  closeIconFamily: 'Ionicons',
}

export default defaultProps
