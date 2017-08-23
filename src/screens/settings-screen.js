import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	Image,
	TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { GoogleSignin } from 'react-native-google-signin';

import { FormGroup, Select } from '../components';

export default class SettingsScreen extends Component {

	constructor(props) {
		super(props);

		this.state = { language: 'java' };
	}

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
		const user = GoogleSignin.currentUser();

		return (
			<View style={styles.container}>
				<View style={styles.avatar}>
					<Image source={{ uri: user.photo }}
						style={{ width: 100, height: 100, borderRadius: 50 }} />
				</View>
				<FormGroup label="First Name">
					<Text style={styles.text}>{user.givenName}</Text>
				</FormGroup>
				<FormGroup label="Last Name">
					<Text style={styles.text}>{user.familyName}</Text>
				</FormGroup>
				<FormGroup label="Email">
					<Text style={styles.text}>{user.email}</Text>
				</FormGroup>
				<FormGroup label="Scoresheet">
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Scoresheets')}>
						<Text>Test</Text>
					</TouchableOpacity>
				</FormGroup>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'steelblue',
		flex: 1
	},
	avatar: {
		alignItems: 'center',
		margin: 20
	}
});
