// import React from 'react';
// import {Text, SafeAreaView, View, FlatList} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import i18n from '../../i18n/i18n';
// import moment from 'moment';
// import HistoryViewStyles from './HistoryViewStyles';

// class HistoryView extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             parsedActivities: []
//         };
//         // this.getActivities = this.getActivities.bind(this);
//         // props.navigation.addListener('willFocus', this.getActivities);
//         this.getActivities()
//     }
    
//     async getActivities(){
//         const activities = await AsyncStorage.getItem('@activities');
//         let parsedActivities = []
//         if(activities !== null){
//             parsedActivities = JSON.parse(activities)
//         }
//         this.setState({parsedActivities});
//         console.log('working?')
//     }

//     renderItem({item}) {
//         return (
//             <View style={HistoryViewStyles.historyItemContainer}>
//                 <View style={{flex: 4}}>
//                     <Text style={HistoryViewStyles.historyItemNameText}>{item.name}</Text>
//                 </View>
//                 <View style={HistoryViewStyles.historyItemDetails}>
//                     <View>
//                         <Text style={HistoryViewStyles.historyItemDetailsText}>{moment.utc(item.date).format(i18n.DATE_FORMAT)}</Text>
//                     </View>
//                     <View>
//                         <Text style={HistoryViewStyles.historyItemDetailsText}>{moment.utc(item.timeSpent).format(i18n.TIME_FORMAT)}</Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
//     render(){
//         const {parsedActivities} = this.state;
//         return (
//             <SafeAreaView style={{flex: 1}}>
//                 <Text style={HistoryViewStyles.historyPageHeader}>{i18n.HISTORY.SAVED_ACTIVITIES_HEADER}</Text>
//                 <FlatList 
//                     data={parsedActivities} 
//                     //have to destructure because an object is passed here
//                     renderItem={this.renderItem}
//                     keyExtractor={(item,index)=> {
//                         return item.name + index
//                     }}
//                 ></FlatList>
//             </SafeAreaView>
//             );
//     };   
// };

// export default HistoryView;

import React from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import i18n from '../../i18n/i18n';
import HistoryViewStyles from './HistoryViewStyles';

class HistoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        parsedActivities: [],
        };
        this.getActivities = this.getActivities.bind(this);
        props.navigation.addListener('willFocus', this.getActivities);
        //this.getActivities();
    }

    async getActivities() {
        console.log('running!')
        const activities = await AsyncStorage.getItem('@activities');
        let parsedActivities = [];
        if (activities !== null) {
            parsedActivities = JSON.parse(activities);
        }
        this.setState({parsedActivities});
    }

    renderItem({item}) {
        return (
            <View style={HistoryViewStyles.historyItemContainer}>
                <View style={{flex: 4}}>
                    <Text style={HistoryViewStyles.historyItemNameText}>{item.name}</Text>
                </View>
                <View style={HistoryViewStyles.historyItemDetailsContainer}>
                    <View>
                        <Text style={HistoryViewStyles.historyItemDetailsText}>
                    {moment.utc(item.date).format(i18n.DATE_FORMAT)}
                        </Text>
                    </View>
                    <View>
                        <Text style={HistoryViewStyles.historyItemDetailsText}>
                {moment.utc(item.timeSpent).format(i18n.TIME_FORMAT)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const {parsedActivities} = this.state;
        return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={HistoryViewStyles.historyPageHeader}>
            {i18n.HISTORY.SAVED_ACTIVITIES_HEADER}
        </Text>
            <FlatList
            data={parsedActivities}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => {
                return item.name + index;
            }}
            />
        </SafeAreaView>
        );
    } 
}

export default HistoryView;