import React, { Component } from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity, Alert, ScrollView } from 'react-native';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section:any) => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = (section:any) => {
    return (
      <View>
        <Text >{section.title}</Text>
      </View>
    );
  };

  _renderContent = (section:any) => {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = (activeSections:any) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}