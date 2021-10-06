import React,{ Component } from "react";
import{createDrawerNavigator} from 'react-navigation-drawer'
import SettingScreen from "../Screen/SettingScreen";
import {AppsTabNavigator} from './AppsTabNavigator'
import customSideBarMenu from './customSideBarMenu'
import MyBarterScreen from '../Screen/MyBarterScreen'
import NotificationScreen from "../Screen/NotificationScreen";
import MyRecievedItems from "../Screen/MyRecievedItemsList"
import {Icon} from 'react-native-elements'

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:AppsTabNavigator,
        navigationOptions:{
            drawerIcon:<Icon name="home" type="font-awesome"/>

        }
    },
    setting:{
        screen:SettingScreen,
        navigationOptions:{
            drawerIcon:<Icon name="setting" type="font-awesome"/>,
            drawerLabel:"setting"
        }
    },
    Notification:{
        screen:NotificationScreen,
    navigationOptions:{
        drawerIcon:<Icon name="bell" type="font-awesome"/>,
        drawerLabel:"notification"
    }
    },
    MyBarter:{
        screen:MyBarterScreen,
        navigationOptions:{
            drawerIcon:<Icon name="gift" type="font-awesome"/>,
            drawerLabel:"mytransaction"
    }
},
MyRecievedItems:{
    screen:MyRecievedItems,
    navigationOptions:{
        drawerIcon:<Icon name="gift" type="font-awesome"/>,
        drawerLabel:"myrecievedItemslist"
    }
}
},
{contentComponent:customSideBarMenu},
{
    initialRootName:'Home'
})