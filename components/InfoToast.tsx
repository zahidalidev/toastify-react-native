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
      icon="information-circle"
      text1={text1}
      text2={text2}
      hide={hide}
      onPress={onPress}
      iconColor={iconColor || Colors.info}
      backgroundColor={backgroundColor}
      textColor={textColor}
      iconSize={iconSize}
      progressBarColor={progressBarColor || Colors.info}
      barWidth={barWidth}
      isRTL={isRTL}
      duration={duration}
      showProgressBar={showProgressBar}
      showCloseIcon={showCloseIcon}
      testID="toast-info"
      width={width}
      theme={theme}
      height={height}
      style={style}
    />
  );
};

export default InfoToast;
