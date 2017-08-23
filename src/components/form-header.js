import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

class FormHeader extends Component {

	render() {
		return (
			<View style={styles.formHeader}>
				 <Text style={styles.text}>{this.props.text}</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	formHeader: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 50,

		backgroundColor: 'cornflowerblue'
	},
	text: {
		margin: 10,
		color: 'white'
	}
});

export default FormHeader;