import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './style';

const Main = props => {
  const { navigate } = props.navigation;
  return (
    <ImageBackground
      source={require('../urban-pursuit-leaf-bg.jpg')}
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View style={mainStyling.column}>
          <TouchableOpacity
            style={[styles.btn, mainStyling.row]}
            onPress={() => navigate('JoinHunt')}
          >
            <Text style={styles.btnText}>Join a hunt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, mainStyling.row]}
            onPress={() => navigate('PursuitList')}
          >
            <Text style={styles.btnText}>Choose a hunt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, mainStyling.row]}
            onPress={() => navigate('MyHuntList')}
          >
            <Text style={styles.btnText}>My Hunt list</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const mainStyling = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  row: {
    marginVertical: 10,
  },
});

export default Main;
