import React from 'react';
import BaseToast from './BaseToast';
import { Colors } from '../config/theme';
import { ToastConfigParams } from '../utils/interfaces';

const ErrorToast = ({
  text1,
  text2,
  hide,
  onPress,
  barWidth,
  isRTL,
  duration,
  showProgressBar,
  showCloseIcon,
  progressBarColor,
  backgroundColor,
  textColor,
  iconColor,
  iconSize,
  icon,
  iconFamily,
  width,
  minHeight,
  style,
  theme = 'light',
  closeIcon,
  closeIconSize,
  closeIconColor,
  closeIconFamily
}: ToastConfigParams) => {
  return (
    <BaseToast
      icon={icon || "alert-circle"}
      iconFamily={iconFamily || "Ionicons"}
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={iconColor || Colors.error}
      iconSize={iconSize}
      progressBarColor={progressBarColor || Colors.error}
      backgroundColor={backgroundColor}
      textColor={textColor}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      showCloseIcon={showCloseIcon}
      testID="toast-error"
      theme={theme}
      width={width}
      minHeight={minHeight}
      style={style}
      closeIcon={closeIcon}
      closeIconSize={closeIconSize}
      closeIconColor={closeIconColor}
      closeIconFamily={closeIconFamily}
    />
  );
};

export default ErrorToast;
