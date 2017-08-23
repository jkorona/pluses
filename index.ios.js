import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './src/screens/login-screen';
import PersonsScreen from './src/screens/persons-screen';
import SettingsScreen from './src/screens/settings-screen';
import ScoresheetsScreen from './src/screens/scoresheets-screen';

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
  Scoresheets: {
    screen: ScoresheetsScreen
  }
};

const PlusesApp = StackNavigator(routes);

export default PlusesApp;

AppRegistry.registerComponent('pluses', () => PlusesApp);
