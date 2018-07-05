import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MenuContainer from './components/Menu';
import SplashScreen from './components/Splash';
import UserLoginForm from './components/UserLoginForm';
import SignUpForm from './components/SignUpForm';


export const UnLoggedInStack = createSwitchNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
    },
    UserLogin: {
      screen: UserLoginForm,
    },
    SignUp: {
      screen: SignUpForm,
    },
  },
  {
    headerMode: 'none',
  }
);

export const LoggedInStack = createStackNavigator(
  {
    Menu: { screen: MenuContainer }
  },
  {
    headerMode: 'none',
  }
);

export const RootStack = createStackNavigator(
  {
    UnLoggedInStack: { screen: UnLoggedInStack },
    LoggedInStack: { screen: LoggedInStack },
  },
  {
    headerMode: 'none',
    initialRouteName: 'UnLoggedInStack',
  }
);
