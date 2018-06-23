import React from 'react';
import { createDrawerNavigator, drawerWidth } from 'react-navigation';
import Profile from './Profile'
import HowToPlay from './HowToPlay'
import JoinHunt from './JoinHunt'
import MyHuntList from './MyHuntList'
import Friends from './Friends'


const Menu = createDrawerNavigator({
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
  MyHuntList: {
    screen: MyHuntList,
    navigationOptions: {
      drawer: {
        label: 'My Hunt List',
        position: "left"
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
}
)

export default Menu
