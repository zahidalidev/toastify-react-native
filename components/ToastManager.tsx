import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import React, { Component } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { View, Text, Animated, Dimensions, TouchableOpacity } from "react-native";

import { Colors } from "../config/theme";
import defaultProps from "../utils/defaultProps";
import { ToastManagerProps, ToastManagerState } from "../utils/interfaces";

import styles from "./styles";

const { height } = Dimensions.get("window");

class ToastManager extends Component<ToastManagerProps, ToastManagerState> {
  private timer: NodeJS.Timeout;
  private isShow: boolean;
  static defaultProps = defaultProps;
  static __singletonRef: ToastManager | null;

  constructor(props: ToastManagerProps) {
    super(props);
    ToastManager.__singletonRef = this;
    this.timer = setTimeout(() => {}, 0); // Initialize timer with a dummy value
    this.isShow = false;
  }

  state: ToastManagerState = {
    isShow: false,
    text: "",
    opacityValue: new Animated.Value(1),
    barWidth: new Animated.Value(RFPercentage(32)),
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
    const { duration } = this.props;
    this.state.barWidth.setValue(this.props.width);
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
    if (position === "center") return height / 2 - RFPercentage(9);
    return height - this.props.positionValue - RFPercentage(10);
  };

  handleBar = () => {
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
  };

  pause = () => {
    clearTimeout(this.timer); 
    this.setState({ oldDuration: this.state.duration, duration: Number.MAX_VALUE });
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

    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: remainingDuration,
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
    } = this.props;

    const { isShow, animationStyle: stateAnimationStyle, barColor, icon, text, barWidth } = this.state;

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
          onTouchEnd={this.props.onPress} // Add this line
        >
          {showCloseIcon && (
            <TouchableOpacity onPress={this.hideToast} activeOpacity={0.9} style={styles.hideButton}>
              <Icon name="close-outline" size={22} color={Colors[theme].text} />
            </TouchableOpacity>
          )}
          <View style={styles.content}>
            <Icon name={icon} size={22} color={barColor} style={styles.iconWrapper} />
            <Text style={[styles.textStyle, { color: Colors[theme].text, ...textStyle }]}>{text}</Text>
          </View>
          {showProgressBar && (
            <View style={styles.progressBarContainer}>
              <Animated.View style={{ width: barWidth, backgroundColor: barColor }} />
            </View>
          )}
        </View>
      </Modal>
    );
  }
}

ToastManager.defaultProps = defaultProps;

export default ToastManager;
