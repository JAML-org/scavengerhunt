import React from 'react';
import { MapView } from 'expo';


const GameMap = (props) => {

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
      <MapView.Marker
        pinColor="#000000"
        coordinate={{
          latitude: props.latitude,
          longitude: props.longitude,
        }}
      />
    </MapView>
  )
}

export default GameMap
