import RecieverDetailsScreen from './Screen/RecieverDetailsScreen';
import ExchangeScreen from './Screen/ExchangeScreen';
import{createStackNavigator} from 'react-navigation-stack';

export const AppStackNavigator=createStackNavigator({
   RecieverDetailsScreenList:{
       screen:RecieverDetailsScreen,
       navigationOptions:{
           HeaderShown:false
       }
   },
   exchangeScreen:{
       screen:ExchangeScreen,
       navigationOptions:{
           HeaderShown:false
       }
    }
   },
   {
   initialRootName:'HomeScreenList'
   
})