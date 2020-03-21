import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import AppContainer from './src/utils/Navigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <AppContainer />
      </View>
    );
  }
}
