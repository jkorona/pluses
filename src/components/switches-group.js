import React, { Component } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';

import FormGroup from './form-group';

class SwitchesGroup extends Component {

	isSelected(value) {
		return this.props.selectedValue === value;
	}

	triggerChange(newValue) {
		this.props.onValueChange(newValue);
	}

	render() {
		return (
			<View>
				{this.props.dataSource.map(({ label, value }) => (
					<FormGroup label={label} key={value}>
						<Switch
							value={this.isSelected(value)}
							onValueChange={() => this.triggerChange(value)}>
						</Switch>
					</FormGroup>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {}
});

export default SwitchesGroup;
