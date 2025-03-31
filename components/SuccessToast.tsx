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
  progressBarColor,
  backgroundColor,
  textColor,
  iconColor,
  iconSize,
  width,
  height,
  style,
  theme = 'light'
}: ToastConfigParams) => {
  return (
    <BaseToast
      icon="checkmark-circle"
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
      testID="toast-success"
      theme={theme}
      width={width}
      height={height}
      style={style}
    />
  );
};

export default SuccessToast;
