import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

import UserLocation from './components/UserLocation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
    };
  }
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          isLoading: false,
          markers: position,
        });
        console.log(position);
      },
      err => console.log(err)
    );
  };

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isLoading: true,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
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
        return (
          <MapView.Marker coordinate={
            {latitude: this.state.latitude,
              longitude: this.state.longitude}
              title={"YOU ARE HERE"}
          }
        } />
        )


        </MapView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
