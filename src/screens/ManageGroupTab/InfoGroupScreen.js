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
import {actions, types} from '../../redux/reducers/UserReducer';
import {BASE_URL} from '../../services/URL';
import HeaderBar from '../../components/HeaderBar';
import MemberScrollItem from '../../components/MemberScrollItem';

var data = [
  {
    _id: 'USER01',
    email: 'test@gmail.com',
    display_name: 'Nam Ngu',
    phone: '0123546789',
    avatar: 'uploads/fd72eff14fe22bc10f1b35e59f82f6f3.png',
  },
  {
    _id: 'USER02',
    email: 'test2@gmail.com',
    display_name: 'Manager 2',
    phone: '0912313333',
    avatar: null,
  },
  {
    _id: 'USER03',
    email: 'test3@gmail.com',
    display_name: 'Manager 3',
    phone: '0911111111',
    avatar: null,
  },
];

export default class InfoGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Hồ Chí Minh - Đà Lạt',
    };
  }
  _RenderScrollMemberItem = () => {
    let Items = [];
    let member = data;
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
      console.log(location);
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressMemberInfo = () => {
    this.props.navigation.navigate('Member', {location: 'InfoGroup'});
  };
  render() {
    const {title} = this.state;
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
              {this._RenderScrollMemberItem()}
            </View>
          </ScrollView>
        </View>
        <View style={styles.settingGroup}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => this.onPressMemberInfo()}>
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
            <TouchableOpacity style={styles.settingItem}>
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={styles.settingItem}>
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
            <TouchableOpacity style={styles.settingItem}>
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
      </View>
    );
  }
}
// const mapStateToProps = ({user}) => {
//   return {
//     user: user,
//   };
// };
// // const mapDispatchToProps = dispatch => {
// //   return {
// //     login: parrams => dispatch(actions.login(parrams)),
// //     reset: () => dispatch(actions.reset()),
// //   };
// // };
// // eslint-disable-next-line prettier/prettier
// export default connect(mapStateToProps)(InfoGroupScreen);
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
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: '0.3rem',
    borderTopWidth: '0.3rem',
    borderColor: '#CDCDCD',
    height: '350rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: '20rem',
    paddingVertical: '12rem',
  },
  settingItem: {
    backgroundColor: 'white',
    borderRadius: '10rem',
    height: '153rem',
    width: '161rem',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,

    elevation: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '20rem',
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
    height: '45rem',
    width: '45rem',
  },
});
