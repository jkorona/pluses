import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	AlertIOS
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import FirebaseManager from '../utils/firebase-manager';
import CONFIG from '../config';

export default class LoginScreen extends Component {

	componentWillMount() {
		this.configureGoogle(CONFIG.google.clientId)
	}

	configureGoogle(clientId) {
		GoogleSignin.configure({ iosClientId: clientId })
			.then(() => GoogleSignin.currentUserAsync())
			.then(user => user && this.whenSignedIn(user))
			.catch(this.whenErrorOcurred);
	}

	signIn() {
		GoogleSignin.signIn()
			.then(this.whenSignedIn.bind(this))
			.catch(this.whenErrorOcurred);
	}

	whenSignedIn(user) {
		const { navigate } = this.props.navigation;

		FirebaseManager.instance().authenticate(user.idToken)
			.then(() => navigate('Persons'))
			.catch(this.whenErrorOcurred);
	}

	whenErrorOcurred(error) {
		AlertIOS.alert('Error', `Encoutered following error: ${error.message}`);
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
