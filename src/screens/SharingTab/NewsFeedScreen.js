import React, {Component} from 'react';
import {View, Text, Platform, StatusBar} from 'react-native';

export default class NewsFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <Text> NewsFeed </Text>
      </View>
    );
  }
}
