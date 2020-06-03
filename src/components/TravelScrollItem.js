import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
export default class TravelScrollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {page, onPressTravelDay, data, routeInfo} = this.props;
    var totalDistance = 0;
    if (routeInfo) {
      totalDistance =
        Math.round((routeInfo.summary.distance / 1000) * 10 + Number.EPSILON) /
        10;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPressTravelDay(page)}>
          <View style={styles.pictureView}>
            <Image
              style={{
                width: '100%',
                height: EStyleSheet.value('150rem'),
                borderRadius: EStyleSheet.value('12rem'),
              }}
              source={{uri: data[0].tourist_destination_image}}
            />
          </View>
          <View style={styles.dayNum}>
            <Text
              style={{
                fontFamily: constants.Fonts.light,
                color: 'white',
                fontSize: EStyleSheet.value('11rem'),
                marginLeft: EStyleSheet.value('5rem'),
              }}>
              {/* FakeDate */}
              Ngày {page}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.infoTravelItem}>
          <View style={styles.infoText}>
            <Image
              resizeMode="contain"
              source={constants.Images.IC_LOCATION}
              style={styles.icon}
            />
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.light,
              }}>
              {data.length} địa điểm
            </Text>
          </View>
          <View style={styles.infoText}>
            <Image
              resizeMode="contain"
              source={constants.Images.IC_VEHICLE_GRAY}
              style={styles.icon}
            />
            {totalDistance !== 0 ? (
              <Text
                style={{
                  fontSize: EStyleSheet.value('14rem'),
                  fontFamily: constants.Fonts.light,
                }}>
                {totalDistance} km
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: EStyleSheet.value('14rem'),
                  fontFamily: constants.Fonts.light,
                }}>
                Chưa có thông tin
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    marginLeft: '12rem',
    width: '125rem',
    height: '200rem',
    marginTop: '5rem',
  },
  pictureView: {
    backgroundColor: 'white',
    width: '100%',
    height: '150rem',
    borderRadius: '12rem',
  },
  dayNum: {
    width: '50rem',
    height: '20rem',
    backgroundColor: 'rgba(0,0,0,0.48)',
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: '25rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '10rem',
    borderBottomLeftRadius: '10rem',
  },
  icon: {
    width: '20rem',
    height: '20rem',
    marginRight: '8rem',
  },
  infoText: {
    marginTop: '5rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTravelItem: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
