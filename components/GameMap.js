import React from 'react';
import { MapView } from 'expo';


const GameMap = (props) => {

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 40.705076,
        longitude: -74.00916,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221,
      }}
    >
      <MapView.Marker
        image={require('../marker.png')}
        coordinate={{
          latitude: props.latitude,
          longitude: props.longitude,
        }}
      />
    </MapView>
  )
}

export default GameMap
