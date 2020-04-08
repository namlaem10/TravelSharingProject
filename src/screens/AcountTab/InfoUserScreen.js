import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import TitleBarCustom from '../../components/TitleBarCustom';
import {connect} from 'react-redux';
import {BASE_URL} from '../../services/URL';
class InfoUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const user = this.props.user.data;
    let avatar = BASE_URL + '/' + user.avatar;
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={require('../../assets/images/vinhhalong.jpeg')}
            style={{width: '100%', height: '100%'}}>
            <TitleBarCustom onPress={this.onPressBack} />
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
          <Text style={styles.textTitle}>{user.displayName}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.editInfo()}>
            <Text
              style={{
                fontSize: EStyleSheet.value('13rem'),
                fontFamily: constants.Fonts.medium,
                color: 'white',
              }}>
              Chỉnh sửa thông tin
            </Text>
          </TouchableOpacity>
          <View style={styles.subInfo}>
            <Text style={styles.subText}>Email: {user.email}</Text>
            <Text style={styles.subText}>Điện thoại: {user.phone}</Text>
          </View>
        </View>
        <View style={styles.lastInfoGroup}>
          <View style={styles.lastInfoItem}>
            <Text style={{...styles.number, color: '#1161D8'}}>100</Text>
            <Text>Lịch trình</Text>
          </View>
          <View style={styles.lastInfoItem}>
            <Text style={{...styles.number, color: '#34D374'}}>69</Text>
            <Text>Bài viết</Text>
          </View>
          <View style={styles.lastInfoItem}>
            <Text
              style={{
                ...styles.number,
                color: 'rgba(255,0,0,0.54)',
              }}>
              1234
            </Text>
            <Text>Lượt thích</Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            left: '39%',
            top: EStyleSheet.value('150rem'),
          }}>
          <Image style={styles.avatar} source={{uri: avatar}} />
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
    marginTop: '5rem',
    width: '200rem',
    height: '25rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
  },
  subText: {
    fontSize: constants.FontSizes.tabTitle,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  number: {
    fontSize: constants.FontSizes.startTitle,
    fontFamily: constants.Fonts.regular,
  },
  subInfo: {
    backgroundColor: 'white',
    width: '100%',
    height: '40rem',
    paddingTop: '10rem',
    flexDirection: 'row',
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
