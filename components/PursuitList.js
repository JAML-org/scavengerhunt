import React from 'react';
import styles, { colors } from './style';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Icon, Text, Divider } from 'react-native-elements';
import * as firebase from 'firebase';

//Abstract mapping of hunts into it's own component
const dummyData = [
  { id: 1, icon: 'spray', name: 'Grafitti' },
  { id: 2, icon: 'food-variant', name: 'Famous Eats' },
  { id: 3, icon: 'guitar-electric', name: 'Music' },
  { id: 4, icon: 'flower', name: 'Green Spaces' },
  { id: 5, icon: 'book-open-page-variant', name: 'Libraries' },
  { id: 6, icon: 'church', name: 'Churches' },
  { id: 7, icon: 'filmstrip', name: 'Film Locations' },
  { id: 8, icon: 'bridge', name: 'Land Marks' },
  { id: 9, icon: 'elephant', name: 'Bronx Zoo' },
  { id: 10, icon: 'microphone-variant', name: 'Comedy Club' },
];

class PursuitList extends React.Component {
  constructor() {
    super();
    this.state = {
      hunts: {},
    };
  }

  async componentDidMount() {
    try {
      let response = await firebase.database().ref('/Hunts');
      let snapshot = await response.once('value');
      this.setState({
        hunts: snapshot.val(),
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { hunts } = this.state;
    return (
      <ImageBackground
        source={require('../urban-pursuit-leaf-bg.jpg')}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <View style={{ width: '100%', height: '10%' }}>
              <Text h3 style={styles.header}>
                CHOOSE A PURSUIT
              </Text>
              <Divider />
            </View>
            {Object.keys(hunts).map(hunt => {
              return (
                <View key={hunt}>
                  <Icon
                    raised
                    name={hunts[hunt].icon}
                    type={hunts[hunt].type}
                    size={40}
                    onPress={() =>
                      navigate('HuntDetails', {
                        hunt: hunts[hunt],
                        huntName: hunt,
                        huntLocationsID: hunts[hunt].locations2,
                      })
                    }
                  />
                  <Text style={styles.textCenter}>{hunt.toUpperCase()}</Text>
                </View>
              );
            })}
            {dummyData.map(dummy => {
              return (
                <View key={dummy.id}>
                  <Icon
                    raised
                    size={40}
                    name={dummy.icon}
                    type="material-community"
                    style={styles.btn}
                  />
                  <Text style={styles.textCenter}>{dummy.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default PursuitList;
