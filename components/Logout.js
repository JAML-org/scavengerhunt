import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { Text, Icon, Divider } from 'react-native-elements';
import styles, { colors } from './style';

export default class Logout extends Component {
  
    async logoutInFirebase() {
        await firebase
        .auth()
        .signOut()
        .then(() => {
            const logged = firebase.auth().currentUser
            this.props.navigation.navigate('SplashScreen')
          console.log("YOU ARE LOGGED OUT! YAYY!", this.props.navigation)
        })
        .catch(function(error) {
              console.error(error)
        }) 
    }

    render() {
        return (
            <View style={styles.container}> 
                <View style= {styles.logoutView}> 
                <Text h4>
                    Are you sure you want to log out?
                </Text> 
                </View>
                <TouchableOpacity
                style={styles.btn}
                onPress={ () => this.logoutInFirebase() }
                >
                <Text h4 style={styles.btnText}>
                    Log Out
                </Text>
                </TouchableOpacity>

            </View> 
            
        )
    }
    
}
