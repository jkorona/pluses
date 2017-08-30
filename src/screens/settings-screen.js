import _ from 'lodash';
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
import { NavigationActions } from 'react-navigation'
import { FormGroup, Select } from '../components';
import { GoogleSignin } from 'react-native-google-signin';
import FirebaseManager from '../utils/firebase-manager';

function navButton(label, clickHandler, enabled = true) {
	return (
		<Button title={label} disabled={!enabled} onPress={clickHandler} />
	);
}

export default class SettingsScreen extends Component {

	state = {
		user: null
	};

	static navigationOptions = ({ navigation }) => {
		const { registration, user } = _.get(navigation, 'state.params', {});

		let headerRight;
		let headerLeft;

		let logoutButton = navButton('Logout', () => SettingsScreen.signOut(navigation));

		if (registration) {
			headerRight = navButton('Done', () => navigation.navigate('Persons', {
				scoresheetId: user.currentScoresheet
			}), !!user);

			headerLeft = logoutButton;
		} else {
			headerRight = logoutButton;
		}

		return {
			title: 'Settings',
			headerRight,
			headerLeft
		}
	};

	static signOut(navigation) {

		function resetNavState() {
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: 'Login' })
				]
			});
			navigation.dispatch(resetAction);
		}

		GoogleSignin.signOut()
			.then(() => GoogleSignin.revokeAccess())
			.then(() => FirebaseManager.instance().logout())
			.then(() => resetNavState());
	}

	componentWillMount() {
		const firebase = FirebaseManager.instance();
		const googleUser = GoogleSignin.currentUser();

		firebase
			.query('users').byId(googleUser.id)
			.then((response) => {
				let user = response;
				if (!user) {
					user = {
						id: googleUser.id,
						currentScoresheet: ''
					};
					firebase.save('users', user.id, user);
				}
				this.updateUser(user);
			});
	}

	updateUser(data) {
		this.setState({ ...this.state, ... { user: data } });
	}

	onScoresheetChange(currentScoresheet) {
		this.updateUser({ currentScoresheet });
		this.props.navigation.setParams({
			registration: true,
			user: this.state.user
		});
	}

	render() {
		const googleUser = GoogleSignin.currentUser();
		return (
			<View style={styles.container}>
				<View style={styles.avatar}>
					<Image source={{ uri: googleUser.photo }}
						style={styles.avatarImage} />
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
							scoresheetName: _.get(this.state, 'user.currentScoresheet'),
							onScoresheetChange: this.onScoresheetChange.bind(this)
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
	},
	avatarImage: {
		width: 100,
		height: 100,
		borderRadius: 50
	}
});
