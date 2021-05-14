import React, { Component } from 'react';
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
    };

    componentWillUnmount() {
        this.resetTimeout();
    }

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
        })
            .start(() => {
                this.isShow = true;
                if (duration !== this.props.end) this.close();
            });
    }

    close(duration) {
        let delay = typeof duration === 'number' ? duration : this.state.duration;
        if (delay === this.props.end) delay = this.props.defaultCloseDelay;

        if (!this.isShow && !this.state.isShow) return;
        this.resetTimeout();
        this.timer = setTimeout(() => Animated.timing(this.state.opacityValue, {
            toValue: 0.0,
            useNativeDriver: false,
            duration: this.props.fadeOutDuration,
        })
            .start(() => {
                this.setState({ isShow: false });
                this.isShow = false;
            }), delay);
    }

    resetTimeout() {
        clearTimeout(this.timer);
    }

    position() {
        if (this.props.position === 'top') return this.state.top;
        if (this.props.position === 'center') return height / 2;
        return (height / 2) - RFPercentage(10);
        // return height - this.state.top - 100;
    }

    render() {
        // return
        // <Modal onTouchStart={() => null} animationType="fade" transparent={true} visible={true}  >
        //     <View style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: RFPercentage(30), height: RFPercentage(8), backgroundColor: "#07bc0c", top: this.position(), left: width / 5 }} >
        //         <Text style={{ color: "white", marginLeft: RFPercentage(1), fontSize: RFPercentage(2.5) }} >Success</Text>
        //         <Progress.Bar indeterminateAnimationDuration={1000} indeterminate={true} animated={true} width={200} />
        //     </View>
        // </Modal>
        return <Modal animationIn="slideInRight" animationOut="slideOutRight" isVisible={this.state.isShow} coverScreen={false} hasBackdrop={false} >
            <View style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: RFPercentage(30), height: RFPercentage(8), backgroundColor: "#07bc0c", top: this.position(), left: width / 5 }} >
                <Text style={{ color: "white", marginLeft: RFPercentage(1), fontSize: RFPercentage(2.5) }} >Success</Text>
                <Progress.Bar indeterminateAnimationDuration={1000} indeterminate={true} animated={true} width={200} />
            </View>
        </Modal>
    }
}