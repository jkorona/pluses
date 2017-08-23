import React, { Component } from 'react';
import { Text, TextInput, View, Switch, StyleSheet } from 'react-native';

import { SwitchesGroup, Select, FormGroup, FormHeader } from '../components';

class ScoresheetScreen extends Component {

  static navigationOptions = {
    title: 'Scoresheets'
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

  render() {
    return (
      <View style={styles.container}>
        <FormHeader text="Select how you'd like enter Scoresheet"/>
        <SwitchesGroup
          selectedValue={this.state.mode}
          onValueChange={(mode) => this.setState({ mode })}
          dataSource={[
            { label: 'Create new Scoresheet', value: 'new' },
            { label: 'Select existing Scoresheet', value: 'existing' }
          ]}>
        </SwitchesGroup>
        <FormHeader text="Scoresheet details"/>
        {this.renderScoresheetEditor(this.state.mode)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'steelblue',
    flex: 1
  }
});

export default ScoresheetScreen;
