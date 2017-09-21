import React, { Component } from 'react';
import ReactNative from 'react-native';
const { View, Text, Image, TouchableOpacity, StyleSheet } = ReactNative;

function wrapIfEditable(editable, onPress, content) {
	return editable ? (
		<TouchableOpacity underlayColor="#c6c6c6" onPress={onPress}>
			{content}
		</TouchableOpacity>
	) : content;
}

const GradeButton = ({ image, text, color, onPress, editable }) =>
	wrapIfEditable(editable, onPress, (
		<View style={[styles.button, { borderColor: editable ? color : 'transparent' }]}>
			<Image style={styles.icon} source={image} />
			<Text>{text || '0'}</Text>
		</View>
	));

const GradeButtons = ({ pluses, minuses, onPress = () => { }, editable = true }) => (
	<View>
		<GradeButton text={pluses} onPress={() => onPress(1)}
			image={require('../img/plus-icon.png')} color="green"
			editable={editable} />
		<GradeButton text={minuses} onPress={() => onPress(-1)}
			image={require('../img/minus-icon.png')} color="red"
			editable={editable} />
	</View>
);

const styles = StyleSheet.create({
	button: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderWidth: 2
	},
	icon: {
		width: 9,
		height: 9
	},
});


export default GradeButtons;