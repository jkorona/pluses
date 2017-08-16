import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import LoginScreen from './src/screens/login-screen';

export default class PlusesApp extends Component {
  render() {
    return (
      <LoginScreen />
    );
  }
}

AppRegistry.registerComponent('pluses', () => PlusesApp);
