/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import HomeView from './src/components/Home/HomeView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FinishView from './src/components/Finish/FinishView';

const Stack = createStackNavigator();

const App = () => {
  return (
    //<SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeView} options={{ headerShown: false}}/>
          <Stack.Screen name="Finish" component={FinishView} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    //</SafeAreaView>
  );
};

export default App;
