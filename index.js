import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';

import colors from "../config/colors"
const { height } = Dimensions.get('window');


export default class Toastify extends Component {

  state = {
    isShow: false,
    text: '',
    opacityValue: new Animated.Value(1),
    barWidth: new Animated.Value(RFPercentage(32)),
    containerWidth: RFPercentage(32),
    backgroundColor: colors.default,
    textColor: colors.textDefault,
  };

  default = (text) => {
    this.show(text, colors.default, colors.textDefault);
  }
  dark = (text) => {
    this.show(text, colors.dark, colors.textDefault);
  }

  info = (text) => {
    this.show(text, colors.info, colors.textDefault);
  }

  success = (text) => {
    this.show(text, colors.success, colors.textDefault);
  }

  warning = (text) => {
    this.show(text, colors.warning, colors.textDefault);
  }

  error = (text) => {
    this.show(text, colors.error, colors.textDefault);
  }

  show(text = '', backgroundColor = colors.default, textColor = colors.textDefault) {
    let duration = this.props.duration;

    this.state.barWidth.setValue(this.state.containerWidth)  //reset barWidth value
    this.setState({
      isShow: true,
      duration,
      text,
      backgroundColor,
      textColor
    });
    this.isShow = true;
    if (duration !== this.props.end) this.close();
  }

  close() {
    let duration = this.state.duration;
    if (!this.isShow && !this.state.isShow) return;
    this.resetAll();
    setTimeout(() => {
      this.setState({ isShow: false });
      this.isShow = false;
    }, duration);
  }

  position() {
    if (this.props.position === 'top') return this.props.positionValue;
    if (this.props.position === 'center') return (height / 2) - RFPercentage(9);
    return height - this.props.positionValue - RFPercentage(10);
  }

  handleBar = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
  };

  pause = () => {
    const oldDuration = this.state.duration;
    this.setState({ oldDuration, duration: 10000 });
    Animated.timing(
      this.state.barWidth
    ).stop();
  }

  resume = () => {
    const oldDuration = this.state.oldDuration;
    this.setState({ duration: oldDuration, oldDuration: 0 });

    Animated.timing(
      this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
  }

  hideToast = () => {
    this.resetAll();
    console.log("h")
    this.setState({ isShow: false });
    this.isShow = false;
    if (!this.isShow && !this.state.isShow) return;
  }

  resetAll = () => {
    // clearTimeout(timer);
  }

  render() {
    this.handleBar();
    return (
      <Modal onTouchEnd={() => this.resume()} onTouchStart={() => this.pause()} swipeDirection={['up', 'down', 'left', 'right']} onModalHide={() => this.resetAll()} style={{ flex: 1, alignItems: "center" }} animationIn="slideInRight" animationOut="slideOutLeft" isVisible={this.state.isShow} coverScreen={false} hasBackdrop={false} >
        <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, position: "absolute", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: this.state.containerWidth, height: RFPercentage(9), backgroundColor: this.state.backgroundColor, top: this.position(), ...this.props.style }} >

          <TouchableOpacity onPress={() => this.hideToast()} activeOpacity={0.9} style={{ position: "absolute", top: RFPercentage(0), right: RFPercentage(1) }} >
            <Text style={{ transform: [{ rotate: '45deg' }], fontWeight: "bold", fontSize: RFPercentage(3.5), color: "white" }} >+</Text>
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", color: this.state.textColor, marginLeft: RFPercentage(2), marginRight: RFPercentage(2), fontSize: RFPercentage(2.7) }} >{this.state.text}</Text>
          <View style={{ flexDirection: "row", position: "absolute", height: 4, width: '100%', bottom: 0 }}>
            <Animated.View style={{ opacity: 0.7, backgroundColor: "rgba(255,255,255,.7)", width: this.state.barWidth }} />
          </View>
        </View>

      </Modal>
    );
  }
}

Toastify.defaultProps = {
  style: {},
  position: 'top',
  positionValue: 50,
  end: 0,
  duration: 3000
};