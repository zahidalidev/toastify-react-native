import React, { Component } from "react";
import { View, Text, Animated, Dimensions, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";


import { ToastManagerProps, ToastManagerState } from "../utils/interfaces";
import defaultProps from "../utils/defaultProps";
import { Colors } from "../config/theme";
import { SCALE } from "../utils/helpers";
import styles from "./styles";

const { height } = Dimensions.get("window");

class ToastManager extends Component<ToastManagerProps, ToastManagerState> {
  private timer: NodeJS.Timeout;
  private isShow: boolean;
  private isPaused: boolean = false;
  static defaultProps = defaultProps;
  static __singletonRef: ToastManager | null;

  constructor(props: ToastManagerProps) {
    super(props);
    ToastManager.__singletonRef = this;
    this.timer = setTimeout(() => { }, 0); // Initialize timer with a dummy value
    this.isShow = false;
  }

  state: ToastManagerState = {
    isShow: false,
    text: "",
    opacityValue: new Animated.Value(1),
    barWidth: new Animated.Value(SCALE(204.8)),
    barColor: Colors.default,
    icon: "checkmark-circle",
    position: this.props.position,
    animationStyle: {
      upInUpOut: {
        animationIn: "slideInDown",
        animationOut: "slideOutUp",
      },
      rightInOut: {
        animationIn: "slideInRight",
        animationOut: "slideOutRight",
      },
      zoomInOut: {
        animationIn: "zoomInDown",
        animationOut: "zoomOutUp",
      },
      fadeInOut: {
        animationIn: "fadeIn",
        animationOut: "fadeOut",
      },
      slideInOut: {
        animationIn: "slideInUp",
        animationOut: "slideOutDown",
      },
    },
  };

  static info = (text: string, position?: ToastManagerProps["position"]) => {
    ToastManager.__singletonRef?.show(text, Colors.info, "information-circle", position);
  };

  static success = (text: string, position?: ToastManagerProps["position"]) => {
    ToastManager.__singletonRef?.show(text, Colors.success, "checkmark-circle", position);
  };

  static warn = (text: string, position?: ToastManagerProps["position"]) => {
    ToastManager.__singletonRef?.show(text, Colors.warn, "warning", position);
  };

  static error = (text: string, position?: ToastManagerProps["position"]) => {
    ToastManager.__singletonRef?.show(text, Colors.error, "alert-circle", position);
  };

  show = (text = "", barColor = Colors.default, icon: string, position?: ToastManagerProps["position"]) => {
    const { duration, isRTL } = this.props;

    // Reset pause state
    this.isPaused = false;

    if (isRTL) {
      this.state.barWidth.setValue(0);
    } else {
      this.state.barWidth.setValue(this.props.width);
    }

    this.setState({
      isShow: true,
      duration,
      text,
      barColor,
      icon,
    });
    if (position) this.setState({ position });
    this.isShow = true;
    if (duration !== this.props.end) this.close(duration);
  };

  close = (duration: number) => {
    if (!this.isShow && !this.state.isShow) return;
    this.resetAll();
    this.timer = setTimeout(() => {
      this.setState({ isShow: false });
    }, duration || this.state.duration);
  };

  position = () => {
    const { position } = this.state;
    if (position === "top") return this.props.positionValue;
    if (position === "center") return height / 2 - SCALE(57.6);
    return height - this.props.positionValue - SCALE(64);
  };

  handleBar = () => {
    // Don't start a new animation if we're paused
    if (this.isPaused) {
      return;
    }

    const { isRTL } = this.props;

    if (isRTL) {
      // Only set to 0 when starting the animation, not during renders
      if (this.state.barWidth._value === this.props.width) {
        this.state.barWidth.setValue(0);
      }

      Animated.timing(this.state.barWidth, {
        toValue: this.props.width,
        duration: this.state.duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(this.state.barWidth, {
        toValue: 0,
        duration: this.state.duration,
        useNativeDriver: false,
      }).start();
    }
  };

  pause = () => {
    clearTimeout(this.timer);
    this.setState({ oldDuration: this.state.duration, duration: Number.MAX_VALUE });

    // Mark as paused
    this.isPaused = true;

    // Stop animation
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: Number.MAX_VALUE,
      useNativeDriver: false,
    }).stop();
  };

  resume = () => {
    const remainingDuration = this.state.oldDuration;
    this.setState({ duration: remainingDuration, oldDuration: 0 });

    this.timer = setTimeout(() => {
      this.setState({ isShow: false });
    }, remainingDuration);

    // No longer paused
    this.isPaused = false;

    // Get current value and calculate proper remaining duration
    const currentValue = this.state.barWidth._value;
    const targetValue = this.props.isRTL ? this.props.width : 0;

    let adjustedDuration = remainingDuration;
    if (this.props.isRTL) {
      const progress = currentValue / this.props.width;
      adjustedDuration = remainingDuration * (1 - progress);
    } else {
      const progress = 1 - (currentValue / this.props.width);
      adjustedDuration = remainingDuration * (1 - progress);
    }

    // Resume animation from current position
    Animated.timing(this.state.barWidth, {
      toValue: targetValue,
      duration: Math.max(100, adjustedDuration),
      useNativeDriver: false,
    }).start();
  };

  hideToast = () => {
    this.resetAll();
    this.setState({ isShow: false });
    this.isShow = false;
    if (!this.isShow && !this.state.isShow) return;
  };

  resetAll = () => {
    clearTimeout(this.timer);
  };

  render() {
    this.handleBar();
    const {
      animationIn,
      animationStyle,
      animationOut,
      backdropTransitionOutTiming,
      backdropTransitionInTiming,
      animationInTiming,
      animationOutTiming,
      backdropColor,
      backdropOpacity,
      hasBackdrop,
      width,
      height,
      style,
      textStyle,
      theme,
      showCloseIcon,
      showProgressBar,
      isRTL,
    } = this.props;

    const { isShow, animationStyle: stateAnimationStyle, barColor, icon, text, barWidth } = this.state;

    const rtlContentStyle = isRTL ? { flexDirection: 'row-reverse' } : {};
    const rtlHideButtonStyle = isRTL ? { right: undefined, left: SCALE(3.2) } : {};
    const rtlIconWrapperStyle = isRTL ? { marginRight: 0, marginLeft: SCALE(4.48) } : {};

    return (
      <Modal
        animationIn={animationIn || stateAnimationStyle[animationStyle].animationIn}
        animationOut={animationOut || stateAnimationStyle[animationStyle].animationOut}
        backdropTransitionOutTiming={backdropTransitionOutTiming}
        backdropTransitionInTiming={backdropTransitionInTiming}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        onTouchEnd={this.resume}
        onTouchStart={this.pause}
        swipeDirection={["up", "down", "left", "right"]}
        onSwipeComplete={this.hideToast}
        onModalHide={this.resetAll}
        isVisible={isShow}
        coverScreen={false}
        backdropColor={backdropColor}
        backdropOpacity={backdropOpacity}
        hasBackdrop={hasBackdrop}
        style={styles.modalContainer}
      >
        <View
          style={[
            styles.mainContainer,
            {
              width,
              height,
              backgroundColor: Colors[theme].back,
              top: this.position(),
              ...style,
            },
          ]}
        >
          {showCloseIcon && (
            <TouchableOpacity
              onPress={this.hideToast}
              activeOpacity={0.9}
              style={[styles.hideButton, rtlHideButtonStyle]}
            >
              <Icon name="close-outline" size={22} color={Colors[theme].text} />
            </TouchableOpacity>
          )}
          <View style={[styles.content, rtlContentStyle]}>
            <Icon
              name={icon}
              size={22}
              color={barColor}
              style={[styles.iconWrapper, rtlIconWrapperStyle]}
            />
            <Text
              style={[
                styles.textStyle,
                { color: Colors[theme].text, ...textStyle },
                isRTL ? { textAlign: 'right' } : {}
              ]}
            >
              {text}
            </Text>
          </View>
          {showProgressBar && (
            <View style={styles.progressBarContainer}>
              {isRTL ? (
                <Animated.View
                  style={{
                    position: 'absolute',
                    right: 0,
                    left: 'auto',
                    width: barWidth,
                    backgroundColor: barColor,
                    height: '100%'
                  }}
                />
              ) : (
                <Animated.View
                  style={{
                    width: barWidth,
                    backgroundColor: barColor,
                    height: '100%'
                  }}
                />
              )}
            </View>
          )}
        </View>
      </Modal>
    );
  }
}

ToastManager.defaultProps = defaultProps;

export default ToastManager;