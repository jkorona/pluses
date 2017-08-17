import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginScreen from './src/screens/login-screen';
import PersonsScreen from './src/screens/persons-screen';

const PlusesApp = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Persons: {
    screen: PersonsScreen,
  },
});

export default PlusesApp;

AppRegistry.registerComponent('pluses', () => PlusesApp);
