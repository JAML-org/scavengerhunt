import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

import UserLocation from './components/UserLocation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
    )
    this.watchId = navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => console.log(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
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
        {/* return (
         <MapView.Marker
          coordinate={
            {
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }
          }
        />
        ) */}
      </MapView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
