import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {BASE_URL} from '../services/URL';

export default class MemberScrollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data, count} = this.props;
    let avatar = data.avatar;
    if (avatar !== null) {
      avatar = BASE_URL + '/' + avatar;
    }
    if (count === 0) {
      return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image
              source={
                avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
              }
              style={{
                width: EStyleSheet.value('50rem'),
                height: EStyleSheet.value('50rem'),
                borderRadius: EStyleSheet.value('25rem'),
              }}
            />
            <Image
              source={constants.Images.IC_LEADER}
              style={{
                width: EStyleSheet.value('20rem'),
                height: EStyleSheet.value('20rem'),
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              fontSize: EStyleSheet.value('14rem'),
              marginVertical: EStyleSheet.value('5rem'),
              fontFamily: constants.Fonts.regular,
            }}>
            {data.display_name}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image
              source={
                avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
              }
              style={{
                width: EStyleSheet.value('50rem'),
                height: EStyleSheet.value('50rem'),
                borderRadius: EStyleSheet.value('25rem'),
              }}
            />
          </View>
          <Text
            style={{
              fontSize: EStyleSheet.value('14rem'),
              marginVertical: EStyleSheet.value('5rem'),
              fontFamily: constants.Fonts.regular,
            }}>
            {data.display_name}
          </Text>
        </View>
      );
    }
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10rem',
    marginTop: '10rem',
    width: '120rem',
    height: '80rem',
  },
});
