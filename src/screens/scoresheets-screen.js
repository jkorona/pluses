import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TextInput, View, Switch, StyleSheet, Button, Alert } from 'react-native';

import { SwitchesGroup, Select, FormGroup, FormHeader } from '../components';
import { ActionButton } from '../components';

import FirebaseManager from '../utils/firebase-manager';

class ScoresheetScreen extends Component {

  static navigationOptions = {
    title: 'Scoresheets',
    errorMessage: ''
  };

  db = FirebaseManager.instance();

  state = {
    mode: 'new',
    scoresheets: [],
    scoresheetName: null
  };

  componentWillMount() {
    const scoresheetName = _.get(this.props, 'navigation.state.params.scoresheetName');

    this.db.query('scoresheets').asList()
      .then((list) => {
        this.setState({
          ...this.state,
          scoresheets: list.map(item => ({ value: item.$id, label: item.name })),
          scoresheetName,
          mode: scoresheetName ? 'existing' : 'new'
        });
      });
  }

  renderScoresheetEditor(mode) {
    let editor;
    switch (mode) {
      case 'new':
        editor = this.renderNewSoresheetEditor();
        break;
      case 'existing':
        editor = this.renderExistingSoresheetEditor();
        break;
      default:
        editor = (<Text>No Editor Selected</Text>)
    }
    return editor;
  }

  renderNewSoresheetEditor() {
    return (
      <View>
        <FormGroup label="Scoresheet Name">
          <TextInput
            autoFocus={true}
            autoCapitalize="none"
            placeholder="Enter name of Scoresheet"
            onChangeText={(newValue) => this.setState({ scoresheetName: newValue })}
          >
          </TextInput>
        </FormGroup>
      </View>
    )
  }

  renderExistingSoresheetEditor() {
    return (
      <View>
        <Select
          label="Scoresheet Name"
          prompt="Select name of Scoresheet"
          selectedValue={this.state.scoresheetName}
          onValueChange={(newValue) => this.setState({ scoresheetName: newValue })}
          dataSource={this.state.scoresheets}
        >
        </Select>
      </View>
    )
  }

  isValid() {
    const value = this.state.scoresheetName;

    let result = !_.isEmpty(value)
    let errorMessage = '';

    if (!result) {
      errorMessage = 'You have to select current scoresheet.';
    } else if (this.state.mode === 'new') {
      result = !_.find(this.state.scoresheets, { value });
      if (!result) errorMessage = 'Name already taken, please choose different.';
    }

    this.setState({ ...this.state, errorMessage });

    return result;
  }

  async saveScoresheet() {
    if (this.isValid()) {
      const params = _.get(this.props, 'navigation.state.params');
      const scoresheetName = this.state.scoresheetName;

      if (this.state.mode === 'new') {
        await this.db.save('scoresheets', scoresheetName, {
          name: scoresheetName,
          owner: params.userId
        });
      }

      await this.db.update('users', `${params.userId}/currentScoresheet`, scoresheetName)

      params.onScoresheetChange(scoresheetName);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FormHeader
          text="Please decide whether you'd like to create new Scoresheet or select on of already existing." />
        <SwitchesGroup
          selectedValue={this.state.mode}
          onValueChange={(mode) => this.setState({ mode })}
          dataSource={[
            { label: 'Create new Scoresheet', value: 'new' },
            { label: 'Select existing Scoresheet', value: 'existing' }
          ]}>
        </SwitchesGroup>
        <FormHeader text="Scoresheet details" />
        {this.renderScoresheetEditor(this.state.mode)}
        {!!this.state.errorMessage && (
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        )}
        <View style={styles.controlBar}>
          <ActionButton
            title="Save"
            image={require('../img/success-icon.png')}
            onPress={() => this.saveScoresheet()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'steelblue',
    flex: 1
  },
  errorMessage: {
    padding: 10,
    fontSize: 16,
    color: 'red'
  },
  controlBar: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export default ScoresheetScreen;
