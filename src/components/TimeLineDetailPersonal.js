/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

import TimeLineItem from './TimeLineItem';
import DraggableFlatList from 'react-native-draggable-flatlist';

export default class TimelineDetailPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      routeData: null,
      isGone: false,
      keyDay: null,
      action: null,
      day: null,
      isLeader: false,
    };
  }
  count = 0;
  hour = 8;
  minute = 0;
  UNSAFE_componentWillReceiveProps(nextprops) {
    this.count = 0;
    this.hour = 8;
    this.minute = 0;
  }
  renderItem = ({item, index, drag = null, isActive = false}) => {
    const {data, routeData, isGone, keyDay, action, onPressRating} = this.props;
    if (this.count === data.length) {
      this.count = 0;
    }
    let lastPlace = false;
    let timeText = '';
    if (this.count === data.length - 1) {
      lastPlace = true;
    }
    if (this.count > 0) {
      if (routeData) {
        var secs = routeData.leg[this.count - 1].travelTime + 5400;
        let minutes = Math.floor(secs / 60);
        if (minutes > 60) {
          let hours = Math.floor(minutes / 60);
          this.hour += hours;
          minutes = minutes - hours * 60;
        }
        this.minute += minutes;
        if (this.minute > 60) {
          this.hour = this.hour + Math.floor(this.minute / 60);
          this.minute = this.minute - Math.floor(this.minute / 60) * 60;
        }
      }
    }
    if (this.hour <= 24) {
      timeText = `${this.hour < 10 ? '0' + this.hour : this.hour}:${
        this.minute < 10 ? '0' + this.minute : this.minute
      }`;
    } else {
      timeText = 'Qua ngày';
    }
    this.count++;
    return item ? (
      <TimeLineItem
        data={item}
        timeText={timeText}
        key={this.count - 1}
        lastPlace={lastPlace}
        route={
          routeData
            ? this.count - 1 < routeData.leg.length
              ? routeData.leg[this.count - 1]
              : null
            : null
        }
        isDelete={isGone ? false : true}
        onPressDeleteItem={this.props.onPressDeleteItem}
        keyDay={keyDay}
        isLeader={this.props.isLeader}
        action={action}
        onLongPress={drag}
        isActive={isActive}
        isGone={isGone}
        onPressRating={onPressRating}
      />
    ) : null;
  };
  render() {
    const {
      onPressAddPlace,
      onDragEnd,
      day,
      isGone,
      keyDay,
      isLeader,
      action,
      onPressMap,
      routeData,
      data,
    } = this.props;
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
          <TouchableOpacity onPress={() => onPressMap(routeData, data)}>
            <Text
              style={{
                ...styles.titleText,
                color: '#259CDF',
              }}>
              Bản đồ
            </Text>
          </TouchableOpacity>
          {isGone ? null : isLeader || action === 'creating' ? (
            <TouchableOpacity onPress={() => onPressAddPlace(keyDay)}>
              <Text
                style={{
                  ...styles.titleText,
                  color: '#259CDF',
                }}>
                Thêm điểm
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.content}>
          {isGone ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.data}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          ) : (
            // <Flatlist
            //   data={this.props.data}
            //   renderItem={this.renderItem}
            //   keyExtractor={(item, index) => item._id}
            // />
            <DraggableFlatList
              data={this.props.data}
              extraData={this.props}
              renderItem={this.renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `draggable-item-${item._id}`}
              onDragEnd={({data}) => {
                onDragEnd(data, keyDay);
              }}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  containerSub: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10rem',
    paddingHorizontal: '6.5rem',
  },
  text: {
    color: '#127138',
  },
  titleText: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.medium,
  },
  content: {
    paddingHorizontal: '6.5rem',
    flex: 1,
  },
});
