import React from 'react';

import { ToastConfigParams } from '../utils/interfaces';
import { Colors } from '../config/theme';
import BaseToast from './BaseToast';

const SuccessToast = ({
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
      icon="checkmark-circle"
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={Colors.success}
      progressBarColor={progressBarColor || Colors.success}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      testID="toast-success"
    />
  );
};


export default SuccessToast;
