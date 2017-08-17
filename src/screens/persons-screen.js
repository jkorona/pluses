import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

export default class PersonsScreen extends Component {

	static navigationOptions = {
		title: 'Persons',
		headerLeft: null
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Hello World</Text>
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
