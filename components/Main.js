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
            onPress={() => navigate('JoinPursuit')}
          >
            <Text style={styles.btnText}>JOIN A PURSUIT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, mainStyling.row]}
            onPress={() => navigate('PursuitList')}
          >
            <Text style={styles.btnText}>CHOOSE A PURSUIT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, mainStyling.row]}
            onPress={() => navigate('MyPursuitList')}
          >
            <Text style={styles.btnText}>MY PURSUIT LIST</Text>
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
