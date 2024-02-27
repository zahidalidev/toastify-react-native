import React, { Component } from "react";
import {
  Animated,
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../config/theme";

import { defaultProps, defaultToastData } from "../utils/default";
import generateUUID from "../utils/generateUUID";
import {
  AnimationStyleProps,
  NotificationArgumentsType,
  ToastManagerProps,
  ToastManagerState,
  ToastType,
} from "../utils/interfaces";
import styles from "./styles";

const animationStyleOptions: AnimationStyleProps = {
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
  slide: {
    animationIn: "slideInUp",
    animationOut: "slideOutDown",
  },
};

class ToastManager extends Component<ToastManagerProps, ToastManagerState> {
  static defaultProps = defaultProps;
  static __singletonRef: ToastManager | null;

  constructor(props: ToastManagerProps) {
    super(props);
    ToastManager.__singletonRef = this;

    this.state = {
      toasts: [] as ToastType[],
      keyboardHeight: 0,
    };
  }

  static info = (toastData: Partial<ToastType>) => {
    ToastManager.__singletonRef?.show?.({
      ...defaultToastData,
      ...toastData,
      barColor: Colors.info,
      icon: "information-circle",
    } as ToastType);
  };

  static success = (toastData: Partial<ToastType>) => {
    ToastManager.__singletonRef?.show?.({
      ...defaultToastData,
      ...toastData,
      barColor: Colors.success,
      icon: "checkmark-circle",
    } as ToastType);
  };

  static warn = (toastData: Partial<ToastType>) => {
    ToastManager.__singletonRef?.show?.({
      ...defaultToastData,
      ...toastData,
      barColor: Colors.warn,
      icon: "warning",
    } as ToastType);
  };

  static error = (toastData: Partial<ToastType>) => {
    ToastManager.__singletonRef?.show?.({
      ...defaultToastData,
      ...toastData,
      barColor: Colors.error,
      icon: "alert-circle",
    } as ToastType);
  };

  show = ({
    text,
    barColor,
    icon,
    duration,
    id,
    position,
    width,
  }: ToastType) => {
    const toastId = id || generateUUID();
    const { toasts } = this.state;

    let newToasts: ToastType[] = [];

    const newToast: Omit<ToastType, "id"> = {
      text,
      duration,
      barColor,
      position,
      icon: icon,
      barWidthAnimation: new Animated.Value(width),
      width,
    };

    const oldToast = toasts.find((toast) => toast.id === id);

    if (oldToast) {
      newToasts = toasts.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              ...newToast,
            }
          : toast
      );
    } else {
      newToasts = [
        ...toasts,
        {
          ...newToast,
          id: toastId,
        },
      ];
    }
    this.setState({ toasts: newToasts }, () => this.handleBar());
  };

  keyboardDidShowListener: EmitterSubscription | null = null;

  keyboardDidHideListener: EmitterSubscription | null = null;

  keyboardDidShow = (e: KeyboardEvent) => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardHeight: 0,
    });
  };

  UNSAFE_componentWillMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener?.remove();
    this.keyboardDidHideListener?.remove();
  };

  handleBar = () => {
    const { toasts } = this.state;
    Animated.parallel(
      toasts.map((toast) => {
        const duration =
          // @ts-ignore
          (toast.barWidthAnimation._value * toast.duration) / toast.width;

        const animation = Animated.timing(toast.barWidthAnimation, {
          toValue: 0,
          duration,
          useNativeDriver: false,
        });

        // @ts-ignore
        animation.start(
          () => toast.barWidthAnimation._value === 0 && this.hideToast(toast.id)
        );
        return animation;
      })
    );
  };

  pause = (): void => {
    const { toasts } = this.state;
    toasts.forEach((toast) => {
      return toast.barWidthAnimation.stopAnimation();
    });
  };

  hideToast = (toastId: string): void => {
    const { toasts } = this.state;
    const filtredToasts = toasts.filter((toast) => toast.id !== toastId);
    if (filtredToasts.length !== toasts.length) {
      this.setState({
        toasts: filtredToasts,
      });
      //@ts-ignore
      this.state.toasts = filtredToasts;
    }
  };

  renderToast = ({
    icon,
    id,
    barWidthAnimation,
    barColor,
    text,
    key,
    positionOffset,
    height,
    width,
  }: NotificationArgumentsType) => {
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
      position,
      style,
      textStyle,
      theme,
    } = this.props;
    return (
      <Modal
        key={key}
        animationIn={
          animationIn || animationStyleOptions[animationStyle!].animationIn
        }
        animationOut={
          animationOut || animationStyleOptions[animationStyle!].animationOut
        }
        backdropTransitionOutTiming={backdropTransitionOutTiming}
        backdropTransitionInTiming={backdropTransitionInTiming}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        onTouchEnd={this.handleBar}
        onTouchStart={this.pause}
        swipeDirection={["up", "down", "left", "right"]}
        onSwipeComplete={() => this.hideToast(id)}
        onModalHide={() => this.hideToast(id)}
        isVisible
        coverScreen={false}
        backdropColor={backdropColor}
        backdropOpacity={backdropOpacity}
        hasBackdrop={hasBackdrop}
        style={styles.modalContainer}
        hideModalContentWhileAnimating
      >
        <View
          style={[
            styles.mainContainer,
            {
              width,
              height,
              backgroundColor: Colors[theme].back,
              ...style,
              bottom: position === "bottom" ? positionOffset : undefined,
              top: position === "top" ? positionOffset : undefined,
            },
          ]}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            const toast = this.state.toasts.find((toast) => toast.id === id);
            if (toast) toast.height = layout.height;
          }}
        >
          <TouchableOpacity
            onPress={() => this.hideToast(id)}
            activeOpacity={0.9}
            style={styles.hideButton}
          >
            <Icon name="close-outline" size={22} color={Colors[theme].text} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Icon
              name={icon}
              size={22}
              color={barColor}
              style={styles.iconWrapper}
            />
            <Text
              style={[
                styles.textStyle,
                { color: Colors[theme].text, ...textStyle },
              ]}
            >
              {text}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={{ width: barWidthAnimation, backgroundColor: barColor }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { toasts, keyboardHeight } = this.state;
    return toasts.map((toast, index) => {
      const positionOffset: number = toasts.reduce(
        (reduceBottom, reduceToast, reduceIndex) => {
          if (reduceIndex >= index) return reduceBottom;
          return reduceBottom + (reduceToast.height! || 200) + 10;
        },
        0
      );

      return this.renderToast({
        ...toast,
        key: toast.id,
        positionOffset:
          this.props.position === "top"
            ? this.props.positionValue + positionOffset
            : positionOffset + this.props.positionValue + keyboardHeight,
      });
    });
  }
}

ToastManager.defaultProps = defaultProps;

export default ToastManager;
