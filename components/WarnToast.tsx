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
  showCloseIcon,
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
      icon="warning"
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={iconColor || Colors.warn}
      iconSize={iconSize}
      backgroundColor={backgroundColor}
      textColor={textColor}
      progressBarColor={progressBarColor || Colors.warn}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      showCloseIcon={showCloseIcon}
      testID="toast-warn"
      width={width}
      theme={theme}
      height={height}
      style={style}
    />
  );
};

export default WarnToast;
