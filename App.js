import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

import UserLocation from './components/UserLocation';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      latitude: 0,
      longitude: 0,
    }
  }


  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        console.log("WERTCHED POSITION", position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(this.state)
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 40.705076,
          longitude: -74.00916,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={
            {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }
          }
        />
      </MapView>

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
