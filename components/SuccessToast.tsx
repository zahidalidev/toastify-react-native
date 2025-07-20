import React from 'react';
import BaseToast from './BaseToast';
import { Colors } from '../config/theme';
import { ToastConfigParams } from '../utils/interfaces';

const SuccessToast = ({
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
      icon={icon || "checkmark-circle"}
      iconFamily={iconFamily || "Ionicons"}
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={iconColor || Colors.success}
      iconSize={iconSize}
      progressBarColor={progressBarColor || Colors.success}
      backgroundColor={backgroundColor}
      textColor={textColor}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      showCloseIcon={showCloseIcon}
      testID="toast-success"
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

export default SuccessToast;
