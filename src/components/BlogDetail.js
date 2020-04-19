import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {BASE_URL} from '../services/URL';
import Comment from './Comment';
import moment from 'moment';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //tạo rating hình ngôi sao theo điểm (point/5)
  createStars = () => {
    const {data} = this.props;
    let count = data.rating;
    let leftstar = 5 - count;
    let starts = [];
    for (let i = 1; i <= count; i++) {
      starts.push(
        <Image
          source={constants.Images.IC_GOLD_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
          }}
        />,
      );
    }
    for (let i = 1; i <= leftstar; i++) {
      starts.push(
        <Image
          source={constants.Images.IC_NORMAL_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
          }}
        />,
      );
    }
    return starts;
  };
  RenderComment = () => {
    let data = {
      image: constants.Images.IC_AVATAR2,
      username: 'Cô pé ngu ngốk',
      date: '20/03/2020',
      comment: 'Dễ thương quá anh chị ơi ♥',
    };
    let comments = [];
    for (var i = 0; i < 3; i++) {
      comments.push(<Comment data={data} />);
    }
    return comments;
  };
  render() {
    const {data} = this.props;
    const User = data.create_by;
    let avatar = null;
    if (User) {
      avatar = BASE_URL + '/' + User.avatar;
    }
    return (
      <View style={styles.content}>
        <View style={styles.headerInfo}>
          <View style={styles.headerCol1}>
            <Image
              source={
                User.avatar !== null
                  ? {uri: avatar}
                  : constants.Images.IC_AVATAR3
              }
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
                borderRadius: EStyleSheet.value('17.5rem'),
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
                {User.display_name}
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
                color: '#8E8E8E',
              }}>
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
              fontSize: EStyleSheet.value('10rem'),
              color: '#41A96B',
              marginBottom: EStyleSheet.value('5rem'),
            }}>
            #hanoi #hoguom
          </Text>
          <Text
            style={{
              ...styles.text,
              fontFamily: constants.Fonts.light,
              fontSize: EStyleSheet.value('12rem'),
            }}>
            {data.description}
          </Text>
        </View>
        <View style={styles.commentGroup}>
          <View style={styles.likeAndCommentSmallIcon}>
            <View style={styles.icItem}>
              <Image
                source={constants.Images.IC_HEART}
                style={styles.smallIcon}
              />
              <Text>1234</Text>
            </View>
            <View style={styles.icItem}>
              <Image
                source={constants.Images.IC_COMMENT}
                style={styles.smallIcon}
              />
              <Text>1234</Text>
            </View>
          </View>
          <View style={styles.likeAndCommentBigIcon}>
            <View style={styles.icItem}>
              <Image
                source={constants.Images.IC_HEART}
                style={styles.bigIcon}
              />
              <Text>Yêu thích</Text>
            </View>
            <View style={styles.icItem}>
              <Image
                source={constants.Images.IC_COMMENT}
                style={styles.bigIcon}
              />
              <Text>Bình luận</Text>
            </View>
          </View>
          <View style={styles.comment}>{this.RenderComment()}</View>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1.3,
    marginHorizontal: '13rem',
    marginVertical: '12rem',
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
    marginTop: '10rem',
  },
  text: {
    letterSpacing: '0.8rem',
  },
  likeAndCommentSmallIcon: {
    marginTop: '8rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: '0.5rem',
    borderBottomColor: '#CFCFCF',
  },
  smallIcon: {
    width: '18rem',
    height: '18rem',
    marginBottom: '8rem',
    marginRight: '10rem',
  },
  likeAndCommentBigIcon: {
    marginTop: '8rem',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: '0.5rem',
    borderBottomColor: '#CFCFCF',
  },
  bigIcon: {
    width: '24rem',
    height: '24rem',
    marginBottom: '8rem',
    marginRight: '10rem',
  },
  icItem: {
    flexDirection: 'row',
  },
  comment: {
    flexDirection: 'column',
  },
});
