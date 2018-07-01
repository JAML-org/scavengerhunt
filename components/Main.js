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
            onPress={() => navigate('HuntList')}
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

// const styles = StyleSheet.create({
//   main: {
//     alignSelf: 'stretch',
//   },
//   textinput: {
//     alignSelf: 'stretch',
//     height: 40,
//     marginBottom: 30,
//     color: 'black',
//     borderBottomColor: '#f8f8f8',
//     borderBottomWidth: 1,
//   },
//   button: {
//     alignSelf: 'stretch',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#59cbbd',
//     marginTop: 30,
//   },
//   btntext: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

export default Main;
