import React from 'react';
import styles from './style';
import { View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { MapView } from 'expo';
import style from './style';
import * as firebase from 'firebase';

// const fakePoints = [
//   [40.704343, -74.012981],
//   [40.705554, -74.013444],
//   [40.702265, -74.011981],
//   [40.703712, -74.00922],
// ];

class HuntDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: {},
      coordsArr: [],
      huntLocations: [],
    };
    this.newGame = this.newGame.bind(this);
    this.getLatLngCenter = this.getLatLngCenter.bind(this);
    this.rad2degr = this.rad2degr.bind(this);
    this.degr2rad = this.degr2rad.bind(this);
  }

  async newGame() {
    try {
      let games = await firebase.database().ref('/Games');
      let newgames = await games.push();
      let currentPlayer = firebase.auth().currentUser.uid;
      const { getParam } = this.props.navigation;
      const huntName = getParam('huntName');
      newgames.set({
        players: { [currentPlayer]: 0 },
        theme: huntName,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    const { getParam } = this.props.navigation;
    const huntLocationsID = getParam('huntLocationsID', 'NO-HUNT-LOCATION-ID');
    try {
      let response = await firebase.database().ref('/Locations');
      let snapshot = await response.once('value');
      this.setState({
        locations: snapshot.val(),
      });
      //
      const huntLocations = huntLocationsID.map(locationID => {
        return this.state.locations[locationID];
      });

      const coordsArr = huntLocationsID.map(locationID => {
        return this.state.locations[locationID].coords;
      });
      console.log('COORDS', coordsArr);
      this.setState({ huntLocations, coordsArr });
    } catch (error) {
      console.error(error);
    }
  }
  getLatLngCenter(latLngInDegr) {
    console.log('');
    let LATIDX = 0;
    let LNGIDX = 1;
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;

    for (let i = 0; i < latLngInDegr.length; i++) {
      let lat = this.degr2rad(latLngInDegr[i][LATIDX]);
      let lng = this.degr2rad(latLngInDegr[i][LNGIDX]);
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

    return { latitude: this.rad2degr(lat), longitude: this.rad2degr(lng) };
  }
  rad2degr(rad) {
    return (rad * 180) / Math.PI;
  }
  degr2rad(degr) {
    return (degr * Math.PI) / 180;
  }

  render() {
    const { navigate, getParam } = this.props.navigation;
    const hunt = getParam('hunt', 'NO-HUNT');
    const huntName = getParam('huntName', 'NO-HUNT-NAME');

    if (!hunt || !huntName) {
      return <Text>Loading</Text>;
    }

    let center = {};
    if (this.state.coordsArr.length) {
      // console.log('HELLLOOO!!----', this.state.coordsArr);
      center = this.getLatLngCenter(this.state.coordsArr);
    }
    console.log('CENTER!!', center);

    const huntLocations = this.state.huntLocations;
    return (
      <View style={styles.container}>
        <Text h2>{huntName}</Text>
        }}
        <MapView
          style={style.map}
          initialRegion={{
            latitude: center.latitude || 40.7051283,
            longitude: center.longitude || -74.0089738,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Circle
            center={center || { latitude: 40.7051283, longitude: -74.0089738 }}
            radius={1000}
            strokeColor="red"
          />
        </MapView>
        <Text>{hunt.blurb}</Text>
        <Text>Targets: {hunt.locations.length}</Text>
        {/* <Button title="Choose Theme" onPress={() => navigate('Map', { huntLocations, huntName })} /> */}
        <Button
          title="Ready to Play!"
          onPress={() => {
            this.newGame();
            navigate('Map', { huntLocations, huntName });
          }}
        />
        <Button
          title="Pick a Different Theme"
          onPress={() => navigate('HuntList')}
        />
      </View>
    );
  }
}

export default HuntDetails;
