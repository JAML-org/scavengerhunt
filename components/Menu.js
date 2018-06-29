import React from 'react';
import { createDrawerNavigator, DrawerActions, } from 'react-navigation';
import Profile from './Profile';
import HowToPlay from './HowToPlay';
import JoinHunt from './JoinHunt';
import HuntList from './HuntList';
import HuntDetails from './HuntDetails';
import Main from './Main';
import Friends from './Friends';
import MyHuntList from './MyHuntList';
import Map from './Map';
import { Icon, Header } from 'react-native-elements';
import InviteFriends from './InviteFriends';

const Menu = createDrawerNavigator(
  {
    Profile: { screen: Profile },
    Map: { screen: Map },
    MyHuntList: { screen: MyHuntList },
    JoinHunt: { screen: JoinHunt },
    Friends: { screen: Friends },
    HowToPlay: { screen: HowToPlay },
    HuntList: { screen: HuntList },
    HuntDetails: { screen: HuntDetails },
    Main: { screen: Main },
    InviteFriends: { screen: InviteFriends }
  },
  {
    drawerWidth: 300,
    drawerPosition: 'left',
    initialRouteName: 'Main',
  }
);

const MenuContainer = () => {
  let pressMenu;
  return (
    <React.Fragment>
      <Header
        backgroundColor="white"
        leftComponent={
          <Icon
            name="menu"
            onPress={() => {
              pressMenu.dispatch(DrawerActions.toggleDrawer())
            }}
          />
        }
      />
      <Menu
        ref={navigatorRef => {
          pressMenu = navigatorRef;
        }}
      />
    </React.Fragment>
  );
};

// const MenuNavigation = createStackNavigator({
//   DrawerStack: {
//     screen: MenuCreation
//   },

// }, {
//     headerMode: 'float',
//     navigationOptions: ({ navigation }) => ({ title: "menu", headerLeft: <Icon name="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} /> }),
//     initialRouteName: "DrawerStack"
//   })

export default MenuContainer;
