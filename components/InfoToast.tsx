import React from 'react';

import { ToastConfigParams } from '../utils/interfaces';
import { Colors } from '../config/theme';
import BaseToast from './BaseToast';

const InfoToast = ({
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
      width={width}
      height={height}
      style={style}
    />
  );
};

export default InfoToast;
