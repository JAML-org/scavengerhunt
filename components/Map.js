import React, { Component } from 'react';
import { MapView } from 'expo';
import Modal from 'react-native-modalbox';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

//

var fakePoints = [
  {
    key: 1,
    latitude: 40.705554,
    longitude: -74.013444,
    title: 'Charging Bull',
  },
  { key: 2, latitude: 40.704343, longitude: -74.012981, title: 'A Starbucks' },
  {
    key: 3,
    latitude: 40.702265,
    longitude: -74.011981,
    title: 'Retro Fitness',
  },
  { key: 4, latitude: 40.703712, longitude: -74.00922, title: 'Chase Bank' },
];

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
});

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      distance: 5,
      selectedTarget: {}, // {name: '', latitude: , longitude: , image: }
      targetImages: [],
    };
    this.inPerimeter = this.inPerimeter.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    this.renderList()
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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
    let radarMessage = ''
    if (distance <= (this.state.distance / 1000)) {
      radarMessage = "you've found it"
    }
    if (distance > .005 && distance <= .050) {
      radarMessage = "warm"
    }

    if (distance > .050) { radarMessage = "cold" }
    return radarMessage
  }

  async renderList() {
    const { getParam } = this.props.navigation;
    const huntName = getParam('huntName', 'NO-HUNT')
    let list = []
    try {
      const hunts = await firebase.database().ref('/Hunts').once('value');
      const targets = await firebase.database().ref('/Locations').once('value');

      const huntsVal = hunts.val()
      const locations = targets.val()

      const huntLocationArr = huntsVal[huntName].locations

      for (let i = 0; i < huntLocationArr.length; i++) {
        let image = locations[+huntLocationArr[i]].image
        list.push(
          image
        );
      }
    }
    catch (error) {
      console.error(error)
    }
    console.log('LIST', list)
    this.setState({
      targetImages: list
    })
  }

  render() {
    let screen = Dimensions.get('window');
    const imageArr = this.state.targetImages;
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <MapView style={{ flex: 1 }} initialRegion={{ latitude: 40.705076, longitude: -74.00916, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
          <MapView.Marker pinColor="#000000" coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }} />
        </MapView>
        <View style={styles.bottomView}>
          <View style={styles.buttonList}>
            <View>
              <Icon name="target" color="black" reverse type="material-community" onPress={() => this.refs.targets.open()} style={styles.btn} />
              <Text>TARGETS</Text>
            </View>
            <View>
              <Icon name="trophy" color="black" reverse type="material-community" onPress={() => this.refs.scores.open()} style={styles.btn} />
              <Text>SCORES</Text>
            </View>
            <View>
              <Icon name="radar" color="black" reverse type="material-community" onPress={() => this.refs.scores.open()} style={styles.btn} />
              <Text>RADAR</Text>
            </View>
          </View>
        </View>
        <Modal style={styles.modal} position={'bottom'} ref={'targets'} swipeArea={20}>
          <ScrollView>
            <View style={{ width: screen.width, paddingLeft: 10 }}>
              {imageArr.map((image, i) => {
                return (
                  <Image
                    key={i}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    source={{ uri: image }} />
                )
              })}
            </View>
          </ScrollView>
        </Modal>
        <Modal style={styles.modal} position={'bottom'} ref={'scores'} swipeArea={20}>
          <ScrollView>
            <View style={{ width: screen.width, paddingLeft: 10 }}>
              <Text>
                {
                  this.inPerimeter({ latitude: this.state.latitude, longitude: this.state.longitude }, fakePoints[0])
                }
              </Text>
            </View>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}
