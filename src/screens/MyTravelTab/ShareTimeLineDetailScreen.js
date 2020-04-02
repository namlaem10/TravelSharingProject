import React, {Component} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import TitleBarCustom from '../../components/TitleBarCustom';

import TimeLineDetailPersonal from '../../components/TimeLineDetailPersonal';
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
export default class ShareTimeLineDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  onPressBack = () => {
    if (this.props.location) {
      this.props.navigation.navigate(this.props.location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressNext = () => {
    this.props.navigation.navigate('CreatePost');
  };
  render() {
    //trừ 1 vì Tính từ 0, nhưng page lấy từ 1
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
          initialPage={0}
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
              <TimeLineDetailPersonal
                key={item.id}
                data={item}
                tabLabel={lable}
                day={countDay}
              />
            );
          })}
        </ScrollableTabView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => this.onPressNext()}>
            <Text
              style={{
                fontSize: EStyleSheet.value('15rem'),
                fontFamily: constants.Fonts.medium,
                color: 'white',
              }}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
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
