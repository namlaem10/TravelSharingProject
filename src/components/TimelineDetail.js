import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

EStyleSheet.build({$rem: constants.WIDTH / 380});

import TimeLineItem from './TimeLineItem';

//fakedata
const TimeLineItems = [
  {
    id: 'timeline1',
    time: '6:30',
  },
  {
    id: 'timeline2',
    time: '12:15',
  },
  {
    id: 'timeline3',
    time: '15:15',
  },
  {
    id: 'timeline4',
    time: '18:30',
  },
];

class TimelineDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // _renderItem(data, calData) {
  //   for (let i = 0; i < calData.length; i++) {
  //     console.log(calData[i].route['0'].summary);
  //   }
  // }
  render() {
    const {day, data} = this.props;
    const lastPlaceNum = data.length;
    let checkLastPlace = 1;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>Chi tiết lịch trình </Text>
          <Text style={styles.text}>Ngày {day} </Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            {/* {this._renderItem(data, this.props.calLichTrinh.data[day - 1])} */}
            {data.map(item => {
              let lastPlace = false;
              if (checkLastPlace === lastPlaceNum) {
                lastPlace = true;
              }
              checkLastPlace++;
              return (
                <TimeLineItem
                  data={item}
                  key={checkLastPlace}
                  lastPlace={lastPlace}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = ({calLichTrinh}) => {
  return {
    calLichTrinh: calLichTrinh,
  };
};
export default connect(mapStateToProps)(TimelineDetail);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    marginTop: '10rem',
    marginLeft: '13rem',
  },
});
