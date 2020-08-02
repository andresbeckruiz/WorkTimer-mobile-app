import React from 'react';
import {SafeAreaView} from 'react-native';
import HomeView from './src/components/Home/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FinishView from './src/components/Finish/FinishView';
import HistoryView from './src/components/History/HistoryView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false}}/>
      <Stack.Screen name="Finish" component={FinishView} options={{headerShown: false}}/>
    </Stack.Navigator>

  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
            activeTintColor:'#6D6D6D', 
            inactiveTintColor:'#A3A3A3', 
            labelStyle: {
              fontSize: 30
            },
            style: {
              backgroundColor: '#E0E0E0',
              borderColor: 'rgba(140, 140, 140, 0.8)',
              borderTopWidth: 1
            }
          }}
            >
          <Tab.Screen name="Home" component={StackNavigator} />
          <Tab.Screen name="History" component={HistoryView} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
