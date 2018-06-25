import React from 'react';
import styles from './style';
import { View } from 'react-native';
import { Icon, Text, Divider, Button } from 'react-native-elements';

class HuntList extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <View style={{ width: '100%', height: '25%' }}>
            <Text h4 style={{ color: 'white' }}>
              Choose a Hunt
          </Text>
            <Divider />
          </View>
          <View>
            <Icon
              raised
              name="beer"
              type="material-community"
              size={40}
              onPress={() => navigate('HuntDetails')}
            />
            <Text style={styles.textCenter}>Bar Crawl</Text>
          </View>
          <View>
            <Icon
              reverse
              name="beer"
              color="#00aced"
              type="material-community"
              size={40}
            />
          </View>
          <View>
            <Icon raised name="beer" type="material-community" size={40} />
          </View>
          <View>
            <Icon raised name="beer" type="material-community" size={40} />
          </View>
          <View>
            <Icon reverse name="beer" type="material-community" size={40} />
          </View>
          <View>
            <Icon raised name="beer" type="material-community" size={40} />
          </View>
          <View style={styles.textListItem}>
            <Text style={[styles.textCenter, { fontSize: 18 }]}>Bar Crawl</Text>
          </View>
          <View style={styles.textListItem}>
            <Text style={[styles.textCenter, { fontSize: 18 }]}>Bar Crawl</Text>
          </View>
          <View style={styles.textListItem}>
            <Text style={[styles.textCenter, { fontSize: 18 }]}>Bar Crawl</Text>
          </View>
        </View>
      </View>
    );
  };
}

export default HuntList;
