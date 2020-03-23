import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import * as contains from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: contains.WIDTH / 380});
export default class TitleBarCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {title} = this.props;
    if (!title) {
      return (
        <View style={styles.container}>
          <Image style={styles.icon} source={contains.Images.IC_ARROW_BACK} />
          <Image style={styles.icon} source={contains.Images.IC_3DOT} />
        </View>
      );
    } else {
      return (
        <View style={styles.container2}>
          <Image
            style={styles.icon}
            source={contains.Images.IC_ARROW_BACK_GREEN}
          />
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
  },
  text: {
    fontFamily: contains.Fonts.medium,
    fontSize: contains.FontSizes.header,
    marginLeft: '90rem',
  },
});
