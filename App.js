import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RegForm from './components/RegForm';
import Menu from './components/Menu'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
});

export const App = () => {
  return (
    <View style={styles.container}>
      <Menu />
      <RegForm />
    </View>
  );
}
