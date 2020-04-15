import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import TitleBarCustom from '../../components/TitleBarCustom';

import TimeLineDetailPersonal from '../../components/TimeLineDetailPersonal';
import CustomTabBar from '../../components/CustomTabBar';
import moment from 'moment';
const tabStyle = {};
export default class TimeLineDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressDeleteItem = data => {
    console.log(data);
  };
  _renderItem = () => {
    let array = [];
    let countday = 0;
    const data = this.props.navigation.getParam('data');
    const totalDay = this.props.navigation.getParam('totalDay');
    let startDate = this.props.navigation.getParam('start');
    const routeData = this.props.navigation.getParam('routeData');
    const isGone = this.props.navigation.getParam('isGone', false);
    for (let i = 1; i <= totalDay; i++) {
      let dataItem = data['day_' + i];
      let routeDataItem = routeData[i - 1];
      let date = moment(startDate).format('DD/MM/YYYY');
      let day = date.split('/')[0];
      let month = date.split('/')[1];
      let lable = day + '.' + month;
      startDate = moment(startDate).add(1, 'day');
      countday++;
      array.push(
        <TimeLineDetailPersonal
          key={'day_' + i}
          data={dataItem}
          routeData={routeDataItem}
          tabLabel={lable}
          day={countday}
          isGone={isGone}
          onPressDeleteItem={this.onPressDeleteItem}
        />,
      );
    }
    return array;
  };
  onPressNext = () => {
    this.props.navigation.navigate('CreatePost');
  };
  onPressShare = () => {
    console.log('Shared');
  };
  onPressCompleted = () => {
    this.props.navigation.navigate('TripDetail');
  };
  onPressAddPlace = () => {
    this.props.navigation.navigate('AddPlaceDetail');
  };
  render() {
    const page = this.props.navigation.getParam('page', 1) - 1;
    const isGone = this.props.navigation.getParam('isGone', false);
    //trừ 1 vì Tính từ 0, nhưng page lấy từ 1
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={require('../../assets/images/vinhhalong.jpeg')}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <TitleBarCustom onPress={this.onPressBack} />
          </ImageBackground>
        </View>
        <ScrollableTabView
          initialPage={page}
          renderTabBar={() => (
            <CustomTabBar
              activeTextColor={'#34D374'}
              inactiveTextColor={'#B7B7B7'}
              tabStyle={tabStyle}
              backgroundColor={'white'}
            />
          )}>
          {this._renderItem()}
        </ScrollableTabView>
        {isGone ? (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressShare()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Chia sẻ
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressCompleted()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Lưu
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  backgroundHeader: {
    height: '120rem',
  },
  confirmButton: {
    width: '300rem',
    height: '35rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40rem',
  },
});
