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
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/managerGroupReducer';

import SearchBar from '../../components/SearchBar';
import {BASE_URL} from '../../services/URL';

class AddMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Chọn thành viên',
      searchText: '',
      loadingVisible: false,
      loadingCompleted: false,
      idUserPick: [],
      friend: [],
      friendBackup: [],
    };
  }
  UNSAFE_componentWillMount = () => {
    this.setState({
      idUserPick: this.props.navigation.getParam('member', []),
      friend: this.props.user.data.user_info.friend,
      friendBackup: this.props.user.data.user_info.friend,
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER ||
      nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER_FAIL
    ) {
      if (nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER) {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Đã cập nhật! đang chuyển màn hình',
        });
        let location = this.props.navigation.getParam('location');
        if (location === 'InfoGroup') {
          setTimeout(() => {
            this.setState({
              loadingCompleted: false,
            });
            this.props.navigation.navigate('InfoGroup', {
              data: nextProps.groupInfo.data[0],
              title: this.props.navigation.getParam('title'),
            });
          }, 1000);
        } else {
          this.props.reset_member();
          setTimeout(() => {
            this.setState({
              loadingCompleted: false,
            });
            this.props.navigation.navigate('TripDetail', {
              data: nextProps.groupInfo.data[0],
            });
          }, 1500);
        }
      } else {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Lỗi tạo hành trình!',
        });
      }
    }
    if (nextProps.groupInfo.type === types.UPDATE_MEMBER) {
      this.props.navigation.navigate('CreateTrip', {
        member: nextProps.groupInfo.data,
      });
    }
  }
  onSearchChangeText = text => {
    this.setState({searchText: text});
  };
  setSearchText = text => {
    let searchText = text.replace(/[^a-zA-Z0-9-  ]/g, '');
    this.setState({searchText: searchText});
    let data = this.state.friendBackup;
    searchText = searchText.trim().toLowerCase();
    data = data.filter(element => {
      let searchData = null;
      let sText = element.display_name;
      searchData = sText.toLowerCase().match(searchText);
      return searchData;
    });
    this.setState({
      friend: data,
    });
  };
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location, {
        data: this.props.navigation.getParam('data'),
        title: this.props.navigation.getParam('title'),
      });
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressDone = async () => {
    const type = this.props.navigation.getParam('type', 'create');
    const idHanhTrinh = this.props.navigation.getParam('idHanhTrinh');
    const {idUserPick} = this.state;
    if (type === 'create') {
      await this.props.update_mem(this.state.idUserPick);
    } else if (type === 'update') {
      this.setState({
        loadingVisible: true,
      });
      await this.props.put_update_member(idHanhTrinh, idUserPick);
    }
  };
  onSelectItem = item => {
    let array = this.state.idUserPick;
    array.push(item._id);
    this.setState({
      idUserPick: array,
    });
  };
  onUnselectItem = item => {
    let array = this.state.idUserPick;
    let index = array.indexOf(item._id);
    array.splice(index, 1);
    this.setState({
      idUserPick: array,
    });
  };
  _renderItem = item => {
    let array = this.state.idUserPick;
    let found = array.find(e => e === item._id);
    let isSelect = found === undefined ? false : true;
    let avatar = item.avatar;
    if (avatar !== null) {
      avatar = BASE_URL + '/' + avatar;
    }
    return (
      <View style={styles.flatListItem}>
        <Image
          source={avatar === null ? constants.Images.IC_AVATAR1 : {uri: avatar}}
          style={{
            width: EStyleSheet.value('54rem'),
            height: EStyleSheet.value('54rem'),
          }}
        />
        <View style={styles.infoCol}>
          <Text style={styles.textName}>{item.display_name}</Text>
          <Text style={styles.textemail}>{item.email}</Text>
        </View>
        {isSelect ? (
          <TouchableOpacity
            style={styles.selectedButton}
            onPress={() => this.onUnselectItem(item)}>
            <Text style={{color: 'white'}}>Bỏ chọn</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => this.onSelectItem(item)}>
            <Text style={{color: 'white'}}>Chọn</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  render() {
    const {title, searchText, friend} = this.state;
    return (
      <View style={styles.container}>
        <Dialog visible={this.state.loadingVisible}>
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
                Đang tạo hành trình...
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <Dialog visible={this.state.loadingCompleted}>
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
                {this.state.message}
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <View style={styles.header}>
          <SearchBar
            title={title}
            onChangeText={this.setSearchText}
            value={searchText}
            isBack={true}
            onPressBack={this.onPressBack}
            placeHolder={'Tìm thành viên'}
          />
        </View>
        <View style={styles.content}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.textName,
                fontSize: EStyleSheet.value('18rem'),
              }}>
              Danh sách bạn bè
            </Text>
            <TouchableOpacity onPress={() => this.onPressDone()}>
              <Text
                style={{
                  color: '#1161D8',
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                }}>
                HOÀN TẤT
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flatList}>
            <FlatList
              contentContainerStyle={{
                paddingBottom: EStyleSheet.value('40rem'),
                flex: 0,
              }}
              data={friend}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({groupInfo, user}) => {
  return {
    groupInfo: groupInfo,
    user: user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    update_mem: parrams => dispatch(actions.update_mem(parrams)),
    put_update_member: (idHanhTrinh, member) =>
      dispatch(actions.put_update_member(idHanhTrinh, member)),
    reset_member: () => dispatch(actions.reset_member()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMemberScreen);

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '60rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  content: {paddingTop: '10rem', paddingHorizontal: '23rem'},
  textName: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
  },
  textemail: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  flatList: {marginTop: '10rem'},
  flatListItem: {
    flexDirection: 'row',
    marginVertical: '15rem',
  },
  infoCol: {justifyContent: 'space-around', paddingLeft: '10rem'},
  selectButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75rem',
    height: '35rem',
    backgroundColor: '#76B5FF',
    borderRadius: '17rem',
    top: '10rem',
    right: '0rem',
  },
  selectedButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75rem',
    height: '35rem',
    backgroundColor: '#34D374',
    borderRadius: '17rem',
    top: '10rem',
    right: '0rem',
  },
});
