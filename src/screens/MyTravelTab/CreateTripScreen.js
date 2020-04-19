/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import {actions, types} from '../../redux/reducers/myTravelPlaceReducer';
import DatePicker from 'react-native-date-picker';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';
import {schedule_detail} from '../../utils/fakedata';
import moment from 'moment';

EStyleSheet.build({$rem: constants.WIDTH / 380});

import HeaderBar from '../../components/HeaderBar';
const miliToSecond = 86400000;
class CreateTripScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Tạo lịch trình',
      startDate: null,
      endDate: null,
      visible: false,
      isStartDate: true,
      nameText: '',
      loadingVisible: false,
    };
  }
  UNSAFE_componentWillMount = () => {
    this.props.resetEnd();
    this.props.resetStart();
    var startDate = new Date();
    var endDate = moment(startDate).add(2, 'day');
    this.setState({startDate: startDate, endDate: endDate});
  };
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      console.log('back');
      this.props.navigation.navigate(location);
    } else {
      console.log('back');
      this.props.navigation.goBack();
    }
  };
  onPressPlace = item => {
    console.log('press', item.id);
  };
  onPressStartPlace = () => {
    this.props.navigation.navigate('AddPlace', {
      isStart: true,
    });
  };
  onPressEndPlace = () => {
    this.props.navigation.navigate('AddPlace', {
      isStart: false,
    });
  };
  onPressDate = isStart => {
    //check bấm start hay end dat, hiện popup tương ứng
    this.setState({isStartDate: isStart, visible: true});
  };
  choseStartDate = value => {
    this.setState({startDate: value, endDate: moment(value).add(2, 'day')});
  };
  choseEndDate = value => {
    const {startDate} = this.state;
    let endDate = value;
    if ((endDate - startDate) / miliToSecond <= -0.5) {
      Alert.alert(
        'Lưu ý',
        'Xin lỗi bạn :(. Hành trình cần ít nhất 1 ngày',
        [
          {
            text: 'Chọn lại',
            onPress: () =>
              this.setState({
                endDate: startDate,
              }),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else if ((endDate - startDate) / miliToSecond > 6) {
      Alert.alert(
        'Lưu ý',
        'Xin lỗi bạn :(. Hành trình chỉ được tối đa 7 ngày',
        [
          {
            text: 'Chọn lại',
            onPress: () =>
              this.setState({
                endDate: moment(startDate).add(6, 'day'),
              }),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      this.setState({endDate: value});
    }
  };
  onPressConfirm = () => {
    this.setState({loadingVisible: true});
    const {startPlace, endPlace, memsId} = this.props;
    if (startPlace.data === null || endPlace.data === null) {
      this.setState({loadingVisible: false});
      Alert.alert(
        'Lưu ý',
        'Bạn chưa chọn điểm xuất phát hoặc điểm đến',
        [
          {
            text: 'Trở lại',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      const {startDate, endDate} = this.state;
      let number_of_days = Math.round((endDate - startDate) / miliToSecond) + 1;
      if (number_of_days <= 0) {
        number_of_days = 1;
      }
      let scheduleDetail = schedule_detail;
      this.props.navigation.navigate('ShareTimeLineDetail', {
        action: 'creating',
        data: scheduleDetail,
        page: 1,
        totalDay: number_of_days,
        start: startDate,
        end: endDate,
        isGone: false,
        startPlace: startPlace.data,
        endPlace: endPlace.data,
        memsId: memsId.data,
      });
    }
    this.setState({loadingVisible: false});
  };
  onPressMember = () => {
    this.props.navigation.navigate('AddMember', {location: 'CreateTrip'});
  };
  render() {
    const {title, startDate, endDate, isStartDate, nameText} = this.state;
    const {startPlace, endPlace, memsId} = this.props;
    const MemberGroup = memsId.data.length;
    const start = moment(startDate).format('DD/MM/YYYY');
    const end = moment(endDate).format('DD/MM/YYYY');
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
                Đang tạo lịch trình...
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <Dialog
          visible={this.state.visible}
          footer={
            <DialogFooter>
              <DialogButton
                text="Chọn"
                onPress={() => {
                  this.setState({
                    visible: false,
                  });
                }}
              />
            </DialogFooter>
          }
          onTouchOutside={() => {
            this.setState({visible: false});
          }}>
          <DialogContent>
            <DatePicker
              locale={'vi'}
              date={isStartDate ? startDate : endDate}
              mode="date"
              onDateChange={value => {
                isStartDate
                  ? this.choseStartDate(value)
                  : this.choseEndDate(value);
              }}
            />
          </DialogContent>
        </Dialog>
        <HeaderBar title={title} onPressBack={this.onPressBack} />
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Image
              source={constants.Images.IC_MY_LOCATION}
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
              }}
            />
            {startPlace.data !== null ? (
              <View style={styles.TouchGroup}>
                <Text style={styles.label}>Điểm xuất phát</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressStartPlace();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: '80%',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: EStyleSheet.value('25rem'),
                      right: EStyleSheet.value('13rem'),
                    }}>
                    <Text style={{color: '#1161D8'}}> Chỉnh sửa </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.inputText,
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    {startPlace.data.destination_name}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.TouchGroup}>
                <Text style={styles.label}>Điểm xuất phát</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressStartPlace();
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
                    Nhấp để chọn điểm xuất phát
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.inputGroup}>
            <Image
              source={constants.Images.IC_LOCATION}
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
              }}
            />
            {endPlace.data !== null ? (
              <View style={styles.TouchGroup}>
                <Text style={styles.label}>Điểm Đến</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressEndPlace();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: '80%',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: EStyleSheet.value('25rem'),
                      right: EStyleSheet.value('13rem'),
                    }}>
                    <Text style={{color: '#1161D8'}}> Chỉnh sửa </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.inputText,
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    {endPlace.data.destination_name}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.TouchGroup}>
                <Text style={styles.label}>Điểm đến</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressEndPlace();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: '80%',
                  }}>
                  <Text
                    style={{
                      ...styles.placeholder,
                      color: '#959595',
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    Nhấp để chọn điểm đến
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.inputGroup}>
            <Image
              source={constants.Images.IC_CALENDAR}
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
              }}
            />
            <View style={styles.DateGroup}>
              <Text style={styles.label}>Ngày khởi hành</Text>
              <TouchableOpacity
                onPress={() => {
                  this.onPressDate(true);
                }}
                style={{
                  justifyContent: 'center',
                  height: '80%',
                }}>
                <Text
                  style={{
                    ...styles.inputText,
                    paddingLeft: EStyleSheet.value('2rem'),
                  }}>
                  {start}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.DateGroup}>
              <Text style={styles.label}>Ngày kết thúc</Text>
              <TouchableOpacity
                onPress={() => {
                  this.onPressDate(false);
                }}
                style={{
                  justifyContent: 'center',
                  height: '80%',
                }}>
                <Text
                  style={{
                    ...styles.inputText,
                    paddingLeft: EStyleSheet.value('2rem'),
                  }}>
                  {end}
                </Text>
              </TouchableOpacity>
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
            <View style={styles.TouchGroup}>
              <Text style={styles.label}>Thành viên nhóm</Text>
              {MemberGroup > 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    this.onPressMember();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: EStyleSheet.value('50rem'),
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: EStyleSheet.value('25rem'),
                      right: EStyleSheet.value('13rem'),
                    }}>
                    <Text style={{color: '#1161D8'}}> Chỉnh sửa </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.inputText,
                      paddingLeft: EStyleSheet.value('2rem'),
                    }}>
                    {MemberGroup} người
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.onPressMember();
                  }}
                  style={{
                    justifyContent: 'center',
                    height: EStyleSheet.value('50rem'),
                  }}>
                  <Text
                    style={{
                      ...styles.placeholder,
                      color: '#959595',
                    }}>
                    Nhấp để thêm thành viên
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* <View style={styles.TouchGroup1}>
            <TextInput
              onChangeText={text => this.setState({nameText: text})}
              style={nameText !== '' ? styles.inputText : styles.placeholder}
              placeholder={'Nhấp để nhập tên nhóm'}
              value={nameText}
            />
          </View> */}
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
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({startPlace, endPlace, membersId}) => {
  return {
    startPlace: startPlace,
    endPlace: endPlace,
    memsId: membersId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    resetStart: () => dispatch(actions.resetStart()),
    resetEnd: () => dispatch(actions.resetEnd()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTripScreen);
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
    height: '35rem',
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
  TouchGroup: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '65rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    width: '320rem',
    marginLeft: '10rem',
  },
  TouchGroup1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '45rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    width: '320rem',
    marginLeft: '43rem',
  },
  DateGroup: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '80rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    width: '150rem',
    marginLeft: '10rem',
  },
  inputText: {
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.regular,
  },
  placeholder: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
  },
  label: {
    fontSize: constants.FontSizes.normal,
  },
  loadingCompleted: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: EStyleSheet.value('95rem'),
    width: EStyleSheet.value('250rem'),
    backgroundColor: 'white',
  },
});
