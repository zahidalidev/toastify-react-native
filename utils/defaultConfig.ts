import React from 'react'

import { ToastConfig, ToastConfigParams } from './interfaces'
import SuccessToast from '../components/SuccessToast'
import ErrorToast from '../components/ErrorToast'
import InfoToast from '../components/InfoToast'
import WarnToast from '../components/WarnToast'

const defaultConfig: ToastConfig = {
  success: (props: ToastConfigParams) => React.createElement(SuccessToast, props),
  error: (props: ToastConfigParams) => React.createElement(ErrorToast, props),
  info: (props: ToastConfigParams) => React.createElement(InfoToast, props),
  warn: (props: ToastConfigParams) => React.createElement(WarnToast, props),
  default: (props: ToastConfigParams) => React.createElement(InfoToast, props),
}

export default defaultConfig
