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
    top: 50,
    barWidth: new Animated.Value(0),
    containerWidth: RFPercentage(32),
  };

  show(text, duration) {
    this.setState({
      isShow: true,
      text,
      duration: typeof duration === 'number' ? duration : this.props.durationShort,
    });

    Animated.timing(this.state.opacityValue, {
      toValue: this.props.opacity,
      duration: this.props.fadeInDuration,
      useNativeDriver: false,
    }).start(() => {
      this.isShow = true;
      if (duration !== this.props.end) this.close();
    });


  }

  close(duration) {
    let delay = typeof duration === 'number' ? duration : this.state.duration;
    if (delay === this.props.end) delay = this.props.defaultCloseDelay;

    if (!this.isShow && !this.state.isShow) return;
    this.resetAll();
    this.timer = setTimeout(() => {
      Animated.timing(this.state.opacityValue, {
        toValue: 0.0,
        useNativeDriver: false,
        duration: this.props.fadeOutDuration,
      }).start(() => {
        this.setState({ isShow: false });
        this.isShow = false;
      })

    }, delay);
  }

  position() {
    if (this.props.position === 'top') return this.state.top;
    if (this.props.position === 'center') return height / 2;
    return this.state.top;
    // return (height / 2) - RFPercentage(10);
  }

  handleBar = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    this.state.barWidth.setValue(0)  //reset barWidth value
    Animated.timing(this.state.barWidth, {
      toValue: this.state.containerWidth,
      duration: (typeof duration === 'number' ? duration : this.state.duration) + 1000,
      useNativeDriver: false,
    }).start();
  };

  resetAll = () => {
    clearTimeout(this.timer);
  }

  render() {
    this.handleBar();
    return <Modal onModalHide={() => this.resetAll()} style={{ flex: 1, height, alignItems: "center" }} animationIn="slideInRight" animationOut="slideOutRight" isVisible={this.state.isShow} coverScreen={false} hasBackdrop={false} >
      <View style={{ borderRadius: 5, position: "absolute", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: this.state.containerWidth, height: RFPercentage(9), backgroundColor: "#07bc0c", top: this.position() }} >
        <Text style={{ color: "white", marginLeft: RFPercentage(1), fontSize: RFPercentage(2.5) }} >Success</Text>
        <View style={{
          flexDirection: 'row',
          height: 4,
          width: '94%',
        }}>
          <Animated.View style={{ backgroundColor: "red", width: this.state.barWidth }} />
        </View>
      </View>
    </Modal>
  }
}