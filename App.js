
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-native';
import {AppDrawerNavigator} from './Component/AppDrawerNavigator';
import {AppsTabNavigator} from './Component/AppsTabNavigator;'
import HomeScreen from './Screen/HomeScreen';
import SignUpLoginScreen from './Screen/SignUpLoginScreen'
export default function App() {
  return (
    
      <AppContainer/>
    
  
  );
}
const switchNavigator=createSwitchNavigator({
HomeScreen:{screen:HomeScreen},
drawer:{screen:AppDrawerNavigator}
})
const AppContainer=createAppContainer(switchNavigator);