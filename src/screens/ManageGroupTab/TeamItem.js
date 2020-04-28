import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {BASE_URL} from '../../services/URL';
import moment from 'moment';
export default class TeamItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {onPress, data} = this.props;
    let background = null;
    if (data.background != null) {
      background = BASE_URL + '/' + data.background;
    }
    let member = data.member.length;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onPress(data)}>
        <View style={styles.card}>
          <View style={{position: 'absolute', right: 5, bottom: 2}}>
            <Text
              style={{
                ...styles.text,
                fontSize: EStyleSheet.value('9rem'),
                color: '#1161D8',
              }}>
              Xem chi tiết
            </Text>
          </View>
          <View style={styles.picture}>
            <Image
              source={
                background !== null
                  ? {uri: background}
                  : require('../../assets/images/dalat2.jpg')
              }
              style={{
                width: EStyleSheet.value('85rem'),
                height: EStyleSheet.value('85rem'),
                borderTopLeftRadius: EStyleSheet.value('5rem'),
                borderBottomLeftRadius: EStyleSheet.value('5rem'),
              }}
            />
          </View>
          <View style={styles.infomation}>
            <Text
              style={{
                ...styles.text,
                fontSize: EStyleSheet.value('15rem'),
                fontFamily: constants.Fonts.medium,
              }}>
              {data.departure.destination_name}&nbsp;-&nbsp;
              {data.destination.destination_name}
            </Text>
            <Text
              style={{
                ...styles.text,
                ...styles.subText,
                fontSize: EStyleSheet.value('13rem'),
              }}>
              {moment(data.start_day).format('DD/MM/YYYY')}&nbsp;-&nbsp;
              {moment(data.end_day).format('DD/MM/YYYY')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...styles.text, ...styles.subText}}>
                Nhóm trưởng:&nbsp;
              </Text>
              <Text
                style={{
                  ...styles.text,
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('11rem'),
                  color: 'black',
                }}>
                {data.create_by.display_name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...styles.text, ...styles.subText}}>
                Số lượng t/viên:&nbsp;
              </Text>
              <Text
                style={{
                  ...styles.text,
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('11rem'),
                  color: 'black',
                }}>
                {member} người
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    marginVertical: '15rem',
    borderRadius: '5rem',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: '5rem',
    },
    shadowOpacity: 0.25,
    shadowRadius: '4rem',

    elevation: '7rem',
  },
  text: {
    letterSpacing: '1.5rem',
  },
  subText: {
    fontFamily: constants.Fonts.light,
    fontSize: '11rem',
    color: '#686868',
  },
  card: {
    backgroundColor: 'white',
    height: '85rem',
    width: '100%',
    borderRadius: '5rem',
    flexDirection: 'row',
  },
  picture: {
    width: '25%',
    height: '100%',
  },
  infomation: {
    width: '75%',
    height: '85rem',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: '5rem',
  },
});
