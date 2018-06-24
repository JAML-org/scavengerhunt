// import React from 'react'
import { createStackNavigator } from 'react-navigation';
import MenuContainer from './components/Menu';
import UserLoginForm from './components/UserLoginForm';
import RegForm from './components/RegForm';
// import HuntList from './components/HuntList';
// import HuntDetails from './components/HuntDetails';
// import HuntTargets from './components/HuntTargets';
// import JoinHunt from './components/JoinHunt';
// import MyHuntList from './components/MyHuntList';
// import Main from './components/Main'
// import { Icon } from 'react-native-elements';

//not logged in stack
//logged in stack --inside is where everything not login/signup related

export const AppStack = createStackNavigator(
  {
    UserLogin: {
      screen: UserLoginForm,
    },
    RegForm: {
      screen: RegForm,
    }
  },
  {
    headerMode: 'float',
  });

export const RootStack = createStackNavigator(
  {
    AppStack: { screen: AppStack },
    MenuStack: { screen: MenuContainer }
  },
  {
    headerMode: 'none',
    initialRouteName: 'MenuStack',
  }
)
