import React, { Component } from 'react';
import { MapView } from 'expo';
import Modal from 'react-native-modalbox';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

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
    height: 300,
  },
});

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      distance: 5,
    };
    this.inPerimeter = this.inPerimeter.bind(this);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
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

    return distance <= this.state.distance / 1000;
  }

  renderList() {
    var list = [];

    for (var i = 0; i < 50; i++) {
      list.push(
        <Text style={styles.text} key={i}>
          Elem {i}
        </Text>
      );
    }

    return list;
  }

  render() {
    let screen = Dimensions.get('window');
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
          {this.inPerimeter(
            { latitude: this.state.latitude, longitude: this.state.longitude },
            fakePoints[0]
          ) && console.warn('in perimeter!!')}
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
                name="beer"
                color="black"
                reverse
                type="material-community"
                onPress={() => this.refs.modal6.open()}
                style={styles.btn}
              />
              <Text>TARGETS</Text>
            </View>
            <View>
              <Icon
                name="beer"
                color="black"
                reverse
                type="material-community"
                onPress={() => this.refs.modal6.open()}
                style={styles.btn}
              />
              <Text>SCORES</Text>
            </View>
          </View>
        </View>
        <Modal
          style={styles.modal}
          position={'bottom'}
          ref={'modal6'}
          swipeArea={20}
        >
          <ScrollView>
            <View style={{ width: screen.width, paddingLeft: 10 }}>
              {this.renderList()}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}
