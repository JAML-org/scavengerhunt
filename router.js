import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MenuContainer from './components/Menu';
import UserLoginForm from './components/UserLoginForm';
import SignUpForm from './components/SignUpForm';
import Profile from './components/Profile';
import HowToPlay from './components/HowToPlay';
import JoinHunt from './components/JoinHunt';
import HuntList from './components/HuntList';
import HuntDetails from './components/HuntDetails';
import Main from './components/Main';
import Friends from './components/Friends';
import MyHuntList from './components/MyHuntList';
import Map from './components/Map';

const UnLoggedInStack = createSwitchNavigator(
  {
    UserLogin: {
      screen: UserLoginForm,
    },
    SignUp: {
      screen: SignUpForm,
    },
  },
  {
    headerMode: 'float',
  }
);

export const LoggedInStack = createStackNavigator({
  Menu: { screen: MenuContainer },
  Main: { screen: Main },
  Profile: { screen: Profile },
  Map: { screen: Map },
  MyHuntList: { screen: MyHuntList },
  JoinHunt: { screen: JoinHunt },
  Friends: { screen: Friends },
  HowToPlay: { screen: HowToPlay },
  HuntList: { screen: HuntList },
  HuntDetails: { screen: HuntDetails },
});

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
