import React, { Component, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';

const { height, width } = Dimensions.get('window');
export default class Toastify extends Component {

  state = {
    isShow: false,
    text: '',
    opacityValue: new Animated.Value(1),
    barWidth: new Animated.Value(RFPercentage(32)),
    containerWidth: RFPercentage(32),
    backgroundColor: "#07bc0c",
    textColor: "white"
  };

  show(duration) {
    this.state.barWidth.setValue(this.state.containerWidth)  //reset barWidth value
    this.setState({
      isShow: true,
      duration: duration,
    });
    this.isShow = true;
    if (duration !== this.props.end) this.close(duration);
  }

  close(duration) {
    if (!this.isShow && !this.state.isShow) return;
    this.resetAll();
    setTimeout(() => {
      this.setState({ isShow: false });
      this.isShow = false;
    }, duration);
  }

  position() {
    if (this.props.position === 'top') return this.props.positionValue;
    if (this.props.position === 'center') return height / 2;
    return this.props.positionValue;
    // return (height / 2) - RFPercentage(10);
  }

  handleBar = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start();
  };

  resetAll = () => {
    // clearTimeout(this.state.timer);
  }

  render() {
    this.handleBar();
    return (
      <Modal onModalHide={() => this.resetAll()} style={{ flex: 1, height, alignItems: "center" }} animationIn="slideInRight" animationOut="slideOutLeft" isVisible={this.state.isShow} coverScreen={false} hasBackdrop={false} >
        <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, position: "absolute", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: this.state.containerWidth, height: RFPercentage(9), backgroundColor: this.state.backgroundColor, top: this.position() }} >
          <Text style={{ color: this.state.textColor, marginLeft: RFPercentage(1), fontSize: RFPercentage(2.5) }} >Success</Text>
          <View style={{ flexDirection: "row", position: "absolute", height: 4, width: '100%', bottom: 0 }}>
            <Animated.View style={{ opacity: this.state.opacityValue, backgroundColor: "red", width: this.state.barWidth }} />
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
  opacity: 1,
  defaultCloseDelay: 250,
  end: 0,
};