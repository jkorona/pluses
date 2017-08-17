import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ListView
} from 'react-native';

import ListItem from '../components/list-item';

export default class PersonsScreen extends Component {

	static navigationOptions = {
		title: 'Persons',
		headerLeft: null
	};

	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			})
		};

		const { state } = this.props.navigation;
		const { firebaseConnection } = state.params;
		
		this.itemsRef = firebaseConnection.database().ref();
	}

	componentDidMount() {
		this._listenForItems(this.itemsRef);
	}

	_listenForItems(itemsRef) {
		itemsRef.on('value', (snap) => {
			var items = [];
			snap.forEach((child) => {
				items.push({
					title: child.val().title,
					_key: child.key
				});
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items)
			});
		});
	}

	_renderItem(item) {
		const onPress = () => { };

		return (
			<ListItem item={item} onPress={onPress} />
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listview} />
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
