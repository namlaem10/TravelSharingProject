import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title, onPressBack} = this.props;
    return (
      <View style={styles.header}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'absolute',
            flexDirection: 'row',
            left: EStyleSheet.value('15rem'),
          }}>
          <TouchableOpacity onPress={() => onPressBack()}>
            <Image
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('20rem'),
                resizeMode: 'contain',
              }}
              source={constants.Images.IC_ARROW_BACK_GREEN}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: EStyleSheet.value('20rem'),
              fontFamily: constants.Fonts.regular,
              letterSpacing: 2,
            }}>
            {title}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  header: {
    width: '100%',
    height: '60rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
