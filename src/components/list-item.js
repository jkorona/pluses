import React, { Component } from 'react';
import ReactNative from 'react-native';
import GradeButtons from './grade-buttons';

const { View, TouchableHighlight, Text, Image, StyleSheet } = ReactNative;

class ListItem extends Component {
	render() {
		return (
			<TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
				<View style={styles.li}>
					<Text style={styles.liText}>{this.props.item.name}</Text>
					<GradeButtons 
						onPress={this.props.onGradeChange}
						editable={this.props.editable}
						pluses={this.props.item.pluses}
						minuses={this.props.item.minuses} >
					</GradeButtons>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	li: {

		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		backgroundColor: '#fff',
		borderBottomColor: '#eee',
		borderColor: 'transparent',

		borderWidth: 1,
		paddingLeft: 16
	},
	liText: {
		color: '#333',
		fontSize: 20
	},
});

export default ListItem;