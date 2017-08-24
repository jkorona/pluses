import React, { Component } from 'react';
import ReactNative from 'react-native';
const { View, TouchableOpacity, Image, StyleSheet } = ReactNative;

class ImageButton extends Component {
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress} 
				style={styles.button}>
				<Image
					style={styles.image}
					source={this.props.source}
				/>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		width: 48,
		height: 48,
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 8,
		paddingBottom: 8
	},
	image: {
		width: 32,
		height: 32,
	}
});

export default ImageButton;