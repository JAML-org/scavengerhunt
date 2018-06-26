import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


const styles = StyleSheet.create({
  regform: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: 'black',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default class Profile extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <View>
        <View>
          <View>
            <Avatar/>
            <Button/>
          </View>

          <View>
            <Text>Username</Text>
            <Text>Completed Hunt: 3</Text>
            <Text>Hunts Won: 1</Text>
          </View>

        </View>

        <View>
          
        </View>
      </View>
    )
  }
}
