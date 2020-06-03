import React, {Component} from 'react';
import {View, Text, Platform, StatusBar, ImageBackground} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import TitleBarCustom from '../../components/TitleBarCustom';

import TimeLineDetail from '../../components/TimelineDetail';
import CustomTabBar from '../../components/CustomTabBar';
import moment from 'moment';

const tabStyle = {};
export default class TravelTimelineDetailScreen extends Component {
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
  _renderItem = () => {
    let array = [];
    let countday = 0;
    const data = this.props.navigation.getParam('data');
    const totalDay = this.props.navigation.getParam('totalDay');
    let startDate = this.props.navigation.getParam('start');
    const routeData = this.props.navigation.getParam('routeData');
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
        <TimeLineDetail
          key={'day_' + i}
          data={dataItem}
          routeData={routeDataItem}
          tabLabel={lable}
          day={countday}
        />,
      );
    }
    return array;
  };
  render() {
    const page = this.props.navigation.getParam('page', 1) - 1;
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
          showsHorizontalScrollIndicator={false}
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
    height: '195rem',
  },
});
