import { createStackNavigator } from 'react-navigation';

import UserLoginForm from './components/UserLoginForm';
import RegForm from './components/RegForm';
import HuntList from './components/HuntList';
import HuntDetails from './components/HuntDetails';
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
  },
  {
    initialRouteName: 'HuntList',
  }
);
