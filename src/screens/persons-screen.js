import _ from 'lodash';
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView,
	Button,
	AlertIOS
} from 'react-native';

import FirebaseManager from '../utils/firebase-manager';

import ListItem from '../components/list-item';
import ImageButton from '../components/image-button';

import scoresheetService from '../services/scoresheet-service';

export default class PersonsScreen extends Component {

	static navigationOptions = ({ navigation, screenProps }) => {
		return {
			title: 'Persons',
			headerLeft: null,
			headerRight: (
				<ImageButton
					source={require('../img/settings-icon.png')}
					onPress={() => navigation.navigate('Settings')}
				/>
			)
		}
	};

	db = FirebaseManager.instance();

	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			})
		};
	}

	componentDidMount() {
		const scoresheetId = _.get(this.props, 'navigation.state.params.scoresheetId');

		scoresheetService.loadScoresheet(scoresheetId)
			.then((scoresheet) => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(scoresheet.persons)
				});
			});
	}

	_renderItem(item) {
		const onPress = (person) => {
			this.props.navigation.navigate('Categories', { categories: person.categories })
		};

		return (
			<ListItem editable={false} item={item} onPress={onPress} />
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
