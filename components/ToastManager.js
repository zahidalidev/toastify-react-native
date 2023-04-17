import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import React, { Component } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native'

import defaultProps from '../utils/defaultProps'
import { Colors } from '../config/theme'
import { styles, customContentStyles } from './styles'

const { height } = Dimensions.get('window')

class ToastManager extends Component {
  constructor(props) {
    super(props)
    ToastManager.__singletonRef = this
  }

  state = {
    isShow: false,
    text: '',
    opacityValue: new Animated.Value(1),
    barWidth: new Animated.Value(RFPercentage(32)),
    barColor: Colors.default,
    icon: 'checkmark-circle',
    position: this.props.position,
    animationStyle: {
      upInUpOut: {
        animationIn: 'slideInDown',
        animationOut: 'slideOutUp',
      },
      rightInOut: {
        animationIn: 'slideInRight',
        animationOut: 'slideOutRight',
      },
      zoomInOut: {
        animationIn: 'zoomInDown',
        animationOut: 'zoomOutUp',
      },
    },
  }

  static info = ({ text: text, position: position, icon: icon = 'ios-information-circle', iconColor = Colors.info, textColor: textColor = '#000000', background: background = '#FFFFFF' }) => {
    ToastManager.__singletonRef.show(text, iconColor, icon, position, background, textColor)
  }

  static success = ({ text: text, position: position, icon: icon = 'checkmark-circle', iconColor = Colors.success, textColor: textColor = '#000000', background: background = '#FFFFFF' }) => {
    ToastManager.__singletonRef.show(text, iconColor, icon, position, background, textColor)
  }

  static warn = ({ text: text, position: position, icon: icon = 'warning', iconColor = Colors.warn, textColor: textColor = '#000000', background: background = '#FFFFFF' }) => {
    ToastManager.__singletonRef.show(text, iconColor, icon, position, background, textColor)
  }

  static error = ({ text: text, position: position, icon: icon = 'alert-circle', iconColor = Colors.error, textColor: textColor = '#000000', background: background = '#FFFFFF' }) => {
    ToastManager.__singletonRef.show(text, iconColor, icon, position, background, textColor)
  }

  static custom = ({ text: text, position: position, icon: icon = 'alert-circle', iconColor: iconColor = Colors.error, textColor: textColor = '#000000', background: background = '#FFFFFF' }) => {
    ToastManager.__singletonRef.show(text, iconColor, icon, position, background, textColor)
  }

  show = (text = '', barColor = Colors.default, icon, position, background, textColor) => {
    const { duration } = this.props
    this.state.barWidth.setValue(this.props.width)
    this.setState({
      isShow: true,
      duration,
      text,
      barColor,
      icon,
      background,
      textColor
    })
    if (position) this.setState({ position })
    this.isShow = true
    if (duration !== this.props.end) this.close(duration)
  }

  close = (duration) => {
    if (!this.isShow && !this.state.isShow) return
    this.resetAll()
    this.timer = setTimeout(() => {
      this.setState({ isShow: false })
    }, duration || this.state.duration)
  }

  position = () => {
    const { position } = this.state
    if (position === 'top') return this.props.positionValue
    if (position === 'center') return height / 2 - RFPercentage(9)
    return height - this.props.positionValue - RFPercentage(10)
  }

  handleBar = () => {
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start()
  }

  pause = () => {
    this.setState({ oldDuration: this.state.duration, duration: 10000 })
    Animated.timing(this.state.barWidth).stop()
  }

  resume = () => {
    this.setState({ duration: this.state.oldDuration, oldDuration: 0 })
    Animated.timing(this.state.barWidth, {
      toValue: 0,
      duration: this.state.duration,
      useNativeDriver: false,
    }).start()
  }

  hideToast = () => {
    this.resetAll()
    this.setState({ isShow: false })
    this.isShow = false
    if (!this.isShow && !this.state.isShow) return
  }

  resetAll = () => {
    clearTimeout(this.timer)
  }

  render() {
    this.handleBar()
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
      contentStyle,
      theme,
    } = this.props

    const allContentStyles = { ...customContentStyles, ...contentStyle }

    const {
      isShow,
      animationStyle: stateAnimationStyle,
      barColor,
      icon,
      text,
      barWidth,
      background,
      textColor
    } = this.state

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
        swipeDirection={['up', 'down', 'left', 'right']}
        onSwipeComplete={this.hideToast}
        onModalHide={this.resetAll}
        isVisible={isShow}
        coverScreen={false}
        backdropColor={backdropColor}
        backdropOpacity={backdropOpacity}
        hasBackdrop={hasBackdrop}
        style={[styles.modalContainer, allContentStyles?.modalContainer]}
      >
        <View
          style={[
            styles.mainContainer,
            allContentStyles?.mainContainer,
            {
              width,
              height,
              backgroundColor: background,
              top: this.position(),
              ...style,
            },
          ]}
        >
          <TouchableOpacity onPress={this.hideToast} activeOpacity={0.9} style={[styles.hideButton, allContentStyles?.hideButton]}>
            <Icon name='ios-close-outline' size={22} color={textColor} />
          </TouchableOpacity>
          <View style={[styles.content, allContentStyles?.content]}>
            <Icon name={icon} size={22} color={barColor} style={[styles.iconWrapper, allContentStyles?.iconWrapper]} />
            <Text style={[styles.textStyle, allContentStyles?.textStyle, { color: textColor }]}>{text}</Text>
          </View>
          <View style={[styles.progressBarContainer, allContentStyles?.progressBarContainer]}>
            <Animated.View
              style={[styles.progressBar, allContentStyles?.progressBar, { width: barWidth, backgroundColor: barColor }]}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

ToastManager.defaultProps = defaultProps

export default ToastManager