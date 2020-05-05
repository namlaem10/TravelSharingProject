/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

import TimeLineItem from './TimeLineItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class TimelineDetailPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem() {
    let viewData = [];
    const {data, routeData, isGone, keyDay, action} = this.props;
    let count = 0;
    let hour = 8;
    let minute = 0;
    data.map(item => {
      let lastPlace = false;
      let timeText = '';
      if (count === data.length - 1) {
        lastPlace = true;
      }
      if (count > 0) {
        var secs = routeData.leg[count - 1].travelTime + 5400;
        let minutes = Math.floor(secs / 60);
        if (minutes > 60) {
          let hours = Math.floor(minutes / 60);
          hour += hours;
          minutes = minutes - hours * 60;
        }
        minute += minutes;
        if (minute > 60) {
          hour = hour + Math.floor(minute / 60);
          minute = minute - Math.floor(minute / 60) * 60;
        }
      }
      if (hour <= 24) {
        timeText = `${hour < 10 ? '0' + hour : hour}:${
          minute < 10 ? '0' + minute : minute
        }`;
      } else {
        timeText = 'Qua ngày';
      }

      viewData.push(
        <TimeLineItem
          data={item}
          timeText={timeText}
          key={count}
          lastPlace={lastPlace}
          route={count < routeData.leg.length ? routeData.leg[count] : null}
          isDelete={isGone ? false : true}
          onPressDeleteItem={this.props.onPressDeleteItem}
          keyDay={keyDay}
          isLeader={this.props.isLeader}
          action={action}
        />,
      );
      count++;
    });
    return viewData;
  }
  render() {
    const {day, onPressAddPlace, isGone, keyDay, isLeader, action} = this.props;
    return (
      <View style={isLeader ? styles.container : styles.containerSub}>
        <View style={styles.title}>
          <Text
            style={{
              ...styles.text,
              ...styles.titleText,
            }}>
            Ngày {day}
          </Text>
          {isGone ? null : isLeader || action === 'creating' ? (
            <TouchableOpacity onPress={() => onPressAddPlace(keyDay)}>
              <Text
                style={{
                  ...styles.titleText,
                  color: '#259CDF',
                }}>
                Thêm địa điểm
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView>
          <View style={styles.content}>{this._renderItem()}</View>
        </ScrollView>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    height: '420rem',
  },
  containerSub: {
    height: '470rem',
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
