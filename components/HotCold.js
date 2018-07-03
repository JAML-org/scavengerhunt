import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import Chroma from 'chroma-js'
import { Icon } from 'react-native-elements'

const HotCold = (props) => {

  const { inPerimeter, selectedTarget, longitude, latitude } = props

  return (
    <View style={styles.radar}>
      <Icon reverse name="radar" type="material-community" color={selectedTarget && inPerimeter([latitude, longitude], [selectedTarget.latitude, selectedTarget.longitude]) || '#000'} />
    </View>
  )
};

const styles = StyleSheet.create({
  radar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 10,
  },
});

export default HotCold
