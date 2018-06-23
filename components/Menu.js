import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import Profile from './Profile'
import HowToPlay from './HowToPlay'
import JoinHunt from './JoinHunt'
import MyHuntList from './MyHuntList'
import Friends from './Friends'

export const Menu = DrawerNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawer: {
        label: 'Profile'
      }
    }
  },
  JoinHunt: {
    screen: JoinHunt,
    navigationOptions: {
      drawer: {
        label: 'Join Hunt'
      }
    }
  },
  // ChooseHunt: {
  //   screen: ChooseHunt,
  //   navigationOptions: {
  //     drawer: {
  //       label: 'Choose Hunt'
  //     }
  //   }
  // },
  MyHuntList: {
    screen: MyHuntList,
    navigationOptions: {
      drawer: {
        label: 'My Hunt List'
      }
    }
  },
  Friends: {
    screen: Friends,
    navigationOptions: {
      drawer: {
        label: 'Friends'
      }
    }
  },
  HowToPlay: {
    screen: HowToPlay,
    navigationOptions: {
      drawer: {
        label: 'How To Play'
      }
    }
  },
  // LogOut: {
  // }
})

export default Menu
