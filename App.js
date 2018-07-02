import React from 'react';
import { RootStack } from './router';

import {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DB_URL,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_STORAGEBUCKET,
} from './config';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DB_URL,
  projectId: REACT_APP_FIREBASE_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
};

firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;
const App = () => <RootStack />;

export default App;
