import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Text,
	Button,
	AlertIOS,
	Image,
	Picker
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
				<Select
					label="select"
					prompt="dddddupa"
					selectedValue={this.state.language}
					onValueChange={(newValue) => this.setState({ language: newValue })}
					dataSource={[
						{ label: 'Foo', value: 'foo' },
						{ label: 'Bar', value: 'bar' },
						{ label: 'Baz', value: 'baz' }
					]}
				>
				</Select>
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
