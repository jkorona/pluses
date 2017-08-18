import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	AlertIOS,
	ActivityIndicator
} from 'react-native';

import * as firebase from 'firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import CONFIG from '../config';

export default class LoginScreen extends Component {

	componentWillMount() {
		this.configureGoogle(CONFIG.google.clientId)
		this.state = {
			isLoading: false,
		}
	}

	configureGoogle(clientId) {
		const stopLoading = () => this.setState({ isLoading: false });

		this.setState({ isLoading: true });
		GoogleSignin.configure({ iosClientId: clientId })
			.then(() => GoogleSignin.currentUserAsync())
			.then(user => user && this.whenSignedIn(user))
			.catch(this.whenErrorOcurred)
			.then(stopLoading, stopLoading);
	}

	signIn() {
		GoogleSignin.signIn()
			.then(this.whenSignedIn.bind(this))
			.catch(this.whenErrorOcurred);
	}

	whenSignedIn(user) {
		const { state } = this.props.navigation;
		const { firebaseConnection } = state.params;

		this.setState({ user });

		var credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
		return firebaseConnection.auth().signInWithCredential(credential)
			.then(() => this.props.navigation.navigate('Persons', { firebaseConnection, user }))
			.catch(this.whenErrorOcurred);
	}

	whenErrorOcurred(error) {
		AlertIOS.alert('Error', `Encoutered following error: ${error.message}`);
	}

	render() {
		const { user, isLoading } = this.state;
		return (
			<View style={styles.container}>
				{
					isLoading || user ?
						(
							<ActivityIndicator animating={isLoading} size="large" />
						) :
						(
							<GoogleSigninButton
								style={{ width: 312, height: 48 }}
								size={GoogleSigninButton.Size.Wide}
								color={GoogleSigninButton.Color.Dark}
								onPress={() => this.signIn()} />
						)
				}
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
