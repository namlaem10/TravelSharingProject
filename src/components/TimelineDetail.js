import React, {Component} from 'react';
import {View, Text} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class TimelineDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello </Text>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});
