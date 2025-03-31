import React from 'react';

import { ToastConfigParams } from '../utils/interfaces';
import { Colors } from '../config/theme';
import BaseToast from './BaseToast';

const WarnToast = ({
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
      width={width}
      height={height}
      style={style}
    />
  );
};

export default WarnToast;
