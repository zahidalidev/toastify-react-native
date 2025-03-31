import React from 'react';
import BaseToast from './BaseToast';
import { Colors } from '../config/theme';
import { ToastConfigParams } from '../utils/interfaces';

const WarnToast = ({
  text1,
  text2,
  hide,
  onPress,
  barWidth,
  isRTL,
  duration,
  showProgressBar,
  progressBarColor
}: ToastConfigParams) => {
  return (
    <BaseToast
      icon="warning"
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={Colors.warn}
      progressBarColor={progressBarColor || Colors.warn}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      testID="toast-warn"
    />
  );
};

export default WarnToast;
