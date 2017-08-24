import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	Image,
	TouchableOpacity,
	AlertIOS
} from 'react-native';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation'
import { FormGroup, Select } from '../components';
import { GoogleSignin } from 'react-native-google-signin';
import FirebaseManager from '../utils/firebase-manager';

export default class SettingsScreen extends Component {

	state = {
		user: null
	};

	static navigationOptions = {
		title: 'Settings'
	};

	componentWillMount() {
		const firebase = FirebaseManager.instance();
		const googleUser = GoogleSignin.currentUser();

		firebase
			.query('users', googleUser.id)
			.then((response) => {
				let user = response;
				if (!user) {
					user = { currentScoresheet: '' };
					firebase.save('users', googleUser.id, user)
				}
				this.updateUser(user);
			});
	}

	updateUser(data) {
		this.setState({ ...this.state, ... { user: data } });
	}

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
		const googleUser = GoogleSignin.currentUser();
		return (
			<View style={styles.container}>
				<View style={styles.avatar}>
					<Image source={{ uri: googleUser.photo }}
						style={{ width: 100, height: 100, borderRadius: 50 }} />
				</View>
				<FormGroup label="First Name">
					<Text style={styles.text}>{googleUser.givenName}</Text>
				</FormGroup>
				<FormGroup label="Last Name">
					<Text style={styles.text}>{googleUser.familyName}</Text>
				</FormGroup>
				<FormGroup label="Email">
					<Text style={styles.text}>{googleUser.email}</Text>
				</FormGroup>
				<FormGroup label="Scoresheet">
					<TouchableOpacity onPress={() =>
						this.props.navigation.navigate('Scoresheets', { 
							userId: googleUser.id,
							onScoresheetChange: (currentScoresheet) => this.updateUser({ currentScoresheet })
						})}>
						<Text>
							{_.get(this.state, 'user.currentScoresheet') || 'Please add Scoresheet'}
						</Text>
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
