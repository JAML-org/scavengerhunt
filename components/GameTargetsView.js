import React from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';

const GameTargetsViews = (props) => {
  const {targets, selectedTarget, selectTarget} = props
  return (
    <View style={{ paddingTop: 20, flexDirection: 'row' }}>
      {targets.map((target, i) => {
        return (
          <TouchableHighlight
            style={
              selectedTarget.name === target.name
                ? styles.active
                : styles.inactive
            }
            key={i}
            onPress={() =>
              selectTarget({
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
  )
}

const styles = StyleSheet.create({
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
  }
})
export default GameTargetsViews
