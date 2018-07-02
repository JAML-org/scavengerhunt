import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HotCold = props => {
  const { inPerimeter, latitude, longitude, selectedTarget } = props;

  return (
    <View style={styles.radar}>
      <Text>
        {inPerimeter(
          {
            latitude: latitude,
            longitude: longitude,
          },
          selectedTarget
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  radar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 10,
  },
});

export default HotCold;
