import { Platform, Dimensions, PixelRatio } from 'react-native'

const { width } = Dimensions.get('window')

export const isAndroid: boolean = Platform.OS === 'android'
export const isIOS: boolean = Platform.OS === 'ios'

export const SCALE = (size: number, androidRatio: number = 1, iOSRatio: number = 1): number => {
  const baseWidth: number = 375
  const scaleFactor: number = Math.min(width / baseWidth, 1.2)
  const platformRatio: number = isAndroid ? androidRatio : iOSRatio
  const pixelDensity: number = PixelRatio.get()

  const densityAdjustment: number = 3 / pixelDensity

  const newSize: number = size * scaleFactor * platformRatio * densityAdjustment

  const minSize: number = size * (isAndroid ? androidRatio : 0.8)
  const maxSize: number = size * 1.3

  return Math.min(Math.max(newSize, minSize), maxSize)
}

// Helper to handle different toast positions
export const getToastPositionStyle = (
  position: string,
  topOffset: number = 40,
  bottomOffset: number = 40,
) => {
  switch (position) {
    case 'top':
      return { top: topOffset }
    case 'bottom':
      return { bottom: bottomOffset }
    case 'center':
      return { top: 0, bottom: 0, justifyContent: 'center' }
    default:
      return { top: topOffset }
  }
}
