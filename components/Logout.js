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
        const log = await firebase.auth().currentUser
        console.log("YOU ARE Signed in!", log.uid)

        await firebase
        .auth()
        .signOut()
        .then(() => {
            this.props.navigation.navigate('LoggedInStack');
            const logged = firebase.auth().currentUser

          console.log("YOU ARE LOGGED OUT! YAYY!", logged)
        })
        .catch(function(error) {
              console.error(error)
        }) 
    }

    render() {
        return (
            <View style={styles.container}> 
                <View > 
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
