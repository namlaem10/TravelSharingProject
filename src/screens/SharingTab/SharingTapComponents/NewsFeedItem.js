import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import * as constants from '../../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import {BASE_URL} from '../../../services/URL';
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
          source={constants.Images.IC_GOLD_STAR}
          style={{
            width: EStyleSheet.value('14rem'),
            height: EStyleSheet.value('14rem'),
          }}
        />,
      );
    }
    for (let i = 1; i <= leftstar; i++) {
      starts.push(
        <Image
          source={constants.Images.IC_NORMAL_STAR}
          style={{
            width: EStyleSheet.value('14rem'),
            height: EStyleSheet.value('14rem'),
          }}
        />,
      );
    }
    return starts;
  };

  render() {
    const {data, onPressItem} = this.props;
    moment.locale('vi');
    var avatar = BASE_URL + '/' + data.create_by.avatar;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPressItem(data)}>
        <View style={styles.header}>
          <Image
            source={
              data.image
                ? {uri: BASE_URL + '/' + data.image}
                : require('../../../assets/images/dalat2.jpg')
            }
            style={{
              flex: 1,
              width: '100%',
              borderRadius: EStyleSheet.value('19rem'),
            }}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.headerInfo}>
            <View style={styles.headerCol1}>
              <Image
                source={
                  data.create_by.avatar !== null
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
                    fontSize: EStyleSheet.value('12rem'),
                    fontFamily: constants.Fonts.regular,
                  }}>
                  {data.create_by.display_name}
                </Text>
                <Text
                  style={{
                    ...styles.text,
                    fontSize: EStyleSheet.value('12rem'),
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
                  fontSize: EStyleSheet.value('11rem'),
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
                fontSize: EStyleSheet.value('14rem'),
              }}>
              {data.title}
            </Text>
            <Text
              style={{
                ...styles.text,
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('9rem'),
                color: '#41A96B',
                marginBottom: EStyleSheet.value('5rem'),
              }}>
              #test,#bosungsau
            </Text>
            <Text
              style={{
                ...styles.text,
                fontFamily: constants.Fonts.light,
                fontSize: EStyleSheet.value('9rem'),
              }}>
              {data.description}...
            </Text>
          </View>
          <View style={styles.lastInfo}>
            <View style={styles.iconGroup}>
              <Image
                style={styles.iconVector}
                source={constants.Images.IC_MONEY}
              />
              <Text style={{...styles.text}}>{data.price}đ</Text>
            </View>
            <View style={styles.iconGroup}>
              <View style={styles.heartComment}>
                <Image
                  style={styles.iconVector}
                  source={constants.Images.IC_HEART}
                />
                <Text style={{...styles.text}}>1234</Text>
              </View>
              <View style={styles.heartComment}>
                <Image
                  style={styles.iconVector}
                  source={constants.Images.IC_COMMENT}
                />
                <Text style={{...styles.text}}>1234</Text>
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
    height: constants.HEIGHT / 2.2,
    marginHorizontal: '15rem',
    borderRadius: '20rem',
    marginVertical: '10rem',
    flexDirection: 'column',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,

    elevation: 4,
  },
  text: {
    letterSpacing: 0.8,
  },
  header: {
    flex: 1.1,
    borderRadius: '19rem',
    margin: '6rem',
  },
  content: {
    flex: 1.3,
    marginHorizontal: '11rem',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    flex: 1.9,
    borderBottomWidth: 0.3,
    borderBottomColor: '#CFCFCF',
  },
  lastInfo: {
    flex: 1.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '5rem',
  },
  iconVector: {
    width: '24rem',
    height: '24rem',
    marginHorizontal: '5rem',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  heartComment: {
    flexDirection: 'row',
    marginHorizontal: '8rem',
  },
});
