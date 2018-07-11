![logo] (https://github.com/JAML-org/urbanpursuit/blob/master/urban-pursuit-logo.jpg)

# Urban Pursuit

Urban Pursuit is a New York City based scavenger hunt app for your mobile phone. It comes with a variety of themed pursuits to choose from. We designed Urban Pursuit to allow players to invite each other to compete in pursuits, or play solo.

## Getting Started

Our mobile app was built using Firebase as the database and requires a config.js file in the root directory with the following format.

```
export const REACT_APP_FIREBASE_API_KEY = 'API_KEY';
export const REACT_APP_FIREBASE_AUTH_DOMAIN = 'AUTH_DOMAIN';
export const REACT_APP_FIREBASE_DB_URL = 'DB_URL';
export const REACT_APP_FIREBASE_PROJECTID = 'PROJECT_ID';
export const REACT_APP_STORAGEBUCKET = 'STORAGEBUCKET';
```

### Prerequisites

Node.js is required to run this app. Please go to [Node.js](https://nodejs.org/en/) for installation instructions.

Also, create an account with Firebase before getting started.
* Choose 'Add Firebase to your web app' to get the necessary credentials for the config.js file.
* Create a database in test mode.
* Make sure the database type is 'Realtime Database'.
* Turn on Email/Password as Sign-in provider under Authentication.

### Installing

Before running the app, please install Node.js. make sure to install all packages.

```
npm node -g
npm i
```

Using the firebase.json file provided in the root, import into your Firebase project.


## Built With

* [Node.js](https://nodejs.org/en/) - The server environment
* [React-Native](https://facebook.github.io/react-native/) - The mobile web framework used
* [Firebase](https://firebase.google.com/) - Real-time database
* [Expo](https://expo.io/) - Used to demo mobile app

## Authors

* [Angel Chen](https://github.com/angel-chen)
* [Jenny Gao](https://github.com/JennyG1023)
* [Linda Morales](https://github.com/lmorale4)
* [Molly Seeley](https://github.com/msseeley)

## Acknowledgments

* Graphic art created by [Shanley Sze](https://simplyshanley.weebly.com/)
* Thank you console.log()
