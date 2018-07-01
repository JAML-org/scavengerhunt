import React from 'react';
import styles from './style';
import { View, ImageBackground } from 'react-native';
import { Icon, Text, Divider, Button } from 'react-native-elements';
import * as firebase from 'firebase';

class HuntList extends React.Component {
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
            <View style={{ width: '100%', height: '25%' }}>
              <Text h4 style={{ color: 'white' }}>
                Choose a Hunt
              </Text>
              <Divider />
            </View>
            {Object.keys(hunts).map(hunt => {
              return (
                <View key={hunt}>
                  <Icon
                    raised
                    name={hunts[hunt].icon}
                    type="material-community"
                    size={40}
                    onPress={() =>
                      navigate('HuntDetails', {
                        hunt: hunts[hunt],
                        huntName: hunt,
                        huntLocationsID: hunts[hunt].locations,
                      })
                    }
                  />
                  <Text style={styles.textCenter}>{hunt}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default HuntList;
