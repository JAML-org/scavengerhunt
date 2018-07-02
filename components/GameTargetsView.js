import React from 'react';
import { View, Image, TouchableHighlight, StyleSheet, Button } from 'react-native';

const GameTargetsViews = props => {
  const { targets, selectedTarget, selectTarget } = props;

  return (
    <View style={{ flexDirection: 'row' }}>
      {targets.map((target, i) => {
        return (
          <TouchableHighlight
            style={
              selectedTarget.name === target[0].name
                ? styles.active
                : styles.inactive
            }
            key={i}
            onPress={() =>
              selectTarget({
                id: target[1],
                name: target[0].name,
                latitude: target[0].coords[0],
                longitude: target[0].coords[1],
              })
            }
          >
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: target[0].image }}
            />
          </TouchableHighlight>
        );
      })}
    </View>
  );
};

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
  },
});
export default GameTargetsViews;
