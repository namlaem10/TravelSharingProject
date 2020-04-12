import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import {BASE_URL} from '../../services/URL';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  seeMore = () => {
    this.props.navigation.navigate('InfoUser', {user: this.props.user.data});
  };
  async removeToken() {
    try {
      await AsyncStorage.removeItem('token');
      return true;
    } catch (exception) {
      return false;
    }
  }
  logOut = () => {
    this.setState({isLoading: true});
    let remove = this.removeToken();
    if ((remove = true)) {
      setTimeout(() => {
        this.setState({isLoading: false});
        this.props.navigation.navigate('SignIn');
      }, 2000);
    }
  };
  _renderItem = item => {
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
    const user = this.props.user.data;
    let avatar = null;
    if (user.avatar) {
      avatar = BASE_URL + '/' + user.avatar;
    }
    return (
      <View style={styles.container}>
        <Dialog visible={this.state.isLoading}>
          <DialogContent>
            <View style={styles.loadingCompleted}>
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
              <Text
                style={{
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('15rem'),
                  letterSpacing: 1,
                  marginLeft: EStyleSheet.value('5rem'),
                }}>
                Đang đăng xuất...
              </Text>
            </View>
          </DialogContent>
        </Dialog>
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
            source={
              avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
            }
            style={{
              width: EStyleSheet.value('60rem'),
              height: EStyleSheet.value('60rem'),
              borderRadius: EStyleSheet.value('30rem'),
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
            <Text style={styles.textTitle}>{user.display_name}</Text>
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
          <TouchableOpacity
            onPress={() => this.logOut()}
            style={styles.settingItem}>
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
const mapStateToProps = ({user}) => {
  return {
    user: user,
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     login: parrams => dispatch(actions.login(parrams)),
//     reset: () => dispatch(actions.reset()),
//   };
// };
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps)(AccountScreen);
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
  loadingCompleted: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
