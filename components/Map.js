import React, { Component } from 'react';
import { MapView } from 'expo';
import Modal from 'react-native-modalbox';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 10,
  },
  buttonList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  btn: {
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  active: {
    overflow: 'hidden',
    borderRadius: 40,
    width: 80,
    height: 80,
    paddingBottom: 30,
    marginLeft: 20,
    opacity: 0.5,
  },
  inactive: {
    overflow: 'hidden',
    borderRadius: 40,
    width: 80,
    height: 80,
    paddingBottom: 30,
    marginLeft: 20,
  },
});

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      distance: 5,
      selectedTarget: {}, // {name: '', latitude: , longitude: }
      targets: [],
      isOpen: false,
    };
    this.inPerimeter = this.inPerimeter.bind(this);
    this.renderList = this.renderList.bind(this);
    this.selectTarget = this.selectTarget.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.getScores = this.getScores.bind(this);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    this.renderList();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  selectTarget(target) {
    this.setState({ selectedTarget: target });
  }

  //translates the distance btwn two coordinates from longitude/latitude to kilometers
  distanceInKM(point1, point2) {
    let lat1 = point1.latitude;
    let lon1 = point1.longitude;
    let lat2 = point2.latitude;
    let lon2 = point2.longitude;

    let p = 0.017453292519943295;
    let c = Math.cos;
    let a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
  }

  inPerimeter(userCoords, targetCoords) {
    const distance = this.distanceInKM(userCoords, targetCoords);

    let radarMessage = '';
    if (distance <= this.state.distance / 1000) {
      radarMessage = "you've found it";
      this.updateScore();
    }
    if (distance > 0.005 && distance <= 0.05) {
      radarMessage = 'warm';
    }
    if (distance > 0.05) {
      radarMessage = 'cold';
    }
    return radarMessage;
  }

  async updateScore() {
    const { getParam } = this.props.navigation;
    let currentGameId = getParam('newGameId');
    let currentPlayerId = getParam('currentPlayer');
    try {
      //find the current game
      let currentGame = await firebase
        .database()
        .ref(`/Games/${currentGameId}/players/`);

      //get previousScore
      let previousScoreObj = await currentGame
        .child(`${currentPlayerId}`)
        .once('value');
      let previousScore = await previousScoreObj.val();

      //update Player's score
      let currentScore = previousScore + 10;
      currentGame.update({
        [currentPlayerId]: currentScore,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getScores() {
    //go into Games
    //match playerID to user
    //Sort based on points
  }

  async renderList() {
    const { getParam } = this.props.navigation;
    const huntName = getParam('huntName', 'NO-HUNT');
    let list = [];
    try {
      const hunts = await firebase
        .database()
        .ref('/Hunts')
        .once('value');
      const targets = await firebase
        .database()
        .ref('/Locations')
        .once('value');
      const huntsVal = hunts.val();
      const locations = targets.val();
      const huntLocationArr = huntsVal[huntName].locations;

      for (let i = 0; i < huntLocationArr.length; i++) {
        let target = locations[+huntLocationArr[i]];
        list.push(target);
      }
    } catch (error) {
      console.error(error);
    }
    this.setState({
      targets: list,
    });
  }

  render() {
    let screen = Dimensions.get('window');
    const { targets, isOpen } = this.state;
    console.log('isOpen', isOpen);

    return (
      <View style={{ flex: 1, position: 'relative' }}>
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
            pinColor="#000000"
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
        </MapView>
        <View style={styles.bottomView}>
          <View style={styles.buttonList}>
            <View>
              <Icon
                name="target"
                color="black"
                reverse
                type="material-community"
                onPress={() => this.refs.targets.open()}
                style={styles.btn}
              />
              <Text>TARGETS</Text>
            </View>
            <View>
              <Icon
                name="trophy"
                color="black"
                reverse
                type="material-community"
                onPress={() => this.refs.scores.open()}
                style={styles.btn}
              />
              <Text>SCORES</Text>
            </View>
            <View>
              <Icon
                name="radar"
                color="black"
                reverse
                type="material-community"
                onPress={() => {this.refs.radar.open()}}
                style={styles.btn}
              />
              <Text>RADAR</Text>
            </View>
          </View>
        </View>
        <Modal
          style={styles.modal}
          position={'bottom'}
          ref={'targets'}
          swipeArea={20}
          isOpen={true}
        >
          <ScrollView horizontal={true} style={{ width: screen.width }}>
            <View style={{ paddingTop: 20, flexDirection: 'row' }}>
              {targets.map((target, i) => {
                return (
                  <TouchableHighlight
                    style={
                      this.state.selectedTarget.name === target.name
                        ? styles.active
                        : styles.inactive
                    }
                    key={i}
                    onPress={() =>
                      this.selectTarget({
                        name: target.name,
                        latitude: target.coords[0],
                        longitude: target.coords[1],
                      })
                    }
                  >
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={{ uri: target.image }}
                    />
                  </TouchableHighlight>
                );
              })}
            </View>
          </ScrollView>
        </Modal>
        <Modal
          style={styles.modal}
          position={'bottom'}
          ref={'scores'}
          swipeArea={20}
        >
          <ScrollView>
            <View style={{ width: screen.width, paddingLeft: 10 }}>
              <Text>These are the scores.</Text>
            </View>
          </ScrollView>
        </Modal>

        <Modal
          style={styles.modal}
          position={'bottom'}
          ref={'radar'}
          swipeArea={20}
          onOpened={() => this.setState({ isOpen: true })}
          onClosed={() => this.setState({ isOpen: false })}
        >
          <View style={{ width: screen.width, paddingLeft: 10 }}>
            <Text>
              {this.inPerimeter(
                    {
                      latitude: this.state.latitude,
                      longitude: this.state.longitude,
                    },
                    this.state.selectedTarget
                  )
                }
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}
