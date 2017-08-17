import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import * as firebase from 'firebase';

import LoginScreen from './src/screens/login-screen';
import PersonsScreen from './src/screens/persons-screen';
import SettingsScreen from './src/screens/settings-screen';

import CONFIG from './src/config';

const firebaseConnection = firebase.initializeApp(CONFIG.firebase);

const routes = {
  Login: {
    screen: LoginScreen
  },
  Persons: {
    screen: PersonsScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
};

const navigatorConfig = {
  initialRouteParams: {
    firebaseConnection
  }
};

const PlusesApp = StackNavigator(routes, navigatorConfig);

export default PlusesApp;

AppRegistry.registerComponent('pluses', () => PlusesApp);
