import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import Comment from './Comment';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //tạo rating hình ngôi sao theo điểm (point/5)
  createStars = () => {
    let count = 4;
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
    return (
      <View style={styles.content}>
        <View style={styles.headerInfo}>
          <View style={styles.headerCol1}>
            <Image
              source={constants.Images.IC_AVATAR3}
              style={{width: 35, height: 35}}
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
                Hoàn
              </Text>
              <Text
                style={{
                  ...styles.text,
                  fontSize: EStyleSheet.value('12rem'),
                  fontFamily: constants.Fonts.light,
                }}>
                TP.Hồ Chí Minh - Vịnh Hạ Long
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
              20/03/2020
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
            Trải nghiệm đáng nhớ
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
            Đây là hành trình 3 ngày 2 đêm thăm thú vịnh Hạ Long với Paradise
            Cruise Ship. Đây là một chuyến đi nhiều kỷ niệm vì đã rất lâu bản
            thân hai đứa mới có cơ hội trở lại nơi này.{'\n'}
            {'\n'}
            {'\n'}Cảnh đẹp thiên nhiên say đắm lòng người, và bao nhiêu điều học
            hỏi được từ người dân địa phương. Một chuyến đi với bao nhiêu đều
            thật đáng nhớ.
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
