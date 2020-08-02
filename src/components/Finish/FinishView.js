import React, {useState} from 'react';
import {Text, TextInput, SafeAreaView, View} from 'react-native';
import FinishViewStyles from './FinishViewStyles';
import FlexPadding from './FlexPadding';
import ActionButton from './ActionButton';
import i18n from '../../i18n/i18n';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

const FinishView = props => {
    const timeSpent = props.route.params.timeSpent;
    const [name, setName] = useState('');

    const saveTime = async () => {
        const storageKey = '@activities';
        let activities = await AsyncStorage.getItem(storageKey);
        if(activities === null){
            activities = []
        } else {
            activities = JSON.parse(activities);
        }
        const date = new Date().getTime();
        activities.push({
            name,
            timeSpent,
            date
        })
        await AsyncStorage.setItem(storageKey, JSON.stringify(activities));
        props.navigation.goBack();
    }

    return (
        //we have this amount of views so we can use flex property
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex:4}}>
                <Text style={FinishViewStyles.mainHeader}>{i18n.FINISH.MAIN_HEADER}</Text>
                <Text style={FinishViewStyles.timerSubHeader}>{moment.utc(timeSpent).format(i18n.TIME_FORMAT)}</Text>
                <View style={{flex:0.2}}></View>
            </View>
            <View style={{flex:1}}>
                <FlexPadding>
                    <Text style={FinishViewStyles.activityNameLabel}>{i18n.FINISH.ACTIVITY_NAME_LABEL}</Text>
                </FlexPadding>
                <FlexPadding>
                    <TextInput style={FinishViewStyles.activityNameInput} value={name} onChangeText={(txt) => {
                        setName(txt);
                    }}/>
                </FlexPadding>
            </View>
            <View style={{flex:5}}>
                <FlexPadding>
                    <View style={FinishViewStyles.actionButtonsContainer}>
                        <ActionButton onPress={()=> {
                            props.navigation.goBack();
                        }}
                        label={i18n.CANCEL} backgroundColor={'#F39527'} textColor={'#ffffff'}/>
                        <ActionButton onPress={saveTime} label={i18n.SAVE} backgroundColor={'#00CD5E'} textColor={'#ffffff'}/>
                    </View>
                </FlexPadding>
            </View>
        </SafeAreaView>
    )
}

export default FinishView;