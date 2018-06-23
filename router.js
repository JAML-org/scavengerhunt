import { createStackNavigator } from 'react-navigation';

import UserLoginForm from './components/UserLoginForm';
import RegForm from './components/RegForm';
import HuntList from './components/HuntList';
import HuntDetails from './components/HuntDetails';
import HuntTargets from './components/HuntTargets';
import JoinHunt from './components/JoinHunt';
import MyHuntList from './components/MyHuntList';
import Main from './components/Main';
export const RootStack = createStackNavigator(
  {
    UserLogin: {
      screen: UserLoginForm,
    },
    RegForm: {
      screen: RegForm,
    },
    HuntList: {
      screen: HuntList,
    },
    HuntDetails: {
      screen: HuntDetails,
    },
    HuntTargets: {
      screen: HuntTargets,
    },
    JoinHunt: {
      screen: JoinHunt,
    },
    MyHuntList: {
      screen: MyHuntList,
    },
    Main: {
      screen: Main,
    },
  },
  {
    initialRouteName: 'UserLogin',
  }
);
