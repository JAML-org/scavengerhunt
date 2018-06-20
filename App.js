import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

import UserLocation from './components/UserLocation';

export default class App extends React.Component {
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      err => console.log(err)
    );
  };
  render() {
    return (
      // <View style={styles.container}>
      //   <UserLocation onGetLocation={this.getUserLocationHandler} />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.705076,
          longitude: -74.00916,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
