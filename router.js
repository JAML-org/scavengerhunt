import { createStackNavigator } from 'react-navigation';
import MenuContainer from './components/Menu';
import UserLoginForm from './components/UserLoginForm';
import RegForm from './components/RegForm';

export const AppStack = createStackNavigator(
  {
    UserLogin: {
      screen: UserLoginForm,
    },
    RegForm: {
      screen: RegForm,
    },
  },
  {
    headerMode: 'float',
  }
);

export const RootStack = createStackNavigator(
  {
    AppStack: { screen: AppStack },
    MenuStack: { screen: MenuContainer },
  },
  {
    headerMode: 'none',
    initialRouteName: 'AppStack',
  }
);
