import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	AlertIOS
} from 'react-native';

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import CONFIG from '../config';

export default class LoginScreen extends Component {

	componentWillMount() {
		this.configureGoogle(CONFIG.googleClientId)
	}

	configureGoogle(clientId) {
		GoogleSignin.configure({ iosClientId: clientId })
			.then(() => GoogleSignin.currentUserAsync())
			.then(user => user && this.whenSignedIn(user));
	}

	signIn() {
		GoogleSignin.signIn().then(this.whenSignedIn.bind(this));
	}

	whenSignedIn(user) {
		AlertIOS.alert("User logged in", user.name);
	}

	render() {
		return (
			<View style={styles.container}>
				<GoogleSigninButton
					style={{ width: 312, height: 48 }}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={() => this.signIn()} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'steelblue',
	}
});
