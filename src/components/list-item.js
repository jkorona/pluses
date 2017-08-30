import React, { Component } from 'react';
import ReactNative from 'react-native';
const { View, TouchableHighlight, Text, Image, StyleSheet } = ReactNative;

class ListItem extends Component {
	render() {
		return (
			<TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
				<View style={styles.li}>
					<Text style={styles.liText}>{this.props.item.name}</Text>
					<View style={styles.grades} >
						<Text>
							<Image style={styles.icon} source={require('../img/plus-icon.png')} />
							{' '}
							{this.props.item.pluses || '0'}
						</Text>
						<Text>
							<Image style={styles.icon} source={require('../img/minus-icon.png')} />
							{' '}
							{this.props.item.minuses || '0'}
						</Text>
					</View>
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
		padding: 16
	},
	icon: {
		width: 9,
		height: 9
	},
	liText: {
		color: '#333',
		fontSize: 20
	},
});

export default ListItem;