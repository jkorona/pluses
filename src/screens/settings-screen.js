import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Text,
	Button,
	AlertIOS
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { GoogleSignin } from 'react-native-google-signin';

export default class SettingsScreen extends Component {

	static navigationOptions = {
		title: 'Settings'
	};

	signOut() {
		GoogleSignin.signOut()
			.then(() => GoogleSignin.revokeAccess())
			.then(() => {
				const resetAction = NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: 'Login' })
					]
				});
				this.props.navigation.dispatch(resetAction);
			});
	}

	render() {
		const { state } = this.props.navigation;
		const { user } = state.params;

		return (
			<View style={styles.container}>
				<View style={styles.innerContainer}>
					<Text>You are logged in as {user.name}</Text>
				</View>
				<Button title="Logout" onPress={() => this.signOut()} color="#000000" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'steelblue',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	innerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});
