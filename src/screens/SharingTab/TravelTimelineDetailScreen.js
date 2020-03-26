import React, {Component} from 'react';
import {View, Text, Platform, StatusBar, ImageBackground} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import TitleBarCustom from '../../components/TitleBarCustom';

import TimeLineDetail from '../../components/TimelineDetail';
import CustomTabBar from '../../components/CustomTabBar';

const Dates = [
  {id: 'date1', date: '20/02/2020'},
  {id: 'date2', date: '21/02/2020'},
  {id: 'date3', date: '22/02/2020'},
  {id: 'date4', date: '23/02/2020'},
  {id: 'date5', date: '24/02/2020'},
  {id: 'date6', date: '25/02/2020'},
];
const tabStyle = {};
export default class TravelTimelineDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  onPressBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    //trừ 1 vì Tính từ 0, nhưng page lấy từ 1
    const page = this.props.navigation.getParam('page', 1) - 1;
    let countDay = 0;
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={require('../../assets/images/vinhhalong.jpeg')}
            style={{width: '100%', height: '100%'}}>
            <TitleBarCustom onPress={this.onPressBack} />
          </ImageBackground>
        </View>
        <ScrollableTabView
          initialPage={page}
          renderTabBar={() => (
            <CustomTabBar
              activeTextColor={'black'}
              inactiveTextColor={'#B7B7B7'}
              tabStyle={tabStyle}
              backgroundColor={'white'}
            />
          )}>
          {Dates.map(item => {
            let SplitDate = item.date.split('/');
            let day = SplitDate[0];
            let month = SplitDate[1];
            let lable = day + '.' + month;
            countDay++;
            return (
              <TimeLineDetail
                key={item.id}
                data={item}
                tabLabel={lable}
                day={countDay}
              />
            );
          })}
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
