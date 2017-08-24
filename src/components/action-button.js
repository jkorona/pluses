import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

class ActionButton extends Component {
	render() {
		return (
			<TouchableOpacity
				style={[styles.actionButton, this.props.style]}
				onPress={this.props.onPress}>
				<View style={styles.buttonContent}>
					<Image source={this.props.image} />
					<Text style={styles.buttonText}>{this.props.title}</Text>
				</View>
			</TouchableOpacity >
		);
	}
};

const styles = StyleSheet.create({
	actionButton: {
		backgroundColor: 'darkgreen',
		borderRadius: 10,
		padding: 5,
		margin: 5,
		height: 40,

		borderWidth: 1,
		borderColor: 'green'
	},
	buttonContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontWeight: 'bold'
	}
});

export default ActionButton;
