import React from 'react';
import { Text, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements';


const GameButton = (props) => {

  return (
    <View>
      <Icon
        name={props.iconName}
        color="black"
        reverse
        type="material-community"
        style={styles.btn}
        onPress={props.onPress}
      />
      <Text>{props.buttonName}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3B5998',
    color: 'white',
    padding: 10,
  },
})

export default GameButton

