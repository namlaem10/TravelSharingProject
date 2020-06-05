import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import TitleBarCustom from '../../components/TitleBarCustom';

import TimeLineDetailPersonal from '../../components/TimeLineDetailPersonal';
import CustomTabBar from '../../components/CustomTabBar';
import moment from 'moment';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/detailLichTrinhReducer.js';

const tabStyle = {};
class ShareTimeLineDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeData: [],
      isLoading: true,
      loadingVisible: false,
      schedule_detail: null,
      loadingCompleted: false,
      message: '',
      totalDay: 0,
    };
  }

  async componentWillMount() {
    const data = await this.props.navigation.getParam('data'); // schedule detail de hien thi ra
    const totalDay = await this.props.navigation.getParam('totalDay');
    this.setState({
      schedule_detail: data,
      totalDay: totalDay,
    });
    this.props.get_location_info(data, totalDay); // de lay info cua cai ngày đó. ví dụ từ điểm này qua điểm kia bao xa, bao lâu
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.detailLichTrinh.type === types.POST_HANHTRINH ||
      nextProps.detailLichTrinh.type === types.POST_HANHTRINH_FAIL
    ) {
      /// no se chay cai nay co check fail ko, neu m thich
      if (nextProps.detailLichTrinh.type === types.POST_HANHTRINH) {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Đã tạo xong!',
        });
        setTimeout(() => {
          this.setState({
            loadingCompleted: false,
          });
          this.props.navigation.navigate('TripDetail', {
            data: nextProps.detailLichTrinh.data[0],
          });
        }, 1500);
      } else {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Lỗi tạo hành trình!',
        });
      }
    } else if (
      nextProps.detailLichTrinh.type === types.DELETE_SCHEDULE_DETAIL_ITEM ||
      nextProps.detailLichTrinh.type === types.DELETE_SCHEDULE_DETAIL_ITEM_FAIL
    ) {
      this.setState({
        schedule_detail: nextProps.detailLichTrinh.data,
      });
      this.props.get_location_info(
        nextProps.detailLichTrinh.data,
        this.state.totalDay,
      );
    } else if (
      nextProps.detailLichTrinh.type === types.GET_LOCATION_INFO ||
      nextProps.detailLichTrinh.type === types.GET_LOCATION_INFO_FAIL
    ) {
      this.setState({
        routeData: nextProps.detailLichTrinh.data,
        isLoading: false,
      });
    } else if (nextProps.detailLichTrinh.type === types.ADD_LANDSCAPES) {
      this.setState({
        schedule_detail: nextProps.detailLichTrinh.data.schedule_detail,
        routeData: nextProps.detailLichTrinh.data.routes,
      });
    }
  }
  onDragEnd = (dataDay, keyday) => {
    const data = this.props.navigation.getParam('data');
    data[keyday] = dataDay;
    this.setState({
      schedule_detail: data,
    });
    this.props.get_location_info(data, this.state.totalDay);
  };
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressDeleteItem = (itemId, keyDay) => {
    Alert.alert(
      'Lưu ý',
      'Bạn có chắc muốn xóa địa điểm này',
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            const {schedule_detail} = this.state;
            this.props.delete_schedule_detail_item(
              schedule_detail,
              keyDay,
              itemId,
            );
          },
        },
      ],
      {cancelable: false},
    );
  };
  onPressMap = (routeData, data) => {
    let routing = [];
    let points = [];
    routeData.leg.map(item => {
      item.maneuver.map(subItem => {
        routing.push(subItem.position);
      });
    });
    data.map(item => {
      points.push(item.location);
    });
    this.props.navigation.navigate('Map', {
      routing: routing,
      data: data,
      points: points,
    });
  };
  _renderItem = () => {
    let array = [];
    let countday = 0;
    const {routeData, schedule_detail} = this.state;
    const totalDay = this.props.navigation.getParam('totalDay');
    let startDate = this.props.navigation.getParam('start');
    const isGone = this.props.navigation.getParam('isGone', false);
    const action = this.props.navigation.getParam('action', 'default');
    for (let i = 1; i <= totalDay; i++) {
      let dataItem = schedule_detail['day_' + i];
      let routeDataItem = routeData[i - 1];
      let date = moment(startDate).format('DD/MM/YYYY');
      let day = date.split('/')[0];
      let month = date.split('/')[1];
      let lable = day + '.' + month;
      startDate = moment(startDate).add(1, 'day');
      countday++;
      array.push(
        <TimeLineDetailPersonal
          key={'day_' + i}
          keyDay={'day_' + i}
          data={dataItem}
          routeData={routeDataItem}
          tabLabel={lable}
          day={countday}
          isGone={isGone}
          onPressAddPlace={this.onPressAddPlace}
          onPressDeleteItem={this.onPressDeleteItem}
          action={action}
          onDragEnd={this.onDragEnd}
          onPressMap={this.onPressMap}
        />,
      );
    }
    return array;
  };
  onPressNext = () => {
    this.props.navigation.navigate('CreatePost', {
      idHanhTrinh: this.props.navigation.getParam('idHanhTrinh'),
      background: this.props.navigation.getParam('background'),
    });
  };
  onPressCompleted = async () => {
    this.setState({
      loadingVisible: true,
    });
    let scheduleDetail = this.state.schedule_detail;
    let startDate = this.props.navigation.getParam('start');
    let endDate = this.props.navigation.getParam('end');
    let startPlace = this.props.navigation.getParam('startPlace');
    let endPlace = this.props.navigation.getParam('endPlace');
    let memsId = this.props.navigation.getParam('memsId');
    let nums_of_day = this.props.navigation.getParam('totalDay');
    const data = {
      departure: startPlace._id,
      destination: endPlace._id,
      start_day: moment(startDate).format('YYYY-MM-DD'),
      end_day: moment(endDate).format('YYYY-MM-DD'),
      rating: 0,
      title: null,
      description: null,
      price: 2500000,
      schedule_detail: scheduleDetail,
      nums_of_day,
      member: memsId,
    };
    await this.props.post_hanhtrinh(data);
  };
  onPressAddPlace = keyDay => {
    let endPlace = this.props.navigation.getParam('endPlace');
    const {schedule_detail} = this.state;
    this.props.navigation.navigate('AddPlaceDetail', {
      destinationId: endPlace._id,
      keyDay: keyDay,
      schedule_detail: schedule_detail,
      totalDay: this.state.totalDay,
    });
  };
  render() {
    const action = this.props.navigation.getParam('action', 'default');
    const page = this.props.navigation.getParam('page', 1) - 1;
    const {isLoading} = this.state;
    return (
      <View style={styles.container}>
        <Dialog visible={this.state.loadingVisible}>
          <DialogContent>
            <View style={styles.loadingCompleted}>
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
                Đang tạo hành trình...
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <Dialog visible={this.state.loadingCompleted}>
          <DialogContent>
            <View style={styles.loadingCompleted}>
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
                {this.state.message}
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={require('../../assets/images/vinhhalong.jpeg')}
            style={{
              width: '100%',
              height: '100%',
            }}>
            <TitleBarCustom onPress={this.onPressBack} />
          </ImageBackground>
        </View>
        <ScrollableTabView
          initialPage={page}
          showsHorizontalScrollIndicator={false}
          renderTabBar={() => (
            <CustomTabBar
              activeTextColor={'#34D374'}
              inactiveTextColor={'#B7B7B7'}
              tabStyle={tabStyle}
              backgroundColor={'white'}
            />
          )}>
          {isLoading ? (
            <ActivityIndicator
              size={EStyleSheet.value('60rem')}
              color="#34D374"
            />
          ) : (
            this._renderItem()
          )}
        </ScrollableTabView>
        <View style={styles.footer}>
          {action === 'sharing' ? (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressNext()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('16rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          ) : action === 'creating' ? (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressCompleted()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('16rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Hoàn thành
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({detailLichTrinh}) => {
  return {
    detailLichTrinh: detailLichTrinh,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_location_info: (params, number) =>
      dispatch(actions.get_location_info(params, number)),
    post_hanhtrinh: params => dispatch(actions.post_hanhtrinh(params)),
    delete_schedule_detail_item: (schedule_detail, keyDay, itemId) =>
      dispatch(
        actions.delete_schedule_detail_item(schedule_detail, keyDay, itemId),
      ),
    reset: () => dispatch(actions.reset()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareTimeLineDetailScreen);
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  backgroundHeader: {
    height: '120rem',
  },
  confirmButton: {
    width: '300rem',
    height: '40rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10rem',
  },
  loadingCompleted: {
    paddingTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: EStyleSheet.value('80rem'),
    width: EStyleSheet.value('200rem'),
  },
});
