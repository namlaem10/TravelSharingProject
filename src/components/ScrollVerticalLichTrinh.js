import React, {Component} from 'react';
import {View, Text} from 'react-native';

import * as contains from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ScrollView} from 'react-native-gesture-handler';

export default class ScrollVerticalLichTrinh extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> ScrollVerticalLichTrinh </Text>
        <ScrollView horizontal={true}>
          <View style={styles.scrollViewContent}>
            <Text>Hello</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'red',
    height: '200rem',
  },
  scrollViewContent: {
    backgroundColor: 'blue',
    width: '1000rem',
    height: '190rem',
  },
});
