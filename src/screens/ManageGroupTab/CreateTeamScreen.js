import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {actions, types} from '../../redux/reducers/managerGroupReducer';

import HeaderBar from '../../components/HeaderBar';

class CreateTeamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameText: '',
      title: 'Tạo nhóm du lịch',
      trip: null,
      member: [],
    };
  }
  UNSAFE_componentWillMount = () => {
    this.props.reset();
  };
  onSearchChangeText = text => {
    this.setState({
      nameText: text,
    });
  };
  onPressBack = () => {
    this.props.navigation.goBack();
  };
  onPressMember = () => {
    this.props.navigation.navigate('AddMember');
  };
  onPressTrip = () => {
    this.props.navigation.navigate('AddTrip');
  };
  onPressConfirm = () => {
    console.log('confirm');
  };
  render() {
    const {nameText, title, trip, member} = this.state;
    const haveTrip = trip;
    const MemberGroup = member.length;
    return (
      <View style={styles.container}>
        <HeaderBar title={title} onPressBack={this.onPressBack} />
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Image
              source={constants.Images.IC_CREATE}
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
              }}
            />
            <View style={styles.TextGroup}>
              <Text style={styles.label}>Tên nhóm</Text>
              <TextInput
                onChangeText={text => this.onSearchChangeText(text)}
                style={nameText !== '' ? styles.inputText : styles.placeholder}
                placeholder={'Nhấp để nhập tên nhóm'}
                value={nameText}
                autoFocus={true}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Image
              source={constants.Images.IC_MANAGEGROUP_DEACTIVE}
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
              }}
            />
            {MemberGroup > 0 ? (
              <View style={styles.TouchGroup}>
                <Text style={styles.label}>Thành viên nhóm</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressMember();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: '80%',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: EStyleSheet.value('35rem'),
                      right: EStyleSheet.value('5rem'),
                    }}>
                    <Text style={{color: '#1161D8'}}> Chỉnh sửa </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.textPlace,
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    {MemberGroup} người
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.TextGroup}>
                <Text style={styles.label}>Thành viên nhóm</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressMember();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      ...styles.placeholder,
                      color: '#959595',
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    Nhấp để thêm thành viên
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.inputGroup}>
            <Image
              source={constants.Images.IC_EARTH}
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
              }}
            />
            {haveTrip !== null ? (
              <View style={styles.TouchGroup}>
                <Text style={styles.label}>Lịch trình</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressTrip();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: '80%',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: EStyleSheet.value('35rem'),
                      right: EStyleSheet.value('5rem'),
                    }}>
                    <Text style={{color: '#1161D8'}}> Chỉnh sửa </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.textPlace,
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    {haveTrip.place}
                  </Text>
                  <Text
                    style={{
                      ...styles.textTime,
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    {haveTrip.time}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.TextGroup}>
                <Text style={styles.label}>Lịch trình</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressTrip();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: '100%',
                  }}>
                  <Text
                    style={{
                      ...styles.placeholder,
                      color: '#959595',
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    Nhấp để chọn lịch trình
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => this.onPressConfirm()}>
            <Text
              style={{
                fontSize: EStyleSheet.value('15rem'),
                fontFamily: constants.Fonts.medium,
                color: 'white',
              }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({groupInfo}) => {
  return {
    groupInfo: groupInfo,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reset: () => dispatch(actions.reset()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTeamScreen);

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    backgroundColor: 'white',
    width: '100%',
    height: '55rem',
    position: 'absolute',
    top: '575rem',
    borderColor: 'transparent', // Required to show shadows on Android for some reason !?!?
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: '5rem',

    elevation: '15rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: '300rem',
    height: '40rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: '10rem',
    paddingHorizontal: '13rem',
  },
  inputGroup: {
    marginVertical: '10rem',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  TextGroup: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '65rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    width: '320rem',
    marginLeft: '10rem',
  },
  TouchGroup: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '80rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    width: '320rem',
    marginLeft: '10rem',
  },
  inputText: {
    height: '45rem',
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.medium,
  },
  placeholder: {
    height: '45rem',
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
  },
  label: {
    fontSize: constants.FontSizes.normal,
  },
  textPlace: {
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.regular,
  },
  textTime: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
  },
});
