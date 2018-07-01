import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-elements';
import styles from './style';

const SplashScreen = props => {
  const { navigate } = props.navigation;
  return (
    <ImageBackground
      source={require('../urban-pursuit-splash.jpg')}
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View style={splashStyling.bottom}>
          <TouchableOpacity
            style={[styles.btn, splashStyling.btn]}
            onPress={() => navigate('UserLogin')}
          >
            <Text h4 style={styles.btnText}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, splashStyling.btn]}
            onPress={() => navigate('SignUp')}
          >
            <Text h4 style={styles.btnText}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const splashStyling = StyleSheet.create({
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  btn: {
    marginVertical: 20,
  },
});

export default SplashScreen;
