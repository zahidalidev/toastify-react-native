import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Modal from 'react-native-modal';

import colors from "../config/colors"
const { height } = Dimensions.get('window');


class ToastManager extends Component {

    state = {
        isShow: false,
        text: '',
        opacityValue: new Animated.Value(1),
        barWidth: new Animated.Value(RFPercentage(32)),
        backgroundColor: colors.default,
        textColor: colors.textDefault,
        animationStyle: {
            rightInLeftOut: {
                animationIn: "slideInRight",
                animationOut: "slideOutLeft"
            },
            rightInOut: {
                animationIn: "slideInRight",
                animationOut: "slideOutRight"
            },
            fancy: {
                animationIn: "zoomInDown",
                animationOut: "zoomOutUp"
            }
        }
    };

    constructor(props) {
        super(props);
        ToastManager.__singletonRef = this;
    }

    static default = (text) => {
        ToastManager.__singletonRef.show(text, colors.default, colors.textDefault);
    }
    static dark = (text) => {
        ToastManager.__singletonRef.show(text, colors.dark, colors.textDefault);
    }

    static info = (text) => {
        ToastManager.__singletonRef.show(text, colors.info, colors.textDefault);
    }

    static success = (text) => {
        ToastManager.__singletonRef.show(text, colors.success, colors.textDefault);
    }

    static warning = (text) => {
        ToastManager.__singletonRef.show(text, colors.warning, colors.textDefault);
    }

    static error = (text) => {
        ToastManager.__singletonRef.show(text, colors.error, colors.textDefault);
    }

    show(text = '', backgroundColor = colors.default, textColor = colors.textDefault) {
        let duration = this.props.duration;

        this.state.barWidth.setValue(this.props.width)  //reset barWidth value
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
        this.timer = setTimeout(() => {
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
        this.setState({ isShow: false });
        this.isShow = false;
        if (!this.isShow && !this.state.isShow) return;
    }

    resetAll = () => {
        clearTimeout(this.timer);
    }

    render() {
        this.handleBar();
        return (
            <Modal animationIn={this.props.animationIn || this.state.animationStyle[this.props.animationStyle].animationIn} animationOut={this.props.animationOut || this.state.animationStyle[this.props.animationStyle].animationOut} backdropTransitionOutTiming={this.props.backdropTransitionOutTiming} backdropTransitionInTiming={this.props.backdropTransitionInTiming} animationInTiming={this.props.animationInTiming} animationOutTiming={this.props.animationOutTiming} onTouchEnd={() => this.resume()} onTouchStart={() => this.pause()} swipeDirection={['up', 'down', 'left', 'right']} onModalHide={() => this.resetAll()} style={styles.modelContainer} isVisible={this.state.isShow} coverScreen={false} backdropColor={this.props.backdropColor} backdropOpacity={this.props.backdropOpacity} hasBackdrop={this.props.hasBackdrop} >
                <View style={[styles.mainContainer, { width: this.props.width, height: this.props.height, backgroundColor: this.state.backgroundColor, top: this.position(), ...this.props.style }]} >

                    <TouchableOpacity onPress={() => this.hideToast()} activeOpacity={0.9} style={styles.hideButton} >
                        <Text style={{ transform: [{ rotate: '45deg' }], fontWeight: "bold", fontSize: RFPercentage(3.5), color: "white" }} >+</Text>
                    </TouchableOpacity>

                    <Text style={[styles.textStyle, { color: this.state.textColor }]} >{this.state.text}</Text>
                    <View style={styles.progressBarContainer}>
                        <Animated.View style={[styles.progressBar, { width: this.state.barWidth }]} />
                    </View>
                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modelContainer: {
        flex: 1,
        alignItems: "center"
    },
    mainContainer: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        position: "absolute",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",

    },
    hideButton: {
        position: "absolute",
        top: RFPercentage(0),
        right: RFPercentage(1)
    },
    textStyle: {
        fontFamily: 'sans-serif-medium',
        marginLeft: RFPercentage(2),
        marginRight: RFPercentage(2),
        fontSize: RFPercentage(2.5)
    },
    progressBarContainer: {
        flexDirection: "row",
        position: "absolute",
        height: 4,
        width: '100%',
        bottom: 0
    },
    progressBar: {
        opacity: 0.7,
        backgroundColor: "rgba(255,255,255,.7)"
    }
});

ToastManager.defaultProps = {
    width: RFPercentage(32),
    height: RFPercentage(8.5),
    style: {},
    position: 'top',
    positionValue: 50,
    end: 0,
    duration: 3000,
    animationInTiming: 300,
    animationOutTiming: 300,
    backdropTransitionInTiming: 300,
    backdropTransitionOutTiming: 300,
    animationIn: '',
    animationOut: '',
    animationStyle: 'rightInLeftOut',
    hasBackdrop: false,
    backdropColor: 'black',
    backdropOpacity: 0.5
};

export default ToastManager;


