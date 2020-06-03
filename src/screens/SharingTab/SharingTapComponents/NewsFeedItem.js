import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as constants from '../../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import {BASE_URL} from '../../../services/URL';
import 'moment/locale/vi';

EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class NewsFeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //tạo rating hình ngôi sao theo điểm (point/5)
  createStars = () => {
    let count = this.props.data.rating;
    let leftstar = 5 - count;
    let starts = [];
    for (let i = 1; i <= count; i++) {
      starts.push(
        <Image
          key={i}
          source={constants.Images.IC_GOLD_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
            resizeMode: 'contain',
          }}
        />,
      );
    }
    for (let i = 1; i <= leftstar; i++) {
      starts.push(
        <Image
          key={`${i}+10`}
          source={constants.Images.IC_NORMAL_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
            resizeMode: 'contain',
          }}
        />,
      );
    }
    return starts;
  };

  render() {
    const {data, onPressItem} = this.props;
    moment.locale('vi');
    const User = data.create_by;
    let avatar = null;
    if (User) {
      avatar = BASE_URL + '/' + User.avatar;
    }
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPressItem(data)}>
        <View style={styles.header}>
          <Image
            source={
              data.background
                ? {uri: BASE_URL + '/' + data.background}
                : require('../../../assets/images/dalat2.jpg')
            }
            style={{
              flex: 1,
              width: '100%',
              borderTopLeftRadius: EStyleSheet.value('19rem'),
              borderTopRightRadius: EStyleSheet.value('19rem'),
              marginBottom: EStyleSheet.value('7rem'),
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.headerInfo}>
            <View style={styles.headerCol1}>
              <Image
                source={
                  User.avatar !== null
                    ? {uri: avatar}
                    : constants.Images.IC_AVATAR1
                }
                style={{
                  width: EStyleSheet.value('30rem'),
                  height: EStyleSheet.value('30rem'),
                  borderRadius: EStyleSheet.value('15rem'),
                }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginLeft: EStyleSheet.value('15rem'),
                }}>
                <Text
                  style={{
                    ...styles.text,
                    fontSize: EStyleSheet.value('14rem'),
                    fontFamily: constants.Fonts.medium,
                  }}>
                  {data.create_by.display_name}
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontSize: EStyleSheet.value('14rem'),
                    fontFamily: constants.Fonts.light,
                  }}>
                  {data.departure.destination_name}&nbsp;-&nbsp;
                  {data.destination.destination_name}
                </Text>
              </View>
            </View>
            <View style={styles.headerCol2}>
              <Text
                style={{
                  ...styles.text,
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('12rem'),
                  color: '#8E8E8E',
                }}>
                {moment(data.start_day).format('DD/MM/YYYY')}&nbsp;-&nbsp;
                {moment(data.end_day).format('DD/MM/YYYY')}
              </Text>
              <View style={{flexDirection: 'row'}}>{this.createStars()}</View>
            </View>
          </View>
          <View style={styles.contentInfo}>
            <Text
              style={{
                ...styles.text,
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('16rem'),
              }}>
              {data.title}
            </Text>
            <Text
              style={{
                ...styles.text,
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('12rem'),
                color: '#41A96B',
                marginBottom: EStyleSheet.value('5rem'),
              }}>
              #{data.schedule.destination}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                ...styles.text,
                fontFamily: constants.Fonts.light,
                fontSize: EStyleSheet.value('13rem'),
              }}>
              {data.description}
            </Text>
          </View>
          <View style={styles.lastInfo}>
            <View style={styles.iconGroup}>
              <Image
                style={styles.iconVector}
                source={constants.Images.IC_MONEY}
              />
              <Text
                style={{
                  ...styles.text,
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('13rem'),
                  marginTop: EStyleSheet.value('2rem'),
                }}>
                {constants.currencyFormatter.format(data.price)}đ̲
              </Text>
            </View>
            <View style={styles.iconGroup}>
              <View style={styles.heartComment}>
                <Image
                  style={styles.iconVector}
                  source={constants.Images.IC_GOLD_STAR}
                />
                <Text
                  style={{
                    ...styles.text,
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('13rem'),
                    marginTop: EStyleSheet.value('2rem'),
                  }}>
                  {data.rating_count}
                </Text>
              </View>
              <View style={styles.heartComment}>
                <Image
                  style={styles.iconVector}
                  source={constants.Images.IC_COMMENT}
                />
                <Text
                  style={{
                    ...styles.text,
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('13rem'),
                    marginTop: EStyleSheet.value('2rem'),
                  }}>
                  {this.props.data.comment.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    height: '330rem',
    marginHorizontal: '15rem',
    borderRadius: '20rem',
    marginVertical: '10rem',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#DADDE1',
  },
  header: {
    flex: 1,
    borderRadius: '20rem',
  },
  content: {
    flex: 1.3,
    marginHorizontal: '11rem',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCol1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCol2: {
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  contentInfo: {
    flex: 2,
    borderBottomWidth: 0.3,
    borderBottomColor: '#CFCFCF',
  },
  lastInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '5rem',
  },
  iconVector: {
    width: '22rem',
    height: '22rem',
    marginHorizontal: '5rem',
    resizeMode: 'contain',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  heartComment: {
    flexDirection: 'row',
    marginHorizontal: '8rem',
  },
});
