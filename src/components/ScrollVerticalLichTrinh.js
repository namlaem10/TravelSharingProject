import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import TravelScrollItem from './TravelScrollItem';
import MemberScrollItem from './MemberScrollItem';
import BlogDetail from './BlogDetail';
export default class ScrollVerticalLichTrinh extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _RenderScrollTravelItem = schedule => {
    let Items = [];
    for (let i = 1; i <= schedule.number_of_days; i++) {
      let key = 'day_' + i;
      Items.push(
        <TravelScrollItem
          data={schedule.schedule_detail[key]}
          key={key}
          page={i}
          onPressTravelDay={this.props.onPressTravelDay}
        />,
      );
    }
    return Items;
  };
  _RenderScrollMemberItem = () => {
    let Items = [];
    for (let i = 1; i <= 4; i++) {
      Items.push(<MemberScrollItem key={i} data={i} />);
    }
    return Items;
  };
  onPressAddMember = () => {
    console.log('member');
  };
  onPressChat = () => {
    console.log('chat');
  };
  render() {
    const {
      onPressDetailButton,
      onPressChat,
      onPressAddMember,
      isBlog,
      data,
    } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: EStyleSheet.value('13rem'),
          }}>
          <Text
            style={{
              fontFamily: constants.Fonts.medium,
              fontSize: EStyleSheet.value('15rem'),
            }}>
            Lịch trình
          </Text>
          <TouchableOpacity onPress={() => onPressDetailButton()}>
            <Text
              style={{
                fontFamily: constants.Fonts.regular,
                fontSize: EStyleSheet.value('15rem'),
                color: '#6C88CE',
              }}>
              Chi tiết
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.scrollViewContent}>
            {this._RenderScrollTravelItem(data.schedule)}
          </View>
        </ScrollView>
        <View style={styles.members}>
          <View style={styles.memberTitleGroup}>
            <Text
              style={{
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('15rem'),
              }}>
              Thành viên
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => onPressAddMember()}>
                <Image
                  source={constants.Images.IC_ADD_MEMBER}
                  style={styles.iconVector}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressChat()}>
                <Image
                  source={constants.Images.IC_COMMENT_RED}
                  style={styles.iconVector}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.memberScrollView}>
              {this._RenderScrollMemberItem()}
            </View>
          </ScrollView>
        </View>
        {isBlog ? (
          <View style={styles.blog}>
            <BlogDetail key={data._id} data={data} />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {},
  scrollViewContent: {
    flexDirection: 'row',
  },
  members: {
    marginVertical: '10rem',
    marginHorizontal: EStyleSheet.value('13rem'),
  },
  memberScrollView: {
    flexDirection: 'row',
  },
  memberTitleGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconVector: {
    height: '25rem',
    width: '25rem',
    marginLeft: '15rem',
  },
});
