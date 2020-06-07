import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderComment = comment => {
    return comment.map((item, index) => {
      return (
        <View style={styles.container} key={index}>
          <View style={styles.Userinfo}>
            <Image
              source={
                item.avatar !== null
                  ? {uri: item.avatar}
                  : constants.Images.IC_AVATAR1
              }
              style={{
                width: EStyleSheet.value('36rem'),
                height: EStyleSheet.value('36rem'),
                borderRadius: EStyleSheet.value('18rem'),
              }}
            />
            <View
              style={{
                marginLeft: EStyleSheet.value('5rem'),
                height: EStyleSheet.value('36rem'),
              }}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('14rem'),
                  fontFamily: constants.Fonts.medium,
                }}>
                {item.username}
              </Text>
              <Text
                style={{
                  fontSize: EStyleSheet.value('12rem'),
                  fontFamily: constants.Fonts.light,
                }}>
                {moment(item.create_at).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.comment}>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.light,
              }}>
              {item.content}
            </Text>
          </View>
        </View>
      );
    });
  };
  render() {
    const {data} = this.props;
    if (data.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: EStyleSheet.value('170rem'),
          }}>
          <Image
            source={constants.Images.IC_NO_COMMENT}
            style={{
              resizeMode: 'contain',
              width: EStyleSheet.value('100rem'),
              height: EStyleSheet.value('100rem'),
            }}
          />
          <Text
            style={{
              fontFamily: constants.Fonts.medium,
              fontSize: EStyleSheet.value('18rem'),
              color: '#8E8E8E',
            }}>
            Chưa có bình luận nào
          </Text>
        </View>
      );
    } else {
      return this.renderComment(data);
    }
  }
}

const styles = EStyleSheet.create({
  container: {
    marginVertical: '15rem',
    flexDirection: 'column',
  },
  Userinfo: {
    flexDirection: 'row',
    marginBottom: '5rem',
  },
  comment: {
    marginLeft: '40rem',
  },
});
