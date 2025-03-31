import React, { Component, createRef, ReactNode, forwardRef, RefObject } from "react";
import { Animated, Modal, TouchableOpacity } from "react-native";

import {
  ToastManagerProps,
  ToastState,
  ToastRef,
  ToastPosition,
  ToastShowParams,
  ToastType
} from "../utils/interfaces";
import defaultProps from "../utils/defaultProps";
import { Colors } from "../config/theme";
import BaseToast from "./BaseToast";
import styles from "./styles";

class ToastManagerComponent extends Component<ToastManagerProps, ToastState> {
  private timerId: NodeJS.Timeout | null = null;
  private animationRef: Animated.CompositeAnimation | null = null;
  static toastRef: RefObject<ToastRef> = createRef();
  static defaultProps = defaultProps;

  constructor(props: ToastManagerProps) {
    super(props);
    this.state = {
      isVisible: false,
      type: 'default',
      text1: '',
      text2: '',
      position: props.position || 'top',
      duration: props.duration || 3000,
      barWidth: new Animated.Value(100),
      isPaused: false,
    };
  }

  getIconForType = (type: ToastType): string => {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      case 'info': return 'information-circle';
      case 'warn': return 'warning';
      default: return 'checkmark-circle';
    }
  }

  getColorForType = (type: ToastType): string => {
    switch (type) {
      case 'success': return Colors.success;
      case 'error': return Colors.error;
      case 'info': return Colors.info;
      case 'warn': return Colors.warn;
      default: return Colors.default;
    }
  }

  // Map animation style to Modal's animationType
  getAnimationType = (): 'none' | 'slide' | 'fade' => {
    const { animationStyle } = this.props;

    return animationStyle || 'fade';
  }

  show = ({
    type = 'default',
    text1 = '',
    text2,
    position,
    visibilityTime,
    autoHide = true,
    props,
    onShow,
    onHide,
    onPress,
    progressBarColor,
    backgroundColor,
    textColor,
    iconColor,
    iconSize,
    theme
  }: ToastShowParams): void => {
    // Clear any existing timers
    this.hide();

    // Reset animation if needed
    if (this.animationRef) {
      this.animationRef.stop();
      this.animationRef = null;
    }

    // Reset progress bar width
    this.state.barWidth.setValue(100);

    this.setState({
      isVisible: true,
      type: type || 'default',
      text1,
      text2,
      position: position || this.props.position || 'top',
      duration: visibilityTime || this.props.duration || 3000,
      props,
      isPaused: false,
      onShow,
      onHide,
      onPress,
      progressBarColor,
      backgroundColor,
      textColor,
      iconColor,
      iconSize,
      theme: theme || this.props.theme
    }, () => {
      // Call onShow callback if provided
      if (this.state.onShow) {
        this.state.onShow();
      }

      // Start progress bar animation
      this.startProgressBarAnimation();

      // Set timer for auto-hide if enabled
      if (autoHide) {
        this.timerId = setTimeout(() => {
          this.hide();
        }, this.state.duration);
      }
    });
  }

  startProgressBarAnimation = (): void => {
    if (!this.props.showProgressBar) return;

    const { duration } = this.state;
    const { isRTL } = this.props;

    // Determine the start and end values based on RTL setting
    const startValue = isRTL ? 0 : 100;
    const endValue = isRTL ? 100 : 0;

    // Set initial value
    this.state.barWidth.setValue(startValue);

    this.animationRef = Animated.timing(this.state.barWidth, {
      toValue: endValue,
      duration,
      useNativeDriver: false
    });

    this.animationRef.start();
  }

  hide = (): void => {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.animationRef) {
      this.animationRef.stop();
      this.animationRef = null;
    }

    if (this.state.isVisible) {
      this.setState({ isVisible: false }, () => {
        if (this.state.onHide) {
          this.state.onHide();
        }
      });
    }
  }

  pause = (): void => {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.animationRef) {
      this.animationRef.stop();
    } else {
      Animated.timing(this.state.barWidth, {
        toValue: this.state.barWidth._value,
        duration: 1,
        useNativeDriver: false
      }).stop();
    }

    const currentValue = this.state.barWidth._value;
    const totalDuration = this.state.duration;
    const elapsedPercentage = this.props.isRTL
      ? currentValue / 100
      : 1 - (currentValue / 100);

    const remainingDuration = totalDuration * (1 - elapsedPercentage);

    this.setState({
      isPaused: true,
      pausedDuration: remainingDuration
    });
  }

  resume = (): void => {
    if (!this.state.isPaused) return;

    const remainingDuration = this.state.pausedDuration || 0;

    this.animationRef = Animated.timing(this.state.barWidth, {
      toValue: this.props.isRTL ? 100 : 0,
      duration: remainingDuration,
      useNativeDriver: false
    });

    this.animationRef.start();

    this.timerId = setTimeout(() => {
      this.hide();
    }, remainingDuration);

    this.setState({ isPaused: false, pausedDuration: undefined });
  }

  handlePress = (): void => {
    if (this.state.onPress) {
      this.state.onPress();
    }
  }

  getPositionStyle = (): object => {
    const { position } = this.state;
    const { topOffset, bottomOffset } = this.props;

    switch (position) {
      case 'top': return { top: topOffset || 40 };
      case 'bottom': return { bottom: bottomOffset || 40 };
      case 'center': return { top: 0, bottom: 0, justifyContent: 'center' };
      default: return { top: topOffset || 40 };
    }
  }

  renderToastContent = (): ReactNode => {
    const {
      config,
      theme = 'light',
      width,
      height,
      style,
      textStyle,
      showCloseIcon,
      showProgressBar,
      isRTL,
      iconSize: propsIconSize
    } = this.props;

    const {
      type,
      text1,
      text2,
      props: customProps,
      barWidth,
      duration,
      position,
      progressBarColor,
      backgroundColor,
      textColor,
      iconColor,
      iconSize: stateIconSize,
      theme: stateTheme
    } = this.state;

    // Use theme from state if provided, otherwise use theme from props
    const finalTheme = stateTheme || theme;

    // Use iconSize from state if provided, otherwise use from props
    const finalIconSize = stateIconSize !== undefined ? stateIconSize : propsIconSize;

    // Check if there's a custom component for this toast type
    if (config && typeof config[type] === 'function') {
      return config[type]({
        text1,
        text2,
        props: customProps,
        type,
        position,
        hide: this.hide,
        show: this.show,
        isVisible: this.state.isVisible,
        onPress: this.state.onPress,
        barWidth: barWidth,
        isRTL: isRTL,
        duration: duration,
        showProgressBar: showProgressBar,
        progressBarColor: progressBarColor,
        backgroundColor: backgroundColor,
        textColor: textColor,
        iconColor: iconColor,
        iconSize: finalIconSize,
        width: width,
        height: height,
        style: style,
        theme: finalTheme,
      });
    }

    // Use default BaseToast component if no custom component is provided
    return (
      <BaseToast
        icon={this.getIconForType(type)}
        text1={text1}
        text2={text2}
        hide={this.hide}
        onPress={this.handlePress}
        iconColor={iconColor || this.getColorForType(type)}
        iconSize={finalIconSize}
        progressBarColor={progressBarColor || this.getColorForType(type)}
        backgroundColor={backgroundColor}
        textColor={textColor}
        barWidth={barWidth}
        isRTL={isRTL}
        duration={duration}
        showProgressBar={showProgressBar}
        showCloseIcon={showCloseIcon}
        theme={finalTheme}
        testID={`toast-${type}`}
        width={width}
        height={height}
        style={style}
      />
    );
  }

  render() {
    const { isVisible, position } = this.state;

    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType={this.getAnimationType()}
        onRequestClose={this.hide}
        testID="toast-modal"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => this.pause()}
          onPressOut={() => this.resume()}
          style={[
            styles.containerRoot,
            position === 'top' ? styles.containerTop :
              position === 'bottom' ? styles.containerBottom : {},
            this.getPositionStyle(),
          ]}
          testID="toast-container"
        >
          {this.renderToastContent()}
        </TouchableOpacity>
      </Modal>
    );
  }
}

const ToastManager = forwardRef((props: ToastManagerProps, ref) => {
  return <ToastManagerComponent {...props} ref={ref} />;
});

// Add the static methods to the forwarded ref component
ToastManager.setRef = (ref: any) => {
  ToastManagerComponent.toastRef = ref;
};

ToastManager.getRef = () => {
  ToastManagerComponent.toastRef;
};

ToastManager.show = (options: ToastShowParams) => {
  ToastManagerComponent.toastRef?.current?.show(options);
};

ToastManager.hide = () => {
  ToastManagerComponent.toastRef?.current?.hide();
};

ToastManager.success = (text: string, position?: ToastPosition) => {
  ToastManagerComponent.toastRef?.current?.show({
    type: 'success',
    text1: text,
    position
  });
};

ToastManager.error = (text: string, position?: ToastPosition) => {
  ToastManagerComponent.toastRef?.current?.show({
    type: 'error',
    text1: text,
    position
  });
};

ToastManager.info = (text: string, position?: ToastPosition) => {
  ToastManagerComponent.toastRef?.current?.show({
    type: 'info',
    text1: text,
    position
  });
};

ToastManager.warn = (text: string, position?: ToastPosition) => {
  ToastManagerComponent.toastRef?.current?.show({
    type: 'warn',
    text1: text,
    position
  });
};

// Copy defaultProps to the forwarded ref component
ToastManager.defaultProps = ToastManagerComponent.defaultProps;

export default ToastManager;
