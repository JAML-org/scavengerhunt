import React from 'react';
import { createDrawerNavigator, createStackNavigator, DrawerActions } from 'react-navigation';
import Profile from './Profile'
import HowToPlay from './HowToPlay'
import JoinHunt from './JoinHunt'
import HuntList from './HuntList'
import HuntDetails from './HuntDetails'
import Friends from './Friends'
import { Icon } from 'react-native-elements'

export const MenuCreation = createDrawerNavigator({
  Profile: {
    screen: Profile,
  },
  JoinHunt: {
    screen: JoinHunt,
  },
  Friends: {
    screen: Friends,
  },
  HowToPlay: {
    screen: HowToPlay,
  }
},
  {
    drawerPosition: "left",

  }
)


const MenuNavigation = createStackNavigator({
  DrawerStack: { screen: MenuCreation },
  HuntList: {
    screen: HuntList,
  },
  HuntDetails: {
    screen: HuntDetails,
  },

}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({ title: "menu", headerLeft: <Icon name="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} /> })
  })

export default MenuNavigation

