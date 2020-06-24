import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import HeaderBar from '../../components/HeaderBar';
import api from '../../services/APIservice';
import AsyncStorage from '@react-native-community/async-storage';

//fake data

class AddFriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Thêm bạn bè',
      searchText: '',
      data: null,
      isLoadding: false,
      placeHolder: 'Nhập số điện thoại, email hoặc tên bạn bè',
      error: '',
      user: null,
    };
  }
  componentWillMount() {
    this.setState({user: this.props.user.data});
  }
  async getToken() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.log('get token has error');
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.type === types.ADD_FRIEND ||
      nextProps.user.type === types.ADD_FRIEND_FAIL
    ) {
      if (nextProps.user.type === types.ADD_FRIEND) {
        this.setState({user: nextProps.user.data});
        this.showToast();
      }
    }
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onEndEditing = async () => {
    const {searchText} = this.state;
    if (searchText !== '') {
      this.setState({isLoadding: true});
      const token = await this.getToken();
      const url = `/api/user/find?search=${searchText}`;
      const result = await api.post(url, null, token);
      if (result.status !== 200) {
        this.setState({
          error:
            'Có lỗi xảy ra trong quá trình tìm kiếm, vui lòng kiểm tra lại',
          isLoadding: false,
        });
      } else {
        if (result.data.length < 1) {
          this.setState({error: 'Không tìm thấy', isLoadding: false});
        } else {
          this.setState({
            data: result.data,
            error: '',
            isLoadding: false,
          });
        }
      }
    }
  };
  onPressAddFriend = item => {
    Alert.alert(
      'Thêm bạn',
      `Bạn có muốn thêm ${item.display_name} vào danh sách bạn bè?`,
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => this.props.add_friend(this.state.user, item),
        },
      ],
      {cancelable: false},
    );
  };
  showToast = () => {
    ToastAndroid.show('Đã thêm thành công!', ToastAndroid.SHORT);
  };
  _renderItem = item => {
    let isfriend = true;
    const userFriend = this.props.user.data.user_info.friend;
    var found = userFriend.find(e => {
      return e._id === item._id;
    });
    if (found === undefined) {
      isfriend = false;
    }
    return (
      <View style={styles.flatListItem}>
        <View
          style={{
            marginRight: EStyleSheet.value('10rem'),
            marginBottom: EStyleSheet.value('20rem'),
          }}>
          <Image
            source={
              item.avatar !== null
                ? {uri: item.avatar}
                : constants.Images.IC_AVATAR1
            }
            style={{
              width: EStyleSheet.value('50rem'),
              height: EStyleSheet.value('50rem'),
              borderRadius: EStyleSheet.value('25rem'),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: EStyleSheet.value('275rem'),
            marginBottom: EStyleSheet.value('20rem'),
          }}>
          <Text style={styles.textPlace}>{item.display_name}</Text>
          {isfriend ? (
            <Text style={{fontFamily: constants.Fonts.light}}>Đã Thêm</Text>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                this.onPressAddFriend(item);
              }}>
              <Text style={{color: 'white', fontFamily: constants.Fonts.light}}>
                Thêm bạn
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  render() {
    const {
      title,
      searchText,
      isLoadding,
      placeHolder,
      data,
      error,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBar title={title} onPressBack={this.onPressBack} />
        </View>
        <View style={styles.content}>
          <View style={styles.inputText}>
            <TextInput
              placeholder={placeHolder}
              style={styles.searchBar}
              onChangeText={text => this.setState({searchText: text})}
              value={searchText}
              autoFocus={true}
              clearButtonMode={'while-editing'}
              onEndEditing={this.onEndEditing}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isLoadding ? (
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
            ) : error !== '' ? (
              <Text
                style={{
                  fontSize: EStyleSheet.value('18rem'),
                  fontFamily: constants.Fonts.medium,
                }}>
                {error}
              </Text>
            ) : (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: EStyleSheet.value('0rem'),
                }}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({item}) => this._renderItem(item)}
                keyExtractor={item => item._id}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStatetToProps = ({user}) => {
  return {
    user: user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add_friend: (user, friend) => dispatch(actions.add_friend(user, friend)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStatetToProps,
  mapDispatchToProps,
)(AddFriendScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '60rem',
    justifyContent: 'center',
  },
  searchBar: {
    height: '50rem',
    fontSize: '14rem',
    fontFamily: constants.Fonts.light,
    backgroundColor: 'rgb(238, 238, 238)',
    borderRadius: '8rem',
    paddingLeft: '15rem',
  },
  content: {
    flex: 1,
    paddingTop: '10rem',
    paddingHorizontal: '15rem',
    flexDirection: 'column',
  },
  inputText: {
    height: '50rem',
    marginBottom: '15rem',
  },
  flatListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '10rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    height: '60rem',
  },
  textPlace: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.medium,
  },
  addButton: {
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    height: '35rem',
    width: '80rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
