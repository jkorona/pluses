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

  state = {
    mode: 'new',
    scoresheetName: null
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
          dataSource={[
            { label: 'Foo', value: 'foo' },
            { label: 'Bar', value: 'bar' },
            { label: 'Baz', value: 'baz' }
          ]}
        >
        </Select>
      </View>
    )
  }

  isValid() {
    const result = !_.isEmpty(this.state.scoresheetName)
    this.setState({
      ...this.state,
      errorMessage: result ? '' : 'You have to select current scoresheet.'
    });

    return result;
  }

  async saveScoresheet() {
    if (this.isValid()) {
      const db = FirebaseManager.instance();
      const params = _.get(this.props, 'navigation.state.params');

      if (this.state.mode === 'new') {
        await db.add('scoresheets', { name: this.state.scoresheetName });
      }

      await db.update('users', `${params.userId}/currentScoresheet`, this.state.scoresheetName)

      params.onScoresheetChange(this.state.scoresheetName);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FormHeader text="Please decide whether you'd like to create new Scoresheet or select on of already existing." />
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
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
  }
});

export default ScoresheetScreen;
