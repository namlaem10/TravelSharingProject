import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
// import {connect} from 'react-redux';

EStyleSheet.build({$rem: constants.WIDTH / 380});

import TimeLineItem from './TimeLineItem';

export default class TimelineDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem() {
    let viewData = [];
    const {data, routeData} = this.props;
    let count = 0;
    let hour = 8;
    let minute = 0;
    data.map(item => {
      let lastPlace = false;
      let timeText = '';
      if (count === data.length - 1) {
        lastPlace = true;
      }
      if (count > 0) {
        if (routeData) {
          var secs = routeData.leg[count - 1].travelTime + 5400;
          let minutes = Math.floor(secs / 60);
          if (minutes > 60) {
            let hours = Math.floor(minutes / 60);
            hour += hours;
            minutes = minutes - hours * 60;
          }
          minute += minutes;
          if (minute > 60) {
            hour = hour + Math.floor(minute / 60);
            minute = minute - Math.floor(minute / 60) * 60;
          }
        }
      }
      timeText = `${hour < 10 ? '0' + hour : hour}:${
        minute < 10 ? '0' + minute : minute
      }`;
      viewData.push(
        <TimeLineItem
          data={item}
          timeText={timeText}
          key={count}
          lastPlace={lastPlace}
          route={
            routeData
              ? count < routeData.leg.length
                ? routeData.leg[count]
                : null
              : null
            // routeData && count < routeData.leg.length
            //   ? routeData.leg[count]
            //   : null
          }
          onPressItem={this.props.onPressItem}
        />,
      );
      count++;
    });
    return viewData;
  }
  render() {
    const {day} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text} />
          <Text style={styles.text}>Ngày {day} </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>{this._renderItem()}</View>
        </ScrollView>
      </View>
    );
  }
}
// const mapStateToProps = ({detailLichTrinh}) => {
//   return {
//     detailLichTrinh: detailLichTrinh,
//   };
// };
// export default connect(mapStateToProps)(TimelineDetail);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: '10rem',
    paddingHorizontal: '6.5rem',
  },
  text: {
    color: '#127138',
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.medium,
  },
  content: {
    paddingHorizontal: '6.5rem',
  },
});
