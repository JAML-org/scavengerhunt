import React from 'react';
import styles from './style';
import { View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { MapView } from 'expo';
import style from './style';
import * as firebase from 'firebase';

const fakePoints = [
  [40.704343, -74.012981],
  [40.705554, -74.013444],
  [40.702265, -74.011981],
  [40.703712, -74.00922]
];

class HuntDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: {}
    }
  }

  async componentDidMount() {
    try {
      let response = await firebase.database().ref('/Locations');
      let snapshot = await response.once('value')
      this.setState({
        locations: snapshot.val()
      })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigate, getParam } = this.props.navigation;
    const hunt = getParam('hunt', 'NO-HUNT');
    const huntName = getParam('huntName', 'NO-HUNT-NAME');
    const huntLocationsID = getParam('huntLocationsID', 'NO-HUNT-LOCATION-ID');
    const huntLocations = huntLocationsID.map(locationID => {
      return this.state.locations[locationID];
    })

    function rad2degr(rad) { return rad * 180 / Math.PI; }
    function degr2rad(degr) { return degr * Math.PI / 180; }

    function getLatLngCenter(latLngInDegr) {

      let LATIDX = 0;
      let LNGIDX = 1;
      let sumX = 0;
      let sumY = 0;
      let sumZ = 0;

      for (let i = 0; i < latLngInDegr.length; i++) {
        let lat = degr2rad(latLngInDegr[i][LATIDX]);
        let lng = degr2rad(latLngInDegr[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
      }

      let avgX = sumX / latLngInDegr.length;
      let avgY = sumY / latLngInDegr.length;
      let avgZ = sumZ / latLngInDegr.length;

      // convert average x, y, z coordinate to latitude and longtitude
      let lng = Math.atan2(avgY, avgX);
      let hyp = Math.sqrt(avgX * avgX + avgY * avgY);
      let lat = Math.atan2(avgZ, hyp);

      return { latitude: rad2degr(lat), longitude: rad2degr(lng) };
    }

    const center = getLatLngCenter(fakePoints);

    return (
      <View style={styles.container}>
        <Text h2>{huntName}</Text>
        }}
      <MapView
          style={style.map}
          initialRegion={{
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Circle center={center} radius={1000} strokeColor='red' />
        </MapView>
        <Text>{hunt.blurb}</Text>
        <Text>Targets: {hunt.locations.length}</Text>
        <Button title="Choose Theme" onPress={() => navigate('Map', { huntLocations, huntName })} />
      </View>
    );
  }
};

export default HuntDetails;
