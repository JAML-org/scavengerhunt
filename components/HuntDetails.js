import React from 'react';
import styles from './style';
import { View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import { MapView } from 'expo';
import style from './style';

const HuntDetails = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text h1>Theme Name</Text>
      <Text h4>Location Name</Text>
      }}
      <MapView
        style={style.map}
        initialRegion={{
          latitude: 40.705076,
          longitude: -74.00916,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Text>
        Hunt Details Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Incidunt asperiores cumque nisi minus sit ab dolore quidem fugiat culpa
        officia ex, distinctio tempore, porro placeat, doloremque exercitationem
        aperiam tempora eos.
      </Text>
      <Text># of Targets</Text>
      <Button title="Choose Theme" onPress={() => navigate('HuntTargets')} />
    </View>
  );
};

export default HuntDetails;
