/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

import TimeLineItem from './TimeLineItem';
import {TouchableOpacity} from 'react-native-gesture-handler';

//fakedata
const TimeLineItems = [
  {
    id: 'timeline1',
    time: '6:30',
  },
  {
    id: 'timeline2',
    time: '12:15',
  },
  {
    id: 'timeline3',
    time: '15:15',
  },
  {
    id: 'timeline4',
    time: '18:30',
  },
];

export default class TimelineDetailPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {day, onPressAddPlace} = this.props;
    const lastday = TimeLineItems.length;
    let checkLastday = 1;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{...styles.text, ...styles.titleText}}>Ngày {day} </Text>
          <TouchableOpacity onPress={() => onPressAddPlace()}>
            <Text style={{...styles.titleText, color: '#259CDF'}}>
              Thêm địa điểm
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.content}>
            {TimeLineItems.map((item) => {
              let lastDay = false;
              if (checkLastday === lastday) {
                lastDay = true;
              }
              checkLastday++;
              return (
                <TimeLineItem
                  data={item}
                  key={item.id}
                  lastDay={lastDay}
                  isDelete={true}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    height: '420rem',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5rem',
    marginHorizontal: '13rem',
  },
  text: {
    color: '#127138',
  },
  titleText: {
    fontSize: constants.FontSizes.regular,
  },
  content: {
    marginTop: '10rem',
    marginLeft: '13rem',
  },
});
