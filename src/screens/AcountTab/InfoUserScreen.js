import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import TitleBarCustom from '../../components/TitleBarCustom';
import {connect} from 'react-redux';
import {types} from '../../redux/reducers/UserReducer';
class InfoUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.data.user_info || null,
      total_travel: this.props.user.data.total_travel || null,
      travel_share: this.props.user.data.travel_share || null,
      rating_point: this.props.user.data.rating_point || null,
      people_rating: this.props.user.data.people_rating || null,
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
          await this.setState({
            user: this.props.user.data.user_info || null,
            total_travel: this.props.user.data.total_travel || null,
            travel_share: this.props.user.data.travel_share || null,
            rating_point: this.props.user.data.rating_point || null,
            people_rating: this.props.user.data.people_rating || null,
            avatar: this.props.user.data.user_info.avatar
              ? this.props.user.data.user_info.avatar
              : null,
          });
        }
      },
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.user.type === types.UPDATE_INFO) {
      this.setState({user: nextProps.user.data.user_info});
    }
    if (nextProps.user.type === types.ADD_FRIEND) {
      this.setState({user: nextProps.user.data.user_info});
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
  editInfo = () => {
    this.props.navigation.navigate('EditInfo');
  };
  render() {
    const {
      user,
      rating_point,
      people_rating,
      travel_share,
      total_travel,
      avatar,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={require('../../assets/images/vinhhalong.jpeg')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}>
            <TitleBarCustom
              onPress={this.onPressBack}
              onPressMore={() => null}
            />
          </ImageBackground>
        </View>
        <View
          style={{
            paddingTop: EStyleSheet.value('40rem'),
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text style={styles.textTitle}>{user.display_name}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.editInfo()}>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.medium,
                color: 'white',
              }}>
              Chỉnh sửa thông tin
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lastInfoGroup}>
          <View style={styles.lastInfoItem}>
            <Text style={{...styles.number, color: '#1161D8'}}>
              {total_travel === null ? 0 : total_travel}
            </Text>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.light,
              }}>
              Lịch trình
            </Text>
          </View>
          <View style={styles.lastInfoItem}>
            <Text style={{...styles.number, color: '#34D374'}}>
              {travel_share === null ? 0 : travel_share}
            </Text>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.light,
              }}>
              Bài viết
            </Text>
          </View>
          <View style={styles.lastInfoItem}>
            <Text
              style={{
                ...styles.number,
                color: 'rgba(255,0,0,0.54)',
              }}>
              {rating_point === null ? 0 : rating_point}
              <Text>/5</Text>
            </Text>
            <Text
              style={{
                fontSize: EStyleSheet.value('14rem'),
                fontFamily: constants.Fonts.light,
              }}>
              Đánh giá ({people_rating === null ? 0 : people_rating})
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            left: '39%',
            top: EStyleSheet.value('150rem'),
          }}>
          <Image
            style={styles.avatar}
            source={
              avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
            }
          />
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
export default connect(mapStateToProps)(InfoUserScreen);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  backgroundHeader: {
    height: '195rem',
  },
  avatar: {
    width: '85rem',
    height: '85rem',
    borderRadius: '42.5rem',
    borderColor: 'white',
    borderWidth: '1rem',
  },
  editButton: {
    marginTop: '15rem',
    width: '200rem',
    height: '35rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.medium,
    marginTop: '5rem',
  },
  subText: {
    fontSize: constants.FontSizes.normal,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  number: {
    fontSize: constants.FontSizes.startTitle,
    fontFamily: constants.Fonts.regular,
    marginBottom: '10rem',
  },
  subInfo: {
    backgroundColor: 'white',
    width: '100%',
    height: '40rem',
    paddingVertical: '10rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: EStyleSheet.value('10rem'),
    paddingHorizontal: EStyleSheet.value('13rem'),
    borderBottomWidth: '0.3rem',
    borderColor: '#CDCDCD',
  },
  lastInfoGroup: {
    width: '100%',
    height: '100rem',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lastInfoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
