import React from 'react';
import { createDrawerNavigator, createStackNavigator, DrawerActions } from 'react-navigation';
import Profile from './Profile'
import HowToPlay from './HowToPlay'
import JoinHunt from './JoinHunt'
import HuntList from './HuntList'
import HuntDetails from './HuntDetails'
import Main from './Main'
import Friends from './Friends'
import MyHuntList from './MyHuntList'
import { Icon, Header } from 'react-native-elements'

const Menu = createDrawerNavigator({
  Profile: {
    screen: Profile,
  },
  MyHuntList: {
    screen: MyHuntList
  },
  JoinHunt: {
    screen: JoinHunt,
  },
  Friends: {
    screen: Friends,
  },
  HowToPlay: {
    screen: HowToPlay,
  },
  HuntList: {
    screen: HuntList,
  },
  HuntDetails: {
    screen: HuntDetails,
  },
  Main: {
    screen: Main,
  }
},
  {
    drawerPosition: "left",
    initialRouteName: 'Main'
  }
)

/*
let x;
function bar () {
  console.log(x);
}

function foo (_x) {
  x = _x
}

// somewhere someone calls foo(5)
// then later at some point someone calls bar()
*/

const MenuContainer = () => {
  let pressMenu;
  return (
    <React.Fragment>
      <Header
        backgroundColor="white"
        leftComponent={<Icon name="menu" onPress={() => {
          pressMenu(DrawerActions.toggleDrawer())
        }} />}
      />
      <Menu
        ref={navigatorRef => {
          pressMenu = navigatorRef.dispatch
        }}
      />
    </React.Fragment>
  )
}

// const MenuNavigation = createStackNavigator({
//   DrawerStack: {
//     screen: MenuCreation
//   },

// }, {
//     headerMode: 'float',
//     navigationOptions: ({ navigation }) => ({ title: "menu", headerLeft: <Icon name="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} /> }),
//     initialRouteName: "DrawerStack"
//   })

export default MenuContainer

