import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, StyleProp, ViewStyle, DimensionValue } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Colors } from '../config/theme';
import { SCALE } from '../utils/helpers';

interface BaseToastProps {
  icon?: string;
  text1?: string;
  text2?: string;
  onPress?: () => void;
  hide?: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  showProgressBar?: boolean;
  progressBarColor?: string;
  barWidth?: Animated.Value;
  isRTL?: boolean;
  showCloseIcon?: boolean;
  duration?: number;
  testID?: string;
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ViewStyle>;
}

const BaseToast = ({
  icon = 'checkmark-circle',
  text1,
  text2,
  onPress,
  hide,
  backgroundColor = Colors.light.back,
  textColor = Colors.light.text,
  iconColor = Colors.success,
  showProgressBar = true,
  progressBarColor,
  barWidth: externalBarWidth,
  isRTL = false,
  showCloseIcon = true,
  duration = 3000,
  testID = 'toast-base',
  width,
  height,
  style,
}: BaseToastProps) => {
  // Use a local animated value if no external one is provided
  const localBarWidth = React.useRef(new Animated.Value(100)).current;
  const barWidth = externalBarWidth || localBarWidth;

  // Start progress bar animation if none is provided externally
  useEffect(() => {
    if (!externalBarWidth && showProgressBar) {
      // Set initial value
      localBarWidth.setValue(isRTL ? 0 : 100);

      // Start the animation
      Animated.timing(localBarWidth, {
        toValue: isRTL ? 100 : 0,
        duration,
        useNativeDriver: false
      }).start();
    }
  }, [externalBarWidth, showProgressBar, isRTL, duration, localBarWidth]);

  const rtlContentStyle = isRTL ? { flexDirection: 'row-reverse' } : {};
  const rtlHideButtonStyle = isRTL ? { right: undefined, left: SCALE(3.2) } : {};
  const rtlIconWrapperStyle = isRTL ? { marginRight: 0, marginLeft: SCALE(8) } : {};
  const rtlTextStyle = isRTL ? { textAlign: 'right' } : {};

  // Adjust margin based on RTL
  const textMarginStyle = isRTL
    ? { marginLeft: SCALE(25), marginRight: 0 }
    : { marginRight: SCALE(25), marginLeft: 0 };

  // Create container style with width and height
  const containerStyle = [
    styles.container,
    { backgroundColor },
    width !== undefined && { width: width as DimensionValue },
    height !== undefined && { height: height as DimensionValue },
    style
  ].filter(Boolean);

  return (
    <View
      style={containerStyle}
      testID={testID}
    >
      {showCloseIcon && (
        <TouchableOpacity
          style={[styles.hideButton, rtlHideButtonStyle]}
          onPress={hide}
          activeOpacity={0.7}
          testID={`${testID}-close-button`}
        >
          <Icon name="close-outline" size={22} color={textColor} />
        </TouchableOpacity>
      )}

      <View style={styles.content} testID={`${testID}-content`}>
        <View style={[styles.contentInner, rtlContentStyle]}>
          <Icon
            name={icon}
            size={22}
            color={iconColor}
            style={[styles.iconWrapper, rtlIconWrapperStyle]}
            testID={`${testID}-icon`}
          />
          <View style={{ flex: 1 }} testID={`${testID}-text-container`}>
            {text1 ? (
              <Text
                style={[styles.text1, { color: textColor }, rtlTextStyle, textMarginStyle]}
                testID={`${testID}-text1`}
              >
                {text1}
              </Text>
            ) : null}
            {text2 ? (
              <Text
                style={[styles.text2, { color: textColor }, rtlTextStyle, textMarginStyle]}
                testID={`${testID}-text2`}
              >
                {text2}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      {showProgressBar && (
        <View
          style={styles.progressBarContainer}
          testID={`${testID}-progress-container`}
        >
          {isRTL ? (
            // For RTL: Start from left (0%) and grow to right (100%)
            <Animated.View
              testID={`${testID}-progress-bar`}
              style={{
                position: 'absolute',
                left: 0,
                width: barWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }),
                backgroundColor: progressBarColor || iconColor,
                height: '100%'
              }}
            />
          ) : (
            // For LTR: Start from left (100%) and shrink to left (0%)
            <Animated.View
              testID={`${testID}-progress-bar`}
              style={{
                width: barWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                }),
                backgroundColor: progressBarColor || iconColor,
                height: '100%'
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: SCALE(61),
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideButton: {
    position: "absolute",
    top: SCALE(3.2),
    right: SCALE(3.2),
    zIndex: 10,
  },
  content: {
    width: '100%',
  },
  contentInner: {
    paddingHorizontal: SCALE(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconWrapper: {
    marginRight: SCALE(8),
  },
  text1: {
    fontSize: SCALE(16),
    fontWeight: "500",
  },
  text2: {
    fontSize: SCALE(14),
    fontWeight: "400",
    marginTop: SCALE(4),
    opacity: 0.8,
  },
  progressBarContainer: {
    flexDirection: "row",
    position: "absolute",
    height: 4,
    width: "100%",
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
});

export default BaseToast;
