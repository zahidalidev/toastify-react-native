import React, { createRef, ReactNode } from 'react'
import ToastManager from './components/ToastManager'
import { ToastRef, ToastShowParams, ToastPosition, IconFamily } from './utils/interfaces'
import defaultConfig from './utils/defaultConfig'

// Create a ref to the ToastManager
const toastRef = createRef<ToastRef>()

// Set the ref to the ToastManager
ToastManager.setRef(toastRef)

// Export toast functions that use the ref
export const Toast = {
  show: (options: ToastShowParams) => {
    toastRef.current?.show(options)
  },
  hide: () => {
    toastRef.current?.hide()
  },
  success: (
    text: string,
    position?: ToastPosition,
    icon?: string | ReactNode,
    iconFamily?: IconFamily,
    useModal?: boolean,
  ) => {
    toastRef.current?.show({
      type: 'success',
      text1: text,
      position,
      icon,
      iconFamily,
      useModal,
    })
  },
  error: (
    text: string,
    position?: ToastPosition,
    icon?: string | ReactNode,
    iconFamily?: IconFamily,
    useModal?: boolean,
  ) => {
    toastRef.current?.show({
      type: 'error',
      text1: text,
      position,
      icon,
      iconFamily,
      useModal,
    })
  },
  info: (
    text: string,
    position?: ToastPosition,
    icon?: string | ReactNode,
    iconFamily?: IconFamily,
    useModal?: boolean,
  ) => {
    toastRef.current?.show({
      type: 'info',
      text1: text,
      position,
      icon,
      iconFamily,
      useModal,
    })
  },
  warn: (
    text: string,
    position?: ToastPosition,
    icon?: string | ReactNode,
    iconFamily?: IconFamily,
    useModal?: boolean,
  ) => {
    toastRef.current?.show({
      type: 'warn',
      text1: text,
      position,
      icon,
      iconFamily,
      useModal,
    })
  },
}

// Add a special JSX component that should be placed at the root level of your app
export default function ToastProvider(props: any) {
  // Merge provided config with default config
  const mergedConfig = props.config ? { ...defaultConfig, ...props.config } : defaultConfig

  return React.createElement(ToastManager, {
    ...props,
    config: mergedConfig,
    ref: toastRef,
  })
}

// Export the components for custom configuration
export { default as BaseToast } from './components/BaseToast'
export { default as SuccessToast } from './components/SuccessToast'
export { default as ErrorToast } from './components/ErrorToast'
export { default as InfoToast } from './components/InfoToast'
export { default as WarnToast } from './components/WarnToast'
