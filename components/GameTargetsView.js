import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Button,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from './style';

const GameTargetsViews = props => {
  const { targets, selectedTarget, selectTarget, targetStatus } = props;

  return (
    <View style={{ flexDirection: 'row' }}>
      {targets.map((target, i) => {
        return (
          <TouchableHighlight
            style={
              selectedTarget.name === target.name
                ? styles.active
                : styles.inactive
            }
            key={i}
            onPress={() => {
              return (
                !targetStatus[target.id] &&
                selectTarget({
                  id: target.id,
                  name: target.name,
                  latitude: target.coords[0],
                  longitude: target.coords[1],
                })
              );
            }}
          >
            {targetStatus[target.id] ? (
              <Icon name="check" reverse color={colors.mediumblue} size={30} />
            ) : (
              <Image
                style={{ width: 80, height: 80 }}
                source={{ uri: target.image }}
              />
            )}
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
