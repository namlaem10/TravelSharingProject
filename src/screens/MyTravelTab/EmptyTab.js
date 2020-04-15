import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class EmptyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusText: null,
    };
  }
  UNSAFE_componentWillMount() {
    const {status} = this.props;
    let statusText = '';
    if (status === 1) {
      statusText = 'sắp';
    } else if (status === 2) {
      statusText = 'đang';
    } else {
      statusText = 'đã';
    }
    this.setState({statusText});
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   console.log('WillReceive', nextProps);
  // }
  render() {
    const {statusText} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={constants.Images.IMAGE_EMPTY_TAB}
          style={{
            width: EStyleSheet.value('250rem'),
            height: EStyleSheet.value('250rem'),
          }}
        />
        <Text>Bạn không có lịch trình nào {statusText} diễn ra</Text>
        <TouchableOpacity
          style={styles.confirmButton}
          // onPress={() => this.onPressConfirm()}
        >
          <Text
            style={{
              fontSize: EStyleSheet.value('15rem'),
              fontFamily: constants.Fonts.medium,
              color: 'white',
            }}>
            Tạo lịch trình ngay
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  confirmButton: {
    width: '300rem',
    height: '35rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
