import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	AlertIOS,
	ActivityIndicator
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import FirebaseManager from '../utils/firebase-manager';
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
		const { navigate } = this.props.navigation;

		this.setState({ user });
		FirebaseManager.instance().authenticate(user.idToken)
			.then(() => navigate('Persons'))
			.catch(this.whenErrorOcurred);
	}

	whenErrorOcurred(error) {
		AlertIOS.alert('Error', `Encoutered following error: ${error.message}`);
	}

	render() {
		const { user, isLoading } = this.state;
		return (
			<View style={styles.container}>
				<Text>Welcome in</Text>
				<Text style={styles.appName}>Pluses</Text>
				{
					isLoading || user ?
						(
							<ActivityIndicator size="large" />
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
	},
	appName: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingTop: 10,
		paddingBottom: 30
	}
});
