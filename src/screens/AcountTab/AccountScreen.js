import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
//fake data
const data = [
  {
    id: 'noti1',
    title: 'Hoàn đã gửi 1 tin nhắn trong nhóm du lịch',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
  {
    id: 'noti2',
    title: 'Cảnh báo: Hoàn đang cách khá xa nhóm của bạn',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
  {
    id: 'noti3',
    title: 'Cảnh báo: Hoàn đang cách khá xa nhóm của bạn',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
  {
    id: 'noti4',
    title: 'Cảnh báo: Hoàn đang cách khá xa nhóm của bạn',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
  {
    id: 'noti5',
    title: 'Cảnh báo: Hoàn đang cách khá xa nhóm của bạn',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
  {
    id: 'noti6',
    title: 'Cảnh báo: Hoàn đang cách khá xa nhóm của bạn',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
  {
    id: 'noti7',
    title: 'Cảnh báo: Hoàn đang cách khá xa nhóm của bạn',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
];
export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  seeMore = () => {
    this.props.navigation.navigate('InfoUser');
  };
  _renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.itemView}>
        <Image
          source={item.image}
          style={{
            width: EStyleSheet.value('70rem'),
            height: EStyleSheet.value('70rem'),
          }}
        />
        <View
          style={{
            justifyContent: 'flex-start',
            width: EStyleSheet.value('240rem'),
            paddingTop: EStyleSheet.value('5rem'),
          }}>
          <Text style={styles.textTitle}>{item.title}</Text>
        </View>
        <View style={{position: 'absolute', right: 0}}>
          <TouchableOpacity>
            <Image
              style={{
                width: EStyleSheet.value('30rem'),
                height: EStyleSheet.value('30rem'),
              }}
              source={constants.Images.IC_DIFFERENCE_ACTIVE}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            right: EStyleSheet.value('10rem'),
            bottom: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: EStyleSheet.value('267rem'),
          }}>
          <Text style={styles.subText}>{item.time}</Text>
          <Text style={styles.subText}>Nhấn để xem chi tiết</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: EStyleSheet.value('20rem'),
                fontFamily: constants.Fonts.regular,
                letterSpacing: 2,
              }}>
              Thông báo
            </Text>
          </View>
        </View>
        <View style={styles.userGroup}>
          <Image
            source={constants.Images.IC_AVATAR1}
            style={{
              width: EStyleSheet.value('60rem'),
              height: EStyleSheet.value('60rem'),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: EStyleSheet.value('280rem'),
              marginLeft: EStyleSheet.value('15rem'),
            }}>
            <Text style={styles.textTitle}>Nam ngu si</Text>
            <TouchableOpacity onPress={() => this.seeMore()}>
              <Text style={{...styles.textTitle, color: '#1161D8'}}>
                Xem thêm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <Image
              source={constants.Images.IC_MYTRAVEL_ACTIVE}
              style={styles.iconVectorRun}
            />
            <Text
              style={{
                ...styles.textTitle,
                ...styles.paddingText,
              }}>
              Lịch trình của tôi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Image
              source={constants.Images.IC_MANAGEGROUP_RED}
              style={styles.iconVector}
            />
            <Text
              style={{
                ...styles.textTitle,
                ...styles.paddingText,
              }}>
              Quản lý nhóm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Image
              source={constants.Images.IC_SEARCH_BLUE}
              style={{
                width: EStyleSheet.value('28rem'),
                height: EStyleSheet.value('28rem'),
              }}
            />
            <Text
              style={{
                ...styles.textTitle,
                ...styles.paddingText,
              }}>
              Tìm bạn bè
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Image
              source={constants.Images.IC_SETTING}
              style={styles.iconVector}
            />
            <Text
              style={{
                ...styles.textTitle,
                ...styles.paddingText,
              }}>
              Cài đặt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Image source={constants.Images.IC_KEY} style={styles.iconVector} />
            <Text
              style={{
                ...styles.textTitle,
                ...styles.paddingText,
                color: '#1161D8',
              }}>
              Đăng Xuất
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
  header: {
    paddingTop: '20rem',
    width: '100%',
    height: '90rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userGroup: {
    backgroundColor: 'white',
    height: '75rem',
    width: '100%',
    marginVertical: '25rem',
    borderBottomWidth: '0.3rem',
    borderTopWidth: '0.3rem',
    borderColor: '#CDCDCD',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '13rem',
  },
  textTitle: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
  },
  settingGroup: {
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: '0.3rem',
    borderTopWidth: '0.3rem',
    borderColor: '#CDCDCD',
    paddingHorizontal: '13rem',
  },
  iconVectorRun: {
    height: '30rem',
    width: '20rem',
  },
  iconVector: {
    height: '30rem',
    width: '30rem',
  },
  paddingText: {
    position: 'absolute',
    left: '50rem',
  },
  settingItem: {
    width: '350rem',
    height: '40rem',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
  },
});
