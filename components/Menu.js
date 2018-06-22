import React from 'react';
import { DrawerNavigation } from 'react-navigation';

export const Menu = DrawerNavigator({
  "Join A Hunt": {
    screen: JoinHunt,
  },
  "Choose A Hunt": {
    screen: ChooseHunt,
  },
  "Current Hunts": {
    screen: CurrentHunts,
  },
  "My Hunt List": {
    screen: UserHuntList,
  },
  "Profile": {
    screen: Profile,
  },
  "Friends": {
    screen: Friends,
  },
  "How To Play": {
    screen: HowToPlay,
  },
  "Log Out ": {
    screen: LogOut,
  },
})

export default Menu
