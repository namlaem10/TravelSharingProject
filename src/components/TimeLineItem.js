import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import Dash from 'react-native-dash';

export default class TimeLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderInfo = () => {
    const {route, lastPlace} = this.props;
    var hours = 0;
    var minutes = 0;
    var textTime = '';
    var distance = 0;
    if (route !== null) {
      hours = 0;
      var secs = route.travelTime;
      minutes = Math.floor(secs / 60);
      if (minutes > 60) {
        hours = Math.floor(minutes / 60);
      }
      minutes = minutes - hours * 60;
      textTime = hours > 0 ? `${hours}h ${minutes}p` : `${minutes}p`;

      distance = Math.round((route.length / 1000) * 10 + Number.EPSILON) / 10;
    }
    if (!lastPlace) {
      return (
        <View
          style={{
            flexDirection: 'column',
            marginBottom: EStyleSheet.value('10rem'),
          }}>
          <View style={styles.detailTextView}>
            <Text
              style={{
                ...styles.detailText,
                ...styles.text,
              }}>
              T/g tham quan:
            </Text>
            <Text
              style={{
                ...styles.timeDetailText,
                ...styles.text,
              }}>
              1h 30p
            </Text>
          </View>
          <View style={styles.detailTextView}>
            <Text
              style={{
                ...styles.detailText,
                ...styles.text,
              }}>
              T/g di chuyển:
            </Text>
            <Text
              style={{
                ...styles.timeDetailText,
                ...styles.text,
              }}>
              {textTime}
            </Text>
          </View>
          <View style={styles.detailTextView}>
            <Text
              style={{
                ...styles.detailText,
                ...styles.text,
              }}>
              Khoảng cách:
            </Text>
            <Text
              style={{
                ...styles.timeDetailText,
                ...styles.text,
              }}>
              {distance} km
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            position: 'absolute',
            top: EStyleSheet.value('28rem'),
          }}>
          <View style={styles.detailTextView}>
            <Text
              style={{
                ...styles.detailText,
                ...styles.text,
              }}>
              T/g tham quan:
            </Text>
            <Text
              style={{
                ...styles.timeDetailText,
                ...styles.text,
              }}>
              1h 30p
            </Text>
          </View>
        </View>
      );
    }
  };
  render() {
    const {data, isDelete, timeText, onPressDeleteItem} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.Col1}>
          <View>
            <Text
              style={{
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('16rem'),
                color: '#127138',
              }}>
              {timeText}
            </Text>
          </View>
          {this.renderInfo()}
        </View>
        <View style={styles.Col2}>
          <Image
            source={constants.Images.IC_CAR}
            style={{
              height: EStyleSheet.value('30rem'),
              width: EStyleSheet.value('30rem'),
            }}
          />
          {this.props.lastPlace ? null : (
            <Dash
              style={{
                width: EStyleSheet.value('1rem'),
                height: EStyleSheet.value('72rem'),
                flexDirection: 'column',
              }}
              dashGap={4}
              dashLength={7}
              dashThickness={0.8}
              dashColor={'#34DC78'}
            />
          )}
        </View>
        <View style={styles.Col3}>
          <View style={styles.pictureView}>
            <Image
              source={{
                uri: data.place_visit_image,
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: EStyleSheet.value('20rem'),
              }}
            />
            {isDelete ? (
              <View style={styles.deleteButtonGroup}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onPressDeleteItem(data)}>
                  <Text style={{color: 'white'}}>Xóa</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'column',
              width: EStyleSheet.value('105rem'),
              marginLeft: EStyleSheet.value('10rem'),
            }}>
            <Text
              style={{
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('16rem'),
                color: '#127138',
                marginBottom: EStyleSheet.value('3rem'),
              }}>
              {data.place_visit_name}
            </Text>
            <Text style={{...styles.detailText}}>
              {data.place_visit_address}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    height: '105rem',
    flexDirection: 'row',
  },
  Col1: {
    height: '100%',
    width: '135rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Col2: {
    height: '100%',
    width: '30rem',
    alignItems: 'center',
  },
  Col3: {
    height: '100%',
    width: '195rem',
    marginLeft: '5rem',
    marginRight: '5rem',
    flexDirection: 'row',
  },
  detailTextView: {
    flexDirection: 'row',
    marginVertical: '3rem',
  },
  text: {
    fontSize: constants.FontSizes.smalltext,
  },
  timeDetailText: {
    color: '#0BAC4C',
    marginLeft: '5rem',
  },
  detailText: {
    color: '#7DA18C',
  },
  pictureView: {
    width: '82rem',
    height: '82rem',
    borderRadius: '20rem',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,

    elevation: 6,
  },
  deleteButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    right: '0rem',
    top: '20rem',
    borderTopLeftRadius: '15rem',
    borderBottomLeftRadius: '15rem',
  },
  deleteButton: {
    width: '50rem',
    height: '25rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
