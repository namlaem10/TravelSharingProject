import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import HeaderBar from '../../components/HeaderBar';
import {BASE_URL} from '../../services/URL';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/managerGroupReducer';
class MemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Danh sách thành viên',
      data: null,
      isLeader: false,
    };
  }
  UNSAFE_componentWillMount() {
    this.setState({
      data: this.props.navigation.getParam('data'),
      isLeader: this.props.navigation.getParam('isLeader'),
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER ||
      nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER_FAIL
    ) {
      if (nextProps.groupInfo.type === types.PUT_UPDATE_MEMBER) {
        this.setState({
          data: nextProps.groupInfo.data[0],
        });
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
  onLongPressItem(item) {
    const {data} = this.state;
    const user = this.props.user;
    let idHanhTrinh = data._id;
    let members = data.member;
    Alert.alert(
      'Xóa thành viên ' + item.display_name,
      'Bạn có chắc muốn xóa ' + item.display_name,
      [
        {
          text: 'Không',
          onPress: () => {
            console.log('cancel');
          },
        },
        {
          text: 'Xóa',
          onPress: async () => {
            let memberIds = [];
            let userId = user.data.user_info._id;
            members = members.filter(
              x => x._id !== item._id && x._id !== userId,
            );
            members.map(x => {
              memberIds.push(x._id);
            });
            await this.props.put_update_member(idHanhTrinh, memberIds);
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  _renderItems(array) {
    const {isLeader} = this.state;
    let render = [];
    if (isLeader) {
      array.map((item, index) => {
        let avatar = item.avatar;
        if (avatar !== null) {
          avatar = BASE_URL + '/' + avatar;
        }
        let renderItem = (
          <TouchableOpacity
            key={index}
            style={styles.memberItem}
            onLongPress={() => this.onLongPressItem(item)}>
            <Image
              source={
                avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
              }
              style={{
                width: EStyleSheet.value('84rem'),
                height: EStyleSheet.value('84rem'),
                borderRadius: EStyleSheet.value('42rem'),
              }}
            />
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.medium,
              }}>
              {item.display_name}
            </Text>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.regular,
                color: '#797979',
              }}>
              {item.phone}
            </Text>
          </TouchableOpacity>
        );
        render.push(renderItem);
      });
    } else {
      array.map((item, index) => {
        let avatar = item.avatar;
        if (avatar !== null) {
          avatar = BASE_URL + '/' + avatar;
        }
        let renderItem = (
          <View
            key={index}
            style={styles.memberItem}
            onLongPress={() => this.onLongPressItem(item)}>
            <Image
              source={
                avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
              }
              style={{
                width: EStyleSheet.value('84rem'),
                height: EStyleSheet.value('84rem'),
                borderRadius: EStyleSheet.value('42rem'),
              }}
            />
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.medium,
              }}>
              {item.display_name}
            </Text>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.regular,
                color: '#797979',
              }}>
              {item.phone}
            </Text>
          </View>
        );
        render.push(renderItem);
      });
    }
    return render;
  }
  render() {
    const {title, data, isLeader} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <HeaderBar title={title} onPressBack={this.onPressBack} />
          </View>
        </View>
        <View>
          {isLeader ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: EStyleSheet.value('27rem'),
                paddingTop: EStyleSheet.value('7rem'),
                height: EStyleSheet.value('40rem'),
              }}>
              <Text
                style={{
                  color: '#4285f4',
                  fontSize: EStyleSheet.value('16rem'),
                  fontFamily: constants.Fonts.medium,
                }}>
                Nhấn giữ thành viên để xóa
              </Text>
            </View>
          ) : null}
          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.memberGroup}>
              {this._renderItems(data.member)}
            </View>
          </ScrollView>
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
    put_update_member: (idHanhTrinh, member) =>
      dispatch(actions.put_update_member(idHanhTrinh, member)),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  memberGroup: {
    flexDirection: 'row',
    paddingHorizontal: '8rem',
    flexWrap: 'wrap',
  },
  memberItem: {
    height: '140rem',
    width: '85rem',
    marginHorizontal: '17rem',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5rem',
    marginBottom: '25rem',
  },
});
