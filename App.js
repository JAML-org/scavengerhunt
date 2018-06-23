import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import RegForm from './components/RegForm';
import HuntList from './components/HuntList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#36485f',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 75,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  textListItem: {
    width: 85,
    height: 85,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 100,
    paddingHorizontal: 10,
  },
  textCenter: {
    textAlign: 'center',
    color: '#fff',
  },
});

const RootStack = createStackNavigator(
  {
    RegForm: {
      screen: RegForm,
    },
    HuntList: {
      screen: HuntList,
    },
  },
  {
    initialRouteName: 'RegForm',
  }
);

// export default class App extends Component {
//   render() {
//     return (
//       // <View style={styles.container}>
//       //   {/* <RegForm /> */}
//       //   <HuntList styles={styles} />
//       // </View>
//       <RootStack />
//     );
//   }
// }

const App = () => <RootStack styles={styles} />;

export default App;
