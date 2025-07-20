import React, { useEffect, ReactNode } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, StyleProp, ViewStyle, DimensionValue } from 'react-native';

import { Colors } from '../config/theme';
import { SCALE } from '../utils/helpers';

// Dynamic icon loader function
const loadIconFamily = (familyName: string) => {
  try {
    switch (familyName) {
      case 'Ionicons':
        return require('react-native-vector-icons/Ionicons').default;
      case 'MaterialIcons':
        return require('react-native-vector-icons/MaterialIcons').default;
      case 'FontAwesome':
        return require('react-native-vector-icons/FontAwesome').default;
      case 'FontAwesome5':
        return require('react-native-vector-icons/FontAwesome5').default;
      case 'MaterialCommunityIcons':
        return require('react-native-vector-icons/MaterialCommunityIcons').default;
      case 'Entypo':
        return require('react-native-vector-icons/Entypo').default;
      case 'Feather':
        return require('react-native-vector-icons/Feather').default;
      case 'AntDesign':
        return require('react-native-vector-icons/AntDesign').default;
      case 'Octicons':
        return require('react-native-vector-icons/Octicons').default;
      case 'SimpleLineIcons':
        return require('react-native-vector-icons/SimpleLineIcons').default;
      default:
        throw new Error(`Icon family ${familyName} not found`);
    }
  } catch (error) {
    console.warn(`Icon family ${familyName} not found. Please install react-native-vector-icons or use custom icons.`);
    return null;
  }
};

// Available icon families
const IconFamilies = [
  'Ionicons',
  'MaterialIcons',
  'FontAwesome',
  'FontAwesome5',
  'MaterialCommunityIcons',
  'Entypo',
  'Feather',
  'AntDesign',
  'Octicons',
  'SimpleLineIcons'
] as const;

interface BaseToastProps {
  icon?: string | ReactNode;
  iconFamily?: typeof IconFamilies[number] | string;
  text1?: string;
  text2?: string;
  onPress?: () => void;
  hide?: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  iconSize?: number;
  showProgressBar?: boolean;
  progressBarColor?: string;
  barWidth?: Animated.Value;
  isRTL?: boolean;
  showCloseIcon?: boolean;
  duration?: number;
  testID?: string;
  width?: number | string;
  minHeight?: number | string;
  style?: StyleProp<ViewStyle>;
  theme?: 'light' | 'dark';
  closeIcon?: string | ReactNode;
  closeIconSize?: number;
  closeIconColor?: string;
  closeIconFamily?: typeof IconFamilies[number] | string;
}

const BaseToast = ({
  icon = 'checkmark-circle',
  iconFamily = 'Ionicons',
  text1,
  text2,
  onPress,
  hide,
  backgroundColor,
  textColor,
  iconColor = Colors.success,
  iconSize = SCALE(22),
  showProgressBar = true,
  progressBarColor,
  barWidth: externalBarWidth,
  isRTL = false,
  showCloseIcon = true,
  duration = 3000,
  testID = 'toast-base',
  width,
  minHeight,
  style,
  theme = 'light',
  closeIcon = 'close-outline',
  closeIconSize = SCALE(22),
  closeIconColor,
  closeIconFamily = 'Ionicons',
}: BaseToastProps) => {
  // Use a local animated value if no external one is provided
  const localBarWidth = React.useRef(new Animated.Value(100)).current;
  const barWidth = externalBarWidth || localBarWidth;

  // Set background and text colors based on theme if not explicitly provided
  const bgColor = backgroundColor || Colors[theme].back;
  const txtColor = textColor || Colors[theme].text;

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

  const rtlContentStyle = isRTL ? { flexDirection: 'row-reverse' as 'row-reverse' } : {};
  const rtlHideButtonStyle = isRTL ? { right: undefined, left: SCALE(3.2) } : {};
  const rtlIconWrapperStyle = isRTL ? { marginRight: 0, marginLeft: SCALE(8) } : {};
  const rtlTextStyle = isRTL ? { textAlign: 'right' as 'right' } : {};

  // Adjust margin based on RTL
  const textMarginStyle = isRTL
    ? { marginLeft: SCALE(25), marginRight: 0 }
    : { marginRight: SCALE(25), marginLeft: 0 };

  // Create container style with width and height
  const containerStyle = [
    styles.container,
    { backgroundColor: bgColor },
    width !== undefined && { width: width as DimensionValue },
    minHeight !== undefined && { minHeight: minHeight as DimensionValue },
    // Add shadow color based on theme
    {
      shadowColor: theme === 'dark' ? "#fff" : "#000",
      elevation: theme === 'dark' ? 8 : 5, // Slightly higher elevation for dark theme for better visibility
    },
    style
  ].filter(Boolean);

  // Render the icon based on type (string or ReactNode)
  const renderIcon = () => {
    // If icon is a ReactNode (custom component), render it directly
    if (React.isValidElement(icon)) {
      return (
        <View style={[styles.iconWrapper, rtlIconWrapperStyle]} testID={`${testID}-custom-icon`}>
          {icon}
        </View>
      );
    }

    // If icon is a string, render the appropriate icon from the specified family
    if (typeof icon === 'string') {
      // Dynamically load the icon component for the specified family
      const IconComponent = loadIconFamily(iconFamily);

      // If icon component couldn't be loaded, show a fallback or nothing
      if (!IconComponent) {
        return (
          <View
            style={[styles.iconWrapper, rtlIconWrapperStyle, styles.iconFallback]}
            testID={`${testID}-icon-fallback`}
          >
            <Text style={{ color: iconColor, fontSize: iconSize, marginTop: -SCALE(2) }}>!</Text>
          </View>
        );
      }

      return (
        <IconComponent
          name={icon}
          size={iconSize}
          color={iconColor}
          style={[styles.iconWrapper, rtlIconWrapperStyle]}
          testID={`${testID}-icon`}
        />
      );
    }

    // If no icon is provided, don't render anything
    return null;
  };

  // Render close icon dynamically as well
  const renderCloseIcon = () => {
    // Use closeIconColor if provided, otherwise use text color
    const finalCloseIconColor = closeIconColor || txtColor;

    // If closeIcon is a ReactNode (custom component), render it directly
    if (React.isValidElement(closeIcon)) {
      return closeIcon;
    }

    // If closeIcon is a string, render the appropriate icon from the specified family
    if (typeof closeIcon === 'string') {
      const CloseIconComponent = loadIconFamily(closeIconFamily);

      if (!CloseIconComponent) {
        return (
          <View style={styles.closeFallback}>
            <Text style={{ color: finalCloseIconColor, fontSize: closeIconSize }}>×</Text>
          </View>
        );
      }

      return (
        <CloseIconComponent
          name={closeIcon}
          size={closeIconSize}
          color={finalCloseIconColor}
        />
      );
    }

    // Fallback to default close icon
    const DefaultCloseIconComponent = loadIconFamily('Ionicons');
    if (!DefaultCloseIconComponent) {
      return (
        <View style={styles.closeFallback}>
          <Text style={{ color: finalCloseIconColor, fontSize: closeIconSize }}>×</Text>
        </View>
      );
    }

    return (
      <DefaultCloseIconComponent
        name="close-outline"
        size={closeIconSize}
        color={finalCloseIconColor}
      />
    );
  };

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
          {renderCloseIcon()}
        </TouchableOpacity>
      )}

      <View style={styles.content} testID={`${testID}-content`}>
        <View style={[styles.contentInner, rtlContentStyle]}>
          {renderIcon()}
          <View style={{ flex: 1 }} testID={`${testID}-text-container`}>
            {text1 ? (
              <Text
                allowFontScaling={false}
                style={[styles.text1, { color: txtColor }, rtlTextStyle, textMarginStyle]}
                testID={`${testID}-text1`}
              >
                {text1}
              </Text>
            ) : null}
            {text2 ? (
              <Text
                allowFontScaling={false}
                style={[styles.text2, { color: txtColor }, rtlTextStyle, textMarginStyle]}
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
    minHeight: SCALE(61),
    borderRadius: 8,
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
    zIndex: 9999999,
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
  iconFallback: {
    width: SCALE(22),
    height: SCALE(22),
    borderRadius: SCALE(11),
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeFallback: {
    width: SCALE(22),
    height: SCALE(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: SCALE(14),
    fontWeight: "500",
  },
  text2: {
    fontSize: SCALE(12),
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
