import React from 'react';
import {Animated, Text, TouchableOpacity} from 'react-native';
import StopWatchButtonStyles from './StopWatchButtonStyles';
import i18n from '../../i18n/i18n';
import moment from 'moment';

const StopWatchButton = ({time, startOnPressAction, timerOnPressAction, paused}) => {
    const timerOpacity = new Animated.Value(1);
    const BLINK_DELAY = 500;

    const blinker = (toValue) => {
        if(paused){
            Animated.timing(timerOpacity, {
                toValue,
                duration: BLINK_DELAY
            }).start(()=>{
                blinker(toValue === 1 ? 0: 1);
            });
        } else {
            Animated.timing(timerOpacity, {
                toValue: 1,
                duration: BLINK_DELAY
            }).start();
        }
    };

    blinker(0);
    if(time>0){
        return (
            <TouchableOpacity 
                onPress={timerOnPressAction} 
                style={StopWatchButtonStyles.mainActionButton}>
                <Animated.View style={[StopWatchButtonStyles.mainActionButton,{opacity: timerOpacity}]}>
                    <Text style={StopWatchButtonStyles.mainActionButtonText}>
                        {moment.utc(time).format(i18n.TIME_FORMAT)}
                    </Text>
                    <Text style={[StopWatchButtonStyles.mainActionButtonText, StopWatchButtonStyles.mainActionButtonPauseText]}>
                        {i18n.STOP_WATCH.PAUSE}
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity onPress={startOnPressAction} style={StopWatchButtonStyles.mainActionButton}>
            <Text style={StopWatchButtonStyles.mainActionButtonText}>
                {i18n.STOP_WATCH.START}
            </Text>
        </TouchableOpacity>
    );
}

export default StopWatchButton;