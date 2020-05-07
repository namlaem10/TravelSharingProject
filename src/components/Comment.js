import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.Userinfo}>
          <Image
            source={data.image}
            style={{
              width: EStyleSheet.value('35rem'),
              height: EStyleSheet.value('35rem'),
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              marginLeft: EStyleSheet.value('5rem'),
              marginBottom: EStyleSheet.value('5rem'),
            }}>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.medium,
              }}>
              {data.username}
            </Text>
            <Text
              style={{
                fontSize: EStyleSheet.value('12rem'),
                fontFamily: constants.Fonts.light,
              }}>
              {data.date}
            </Text>
          </View>
        </View>
        <View style={styles.comment}>
          <Text
            style={{
              fontSize: EStyleSheet.value('14rem'),
              fontFamily: constants.Fonts.light,
              marginLeft: EStyleSheet.value('5rem'),
            }}>
            {data.comment}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    marginVertical: '10rem',
    flexDirection: 'column',
  },
  Userinfo: {
    flexDirection: 'row',
  },
});
