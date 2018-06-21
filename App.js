import React from 'react';
import { MapView } from 'expo';
import Geofence from 'react-native-expo-geofence';

var fakePoints = [
  { key: 1, latitude: 40.705554, longitude: -74.013444, title: 'Charging Bull' },
  { key: 2, latitude: 40.704343, longitude: -74.012981, title: 'A Starbucks' },
  { key: 3, latitude: 40.702265, longitude: -74.011981, title: 'Retro Fitness' },
  { key: 4, latitude: 40.703712, longitude: -74.009220, title: 'Chase Bank' },
]

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      latitude: 0,
      longitude: 0,
      markers: [],
      distance: 500,
      showCircle: true
    }
    this.inPerimeter = this.inPerimeter.bind(this)
  }


  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // console.log(this.state)
        // console.warn(this.state)
      }
    );

    const markers = Geofence.filterByProximity(fakePoints[0], {
      latitude: 40.705076,
      longitude: -74.00916,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, this.state.distance / 1000);
    this.setState({ markers });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  distanceInKM(point1, point2) {
    let lat1 = point1.latitude;
    let lon1 = point1.longitude;
    let lat2 = point2.latitude;
    let lon2 = point2.longitude;

    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
  }

  inPerimeter(userCoords, targetCoords) {

    const distance = this.distanceInKM(userCoords, targetCoords)

    return distance <= this.state.distance / 1000
  }

  render() {
    const { markers } = this.state
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
        {
          this.inPerimeter({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }, fakePoints[0]) &&
          console.warn('in perimeter!!')
        }
        <MapView.Marker
          pinColor="#000000"
          coordinate={
            {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }
          }
        />

        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}
            coordinate={marker}
            title={marker.title}
            description={null}
          />
        ))}
        {this.state.markers.map(marker => (
          <MapView.Circle
            key={marker.key}
            center={{
              latitude: marker.latitude, longitude: marker.longitude, latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            radius={this.state.distance}
            strokeColor='transparent'
            fillColor="rgba(0, 0, 0, 0.2)" />
        ))}
      </MapView>

    );
  }
}
