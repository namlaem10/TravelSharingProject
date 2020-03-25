import React, {Component} from 'react';
import {View, Text, Platform, StatusBar} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';

EStyleSheet.build({$rem: constants.WIDTH / 380});
import TimeLineDetail from '../../components/TimelineDetail';
import CustomTabBar from '../../components/CustomTabBar';

const Dates = [
  {id: 'date1', date: '20/02/2020'},
  {id: 'date2', date: '21/02/2020'},
  {id: 'date3', date: '22/02/2020'},
];

export default class TravelTimelineDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NumTabs: 0,
    };
  }
  componentWillMount = () => {
    let length = Dates.length;
    this.setState({NumTabs: length});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView renderTabBar={() => <CustomTabBar />}>
          <TimeLineDetail tabLabel="React" />
          <TimeLineDetail tabLabel="Flow" />
          <TimeLineDetail tabLabel="Jest" />
        </ScrollableTabView>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
});
