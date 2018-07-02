import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MenuContainer from './components/Menu';
import SplashScreen from './components/Splash';
import UserLoginForm from './components/UserLoginForm';
import SignUpForm from './components/SignUpForm';
import Profile from './components/Profile';
import HowToPlay from './components/HowToPlay';
import JoinHunt from './components/JoinHunt';
import PursuitList from './components/PursuitList';
import HuntDetails from './components/HuntDetails';
import Main from './components/Main';
import Friends from './components/Friends';
import MyHuntList from './components/MyHuntList';
import Map from './components/Map';
import InviteFriends from './components/InviteFriends';
import Win from './components/Win'

const UnLoggedInStack = createSwitchNavigator(
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
    Menu: { screen: MenuContainer },
    Main: { screen: Main },
    Profile: { screen: Profile },
    Map: { screen: Map },
    MyHuntList: { screen: MyHuntList },
    JoinHunt: { screen: JoinHunt },
    Friends: { screen: Friends },
    HowToPlay: { screen: HowToPlay },
    PursuitList: { screen: PursuitList },
    HuntDetails: { screen: HuntDetails },
    InviteFriends: { screen: InviteFriends },
    Win: { screen: Win },
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
    initialRouteName: 'LoggedInStack',
  }
);
