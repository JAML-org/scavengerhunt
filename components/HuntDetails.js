import React from 'react';
import styles from './style';
import { View, Button, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import { MapView } from 'expo';
import * as firebase from 'firebase';

class HuntDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: {},
      coordsArr: [],
      huntLocations: [],
      newGameId: '',
    };
    this.newGame = this.newGame.bind(this);
    this.getLatLngCenter = this.getLatLngCenter.bind(this);
    this.rad2degr = this.rad2degr.bind(this);
    this.degr2rad = this.degr2rad.bind(this);
  }

  async newGame(navigate) {
    try {
      //Get huntName from HuntList component to pass into new game
      const { getParam } = this.props.navigation;
      const huntName = getParam('huntName');

      //Get signed in user
      let currentPlayer = await firebase.auth().currentUser.uid;
      //Route to Games in Firebase
      let games = await firebase.database().ref('/Games');

      //Generate newgame ID
      let newGame = await games.push();
      //Add game to Games route
      newGame.set({
        players: { [currentPlayer]: 0 },
        theme: huntName,
      });

      //Route to currentUser games
      let userGame = await firebase
        .database()
        .ref(`/Users/${currentPlayer}/Games`);

      //Add newGame to currentUser
      userGame.update({
        [newGame.key]: '',
      });
      //Set state for newGameId to pass down to Map component before navigating
      this.setState({ newGameId: newGame.key }, () => {
        navigate('Map', {
          huntLocations: this.state.huntLocations,
          huntName,
          newGameId: this.state.newGameId,
          currentPlayer,
        });
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

      this.setState({ huntLocations, coordsArr });
    } catch (error) {
      console.error(error);
    }
  }
  getLatLngCenter(latLngInDegr) {
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
    const { coordsArr } = this.state;
    const { navigate, getParam } = this.props.navigation;
    const hunt = getParam('hunt', 'NO-HUNT');
    const huntName = getParam('huntName', 'NO-HUNT-NAME');

    if (!hunt || !huntName) {
      return <Text>Loading</Text>;
    }

    let center = {};
    if (coordsArr.length) {
      center = this.getLatLngCenter(coordsArr);
    }

    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <Text h2 style={styles.header}>
            {huntName}
          </Text>
          }}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: center.latitude || 40.7051283,
              longitude: center.longitude || -74.0089738,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0221,
            }}
          >
            <MapView.Circle
              center={
                center || { latitude: 40.7051283, longitude: -74.0089738 }
              }
              radius={1000}
              strokeColor="red"
            />
          </MapView>
          <Text>{hunt.blurb}</Text>
          <Text>Targets: {hunt.locations.length}</Text>
          <Button
            title="Ready to Play!"
            onPress={() => {
              this.newGame(navigate);
            }}
          />
          <Button
            title="Pick a Different Theme"
            onPress={() => navigate('PursuitListi')}
          />
        </View>
      </ImageBackground>
    );
  }
}

export default HuntDetails;
