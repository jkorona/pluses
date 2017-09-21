import _ from 'lodash';
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Button,
	AlertIOS
} from 'react-native';

import ListItem from '../components/list-item';
import ImageButton from '../components/image-button';

import FirebaseManager from '../utils/firebase-manager';

export default class CategoriesScreen extends Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Categories',
			headerRight: (
				<ImageButton
					source={require('../img/settings-icon.png')}
					onPress={() => navigation.navigate('Settings')}
				/>
			)
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			})
		};
	}

	componentDidMount() {
		const categories = _.get(this.props, 'navigation.state.params.categories');
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(categories)
		});
	}

	_renderItem(item) {
		const onPress = (value) => {
			AlertIOS.prompt(
				'Add Grade',
				'You\'re going to add new grade. Please provide optional comment.',
				[
					{ text: 'Cancel' },
					{
						text: 'OK', onPress: comment => {
							const grade = {
								value,
								comment,
								categoryId: item.$id,
								timestamp: Date.now()
							}
							FirebaseManager.instance().add('grades', grade);
						}
					},
				],
				'plain-text'
			);
		};

		return (
			<ListItem item={item} onGradeChange={onPress} onPress={() => { }} />
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderItem.bind(this)}
					style={styles.listview} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'steelblue',
	},
	listview: {
		flex: 1,
	}
});
