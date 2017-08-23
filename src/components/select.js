import React, { Component } from 'react';
import ReactNative from 'react-native';
import FormGroup from './form-group';

const { View, TouchableOpacity, Text, StyleSheet, Picker } = ReactNative;

class Select extends Component {

	state = {
		listVisible: false,
		selectedItem: null
	}

	setListVisible(visible) {
		this.setState({ listVisible: visible });
	}

	render() {
		return (
			<View style={styles.select}>
				<FormGroup label={this.props.label}>
					<TouchableOpacity style={styles.button} onPress={() => this.setListVisible(!this.state.listVisible)}>
						<Text style={!this.props.selectedValue ? styles.prompt : null}>
							{this.props.selectedValue || this.props.prompt}
						</Text>
					</TouchableOpacity>
				</FormGroup>
				{this.state.listVisible && (
					<Picker
						style={styles.list}
						selectedValue={this.props.selectedValue}
						onValueChange={this.props.onValueChange}>
						{this.props.dataSource.map((item) =>
							<Picker.Item key={item.value} label={item.label} value={item.value} />
						)}
					</Picker>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	select: {
		flex: 0
	},
	list: {
		backgroundColor: 'powderblue'
	},
	prompt: {
		fontSize: 17,
		color: '#3B6A95'
	}
});

export default Select;