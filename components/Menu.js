import React from 'react';
import { createDrawerNavigator, DrawerActions } from 'react-navigation';
import Profile from './Profile';
import HowToPlay from './HowToPlay';
import JoinHunt from './JoinHunt';
import PursuitList from './PursuitList';
import HuntDetails from './HuntDetails';
import Main from './Main';
import Friends from './Friends';
import MyHuntList from './MyHuntList';
import Map from './Map';
import { View, Image } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import InviteFriends from './InviteFriends';
import Win from './Win'
import { colors } from './style';

const Hidden = () => {
  return null
}

const Menu = createDrawerNavigator(
  {
    Main: { screen: Main },
    Profile: { screen: Profile },
    PursuitList: { screen: PursuitList },
    MyHuntList: { screen: MyHuntList },
    JoinHunt: { screen: JoinHunt },
    Friends: { screen: Friends },
    HowToPlay: { screen: HowToPlay },
    Map: {
      screen: Map,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    HuntDetails: {
      screen: HuntDetails,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    InviteFriends: {
      screen: InviteFriends,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },
    Win: {
      screen: Win,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    }
  },
  { // maybe use
    // contentComponent: MyCustomDrawerItems
    drawerWidth: 300,
    drawerPosition: 'left',
    initialRouteName: 'Main',
  }
);



/*
const MyCustomDrawerItems = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems
        {...props}
        items={ props.items.filter() } />
    </SafeAreaView>
  </ScrollView>
);
*/

const MenuContainer = () => {
  let pressMenu;
  return (
    <React.Fragment>
      <Header
        backgroundColor={colors.white}
        leftComponent={
          <Icon
            name="menu"
            size={32}
            onPress={() => {
              pressMenu.dispatch(DrawerActions.toggleDrawer());
            }}
          />
        }
        centerComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}
          >
            <Image
              source={require('../urban-pursuit-logo.jpg')}
              style={{
                // alignItems: 'flex-end',
                width: 150,
                height: 100,
                resizeMode: Image.resizeMode.contain,
              }}
            />
          </View>
        }
        outerContainerStyles={{
          height: 100,
        }}
        innerContainerStyles={{
          // justifyContent: 'center',
          alignItems: 'flex-end',
        }}
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
