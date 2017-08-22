import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

class FormGroup extends Component {

	render() {
		return (
			<View style={styles.formGroup}>
				 <Text style={styles.label}>{this.props.label}</Text>
				{this.props.children} 
			</View>
		);
	}

}

const styles = StyleSheet.create({
	formGroup: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,

		borderBottomWidth: 0.5,
		paddingLeft: 10,
		paddingRight: 10,
		borderBottomColor: 'darkgrey'
	},
	label: {
		fontWeight: 'bold'
	}
});

export default FormGroup;