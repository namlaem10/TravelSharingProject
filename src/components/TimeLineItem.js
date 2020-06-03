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
            justifyContent: 'space-around',
            flex: 1,
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
            justifyContent: 'flex-start',
            position: 'absolute',
            top: EStyleSheet.value('32rem'),
            width: '100%',
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
    const {
      data,
      isDelete,
      timeText,
      onPressDeleteItem,
      keyDay,
      action,
      onLongPress,
      isActive,
      isGone,
    } = this.props;
    if (isGone) {
      return (
        <View
          style={{
            height: EStyleSheet.value('125rem'),
            flexDirection: 'row',
          }}>
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
                resizeMode: 'contain',
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
                  uri: data.tourist_destination_image,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: EStyleSheet.value('20rem'),
                }}
              />
              {isDelete ? (
                this.props.isLeader || action === 'creating' ? (
                  <View style={styles.deleteButtonGroup}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => onPressDeleteItem(data._id, keyDay)}>
                      <Text
                        style={{
                          fontFamily: constants.Fonts.light,
                          color: 'white',
                          fontSize: EStyleSheet.value('14rem'),
                        }}>
                        Xóa
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null
              ) : null}
            </View>
            <View
              style={{
                flexDirection: 'column',
                width: EStyleSheet.value('110rem'),
                marginLeft: EStyleSheet.value('5rem'),
              }}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: constants.Fonts.medium,
                  fontSize: EStyleSheet.value('14rem'),
                  color: '#127138',
                  marginBottom: EStyleSheet.value('3rem'),
                }}>
                {data.tourist_destination_name}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  ...styles.detailText,
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('14rem'),
                }}>
                {data.tourist_destination_address}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      if (isActive) {
        return (
          <TouchableOpacity
            style={{
              height: EStyleSheet.value('125rem'),
              flexDirection: 'row',
              backgroundColor: isActive ? '#FFFFFF50' : null,
            }}
            onLongPress={onLongPress}>
            <View style={styles.DragCol}>
              <View style={styles.pictureView}>
                <Image
                  source={{
                    uri: data.tourist_destination_image,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: EStyleSheet.value('20rem'),
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: EStyleSheet.value('300rem'),
                  marginLeft: EStyleSheet.value('10rem'),
                }}>
                <Text
                  style={{
                    fontFamily: constants.Fonts.medium,
                    fontSize: EStyleSheet.value('16rem'),
                    color: '#127138',
                    marginBottom: EStyleSheet.value('3rem'),
                  }}>
                  {data.tourist_destination_name}
                </Text>
                <Text style={{...styles.detailText}}>
                  {data.tourist_destination_address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={{
              height: EStyleSheet.value('125rem'),
              flexDirection: 'row',
              backgroundColor: isActive ? '#FFFFFF50' : null,
            }}
            onLongPress={onLongPress}>
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
                  resizeMode: 'contain',
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
                    uri: data.tourist_destination_image,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: EStyleSheet.value('20rem'),
                  }}
                />
                {isDelete ? (
                  this.props.isLeader || action === 'creating' ? (
                    <View style={styles.deleteButtonGroup}>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => onPressDeleteItem(data._id, keyDay)}>
                        <Text
                          style={{
                            fontFamily: constants.Fonts.light,
                            color: 'white',
                            fontSize: EStyleSheet.value('14rem'),
                          }}>
                          Xóa
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: EStyleSheet.value('110rem'),
                  marginLeft: EStyleSheet.value('5rem'),
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: constants.Fonts.medium,
                    fontSize: EStyleSheet.value('14rem'),
                    color: '#127138',
                    marginBottom: EStyleSheet.value('3rem'),
                  }}>
                  {data.tourist_destination_name}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    ...styles.detailText,
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('14rem'),
                  }}>
                  {data.tourist_destination_address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    }
  }
}

const styles = EStyleSheet.create({
  container: {
    height: '125rem',
    flexDirection: 'row',
  },
  Col1: {
    height: '100%',
    width: '135rem',
    flexDirection: 'column',
    paddingVertical: '8rem',
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
  DragCol: {
    height: '100%',
    width: '100%',
    marginLeft: '5rem',
    marginRight: '5rem',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  detailTextView: {
    flexDirection: 'row',
    marginVertical: '3rem',
  },
  text: {
    fontSize: '13rem',
    fontFamily: constants.Fonts.light,
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
    height: '110rem',
    borderRadius: '20rem',
    //shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 16,

    // elevation: 6,
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
