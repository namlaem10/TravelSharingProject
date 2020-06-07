import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.data.user_info || null,
      avatar: this.props.user.data.user_info.avatar
        ? this.props.user.data.user_info.avatar
        : null,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (
          payload.action.type === 'Navigation/NAVIGATE' ||
          payload.action.type === 'Navigation/BACK'
        ) {
          this.setState({
            user: this.props.user.data.user_info || null,
            avatar: this.props.user.data.user_info.avatar
              ? this.props.user.data.user_info.avatar
              : null,
          });
        }
      },
    );
  }
  seeMore = () => {
    this.props.navigation.navigate('InfoUser', {user: this.state.user});
  };

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.user.type === types.UPDATE_INFO) {
      this.setState({user: nextProps.user.data.user_info});
    } else if (nextProps.user.type === types.UPDATE_INFO_FAIL) {
      this.showToast('Cập nhật thông tin lỗi! Thử lại sau');
    } else if (nextProps.user.type === types.ADD_FRIEND) {
      this.setState({user: nextProps.user.data.user_info});
    } else if (nextProps.user.type === types.ADD_FRIEND_FAIL) {
      this.showToast('Đã có lỗi xảy ra! Thử lại sau');
    } else if (nextProps.user.type === types.LOGOUT) {
      let remove = await this.removeToken();
      if (remove === true) {
        setTimeout(() => {
          this.setState({isLoading: false});
          this.props.navigation.navigate('SignIn');
        }, 2000);
      }
    } else if (nextProps.user.type === types.LOGIN_FAIL) {
      this.showToast('Đã có lỗi xảy ra! Thử lại sau');
    }
  }
  showToast = message => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };
  async removeToken() {
    try {
      await AsyncStorage.removeItem('token');
      return true;
    } catch (exception) {
      return false;
    }
  }
  logOut = async () => {
    this.setState({isLoading: true});
    await this.props.logout();
  };
  onPressMyTravel = () => {
    this.props.navigation.navigate('MyTravel');
  };
  onPressManagerGroup = () => {
    this.props.navigation.navigate('ManageGroup');
  };
  onPressFindFriends = () => {
    this.props.navigation.navigate('AddFriend');
  };
  onPressChangePassWord = () => {
    this.props.navigation.navigate('ChangePassword');
  };
  _renderItem = item => {
    return (
      <TouchableOpacity style={styles.itemView}>
        <Image
          source={item.image}
          style={{
            width: EStyleSheet.value('70rem'),
            height: EStyleSheet.value('70rem'),
            resizeMode: 'contain',
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
                resizeMode: 'contain',
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
    const {user, avatar} = this.state;
    return (
      <View style={styles.container}>
        <Dialog visible={this.state.isLoading}>
          <DialogContent>
            <View style={styles.loadingDialog}>
              <ActivityIndicator
                size={EStyleSheet.value('40rem')}
                color="#34D374"
              />
              <Text
                style={{
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('15rem'),
                  marginLeft: EStyleSheet.value('10rem'),
                }}>
                Đang đăng xuất
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: EStyleSheet.value('22rem'),
                fontFamily: constants.Fonts.light,
              }}>
              Khác
            </Text>
          </View>
        </View>
        <View style={styles.userGroup}>
          <Image
            source={
              avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
            }
            style={{
              width: EStyleSheet.value('50rem'),
              height: EStyleSheet.value('50rem'),
              borderRadius: EStyleSheet.value('25rem'),
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
            <Text
              style={{
                ...styles.textTitle,
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('18rem'),
              }}>
              {user.display_name}
            </Text>
            <TouchableOpacity onPress={() => this.seeMore()}>
              <Text
                style={{
                  ...styles.textTitle,
                  color: '#1161D8',
                  fontSize: EStyleSheet.value('14rem'),
                }}>
                Xem thêm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingGroup}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => this.onPressMyTravel()}>
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
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => this.onPressManagerGroup()}>
            <Image
              source={constants.Images.IC_MANAGEGROUP_ACTIVE}
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
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => this.onPressFindFriends()}>
            <Image
              source={constants.Images.IC_SEARCH}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
                resizeMode: 'contain',
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
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => this.onPressChangePassWord()}>
            <Image
              source={constants.Images.IC_PASSWORD_ACTIVE}
              style={styles.iconVectorBig}
            />
            <Text
              style={{
                ...styles.textTitle,
                ...styles.paddingText,
              }}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.logOut()}
            style={{...styles.settingItem, borderBottomWidth: 0}}>
            <Image
              source={constants.Images.IC_KEY_ACTIVE}
              style={styles.iconVectorBig}
            />
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
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountScreen);
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingTop: '40rem',
    width: '100%',
    height: '89rem',
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
    fontFamily: constants.Fonts.light,
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
    height: '25rem',
    width: '30rem',
    resizeMode: 'contain',
  },
  iconVector: {
    height: '30rem',
    width: '25rem',
    resizeMode: 'contain',
  },
  iconVectorBig: {
    height: '22rem',
    width: '22rem',
    resizeMode: 'contain',
  },
  paddingText: {
    position: 'absolute',
    left: '40rem',
  },
  settingItem: {
    width: '350rem',
    height: '60rem',
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
  loadingDialog: {
    paddingTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: EStyleSheet.value('80rem'),
    width: EStyleSheet.value('200rem'),
  },
});
