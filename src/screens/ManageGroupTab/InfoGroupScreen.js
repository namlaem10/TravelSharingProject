import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/managerGroupReducer';
import HeaderBar from '../../components/HeaderBar';
import MemberScrollItem from '../../components/MemberScrollItem';

class InfoGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      data: null,
      isLeader: false,
      isWillGo: false,
    };
  }
  UNSAFE_componentWillMount() {
    let data = this.props.navigation.getParam('data');
    let user = this.props.user.data.user_info;
    let title = this.props.navigation.getParam('title');
    let isWillGo = this.props.navigation.getParam('isWillGo');
    let isLeader = false;
    if (user._id === data.member[0]._id) {
      isLeader = true;
    }
    this.setState({
      title: title,
      data: data,
      isLeader,
      isWillGo,
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
  _RenderScrollMemberItem = data => {
    let Items = [];
    let member = data.member;
    let count = 0;
    member.map(item => {
      Items.push(<MemberScrollItem key={item._id} data={item} count={count} />);
      count++;
    });
    return Items;
  };
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressAddMember = data => {
    let idHanhTrinh = data._id;
    let member = [];
    let user = this.props.user.data.user_info;
    data = data.member.filter(x => x._id !== user._id);
    data.map(item => {
      member.push(item._id);
    });
    this.props.navigation.navigate('AddMember', {
      location: 'InfoGroup',
      member: member,
      type: 'update',
      idHanhTrinh: idHanhTrinh,
      data: this.state.data,
      isLeader: this.state.isLeader,
      title: this.state.title,
      isWillGo: this.state.isWillGo,
    });
  };
  onPressMemberInfo = data => {
    this.props.navigation.navigate('Member', {
      location: 'InfoGroup',
      data: data,
      isLeader: this.state.isLeader,
    });
  };
  onPressTrackingButton = data => {
    this.props.navigation.navigate('TrackingMap', {
      location: 'InfoGroup',
      data: data,
      title: this.state.title,
    });
  };
  onPressChatting = data => {
    this.props.navigation.navigate('Chatting', {
      location: 'InfoGroup',
      data: data,
      isLeader: this.state.isLeader,
      title: this.state.title,
    });
  };
  render() {
    const {title, data, isLeader, isWillGo} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <HeaderBar title={title} onPressBack={this.onPressBack} />
          </View>
        </View>
        <View style={styles.memberGroup}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.memberScrollView}>
              {this._RenderScrollMemberItem(data)}
            </View>
          </ScrollView>
        </View>
        <View style={styles.settingGroup}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => this.onPressMemberInfo(data)}>
            <View style={styles.circleIcon}>
              <Image
                style={styles.iconVector}
                source={constants.Images.IC_MEMBER_WHITE}
              />
            </View>
            <Text
              style={{
                fontFamily: constants.Fonts.regular,
                fontSize: EStyleSheet.value('15rem'),
              }}>
              Thông tin thành viên
            </Text>
          </TouchableOpacity>
          {isLeader ? (
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => this.onPressAddMember(data)}>
              <View style={styles.circleIcon}>
                <Image
                  style={styles.iconVector}
                  source={constants.Images.IC_ADD_MEMBER_WHITE}
                />
              </View>
              <Text
                style={{
                  fontFamily: constants.Fonts.regular,
                  fontSize: EStyleSheet.value('15rem'),
                }}>
                Thêm thành viên
              </Text>
            </TouchableOpacity>
          ) : null}
          {!isWillGo ? null : (
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => {
                this.onPressTrackingButton(data);
              }}>
              <View style={styles.circleIcon}>
                <Image
                  style={styles.iconVector}
                  source={constants.Images.IC_TRACKING_LOCATION_WHITE}
                />
              </View>
              <Text
                style={{
                  fontFamily: constants.Fonts.regular,
                  fontSize: EStyleSheet.value('15rem'),
                }}>
                Theo dõi nhóm
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => this.onPressChatting(data)}>
            <View style={styles.circleIcon}>
              <Image
                style={styles.iconVector}
                source={constants.Images.IC_COMMENT_WHITE}
              />
            </View>
            <Text
              style={{
                fontFamily: constants.Fonts.regular,
                fontSize: EStyleSheet.value('15rem'),
              }}>
              Trò chuyện nhóm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({user, groupInfo}) => {
  return {
    user: user,
    groupInfo: groupInfo,
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     get_own: () => dispatch(actions.get_own()),
//   };
// };
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps)(InfoGroupScreen);
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
  memberGroup: {
    backgroundColor: 'white',
    height: '100rem',
    width: '100%',
    marginVertical: '25rem',
    borderBottomWidth: '0.3rem',
    borderTopWidth: '0.3rem',
    borderColor: '#CDCDCD',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '13rem',
  },
  memberScrollView: {
    flexDirection: 'row',
  },
  settingGroup: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: '0.3rem',
    borderTopWidth: '0.3rem',
    borderColor: '#CDCDCD',
    height: '350rem',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: '20rem',
    paddingVertical: '20rem',
  },
  settingItem: {
    backgroundColor: 'white',
    borderRadius: '10rem',
    height: '153rem',
    width: '161rem',
    //shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 16,

    // elevation: 6,
    borderWidth: 1,
    borderColor: '#DADDE1',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '20rem',
    marginBottom: '20rem',
  },
  circleIcon: {
    height: '60rem',
    width: '60rem',
    borderRadius: '30rem',
    backgroundColor: '#34D374',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconVector: {
    height: '35rem',
    width: '35rem',
    resizeMode: 'contain',
  },
});
