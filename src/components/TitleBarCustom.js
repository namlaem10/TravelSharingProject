import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});
export default class TitleBarCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title, onPress, onPressMore} = this.props;
    if (!title) {
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => onPress()}>
            <Image
              style={styles.icon}
              source={constants.Images.IC_ARROW_BACK}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container2}>
          <TouchableOpacity>
            <Image
              style={styles.icon}
              source={constants.Images.IC_ARROW_BACK_GREEN}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
        </View>
      );
    }
  }
}

const styles = EStyleSheet.create({
  container: {
    height: '35rem',
    flexDirection: 'row',
    marginTop: '30rem',
    marginHorizontal: '10rem',
    justifyContent: 'space-between',
  },
  container2: {
    height: '35rem',
    flexDirection: 'row',
    marginTop: '30rem',
    marginHorizontal: '10rem',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    width: '24rem',
    height: '24rem',
    resizeMode: 'contain',
  },
  text: {
    fontFamily: constants.Fonts.medium,
    fontSize: constants.FontSizes.header,
    marginLeft: '90rem',
  },
});
