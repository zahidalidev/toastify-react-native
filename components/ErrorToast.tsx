import React from 'react';

import { ToastConfigParams } from '../utils/interfaces';
import { Colors } from '../config/theme';
import BaseToast from './BaseToast';

const ErrorToast = ({
  text1,
  text2,
  hide,
  onPress,
  barWidth,
  isRTL,
  duration,
  showProgressBar,
  progressBarColor,
  width,
  height,
  style
}: ToastConfigParams) => {
  return (
    <BaseToast
      icon="alert-circle"
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={Colors.error}
      progressBarColor={progressBarColor || Colors.error}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      testID="toast-error"
      width={width}
      height={height}
      style={style}
    />
  );
};

export default ErrorToast;
