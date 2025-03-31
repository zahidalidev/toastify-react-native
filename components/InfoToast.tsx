import React from 'react';
import BaseToast from './BaseToast';
import { Colors } from '../config/theme';
import { ToastConfigParams } from '../utils/interfaces';

const InfoToast = ({
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
      icon="information-circle"
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={Colors.info}
      progressBarColor={progressBarColor || Colors.info}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      testID="toast-info"
    />
  );
};

export default InfoToast;
