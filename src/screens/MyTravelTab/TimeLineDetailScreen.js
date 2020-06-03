import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

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
import Dialog, {DialogContent} from 'react-native-popup-dialog';
const tabStyle = {};
class TimeLineDetailScreen extends Component {
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
      isGone: false,
      startDate: null,
      idHanhTrinh: null,
      isShare: false,
      isLeader: false,
    };
  }
  UNSAFE_componentWillMount = () => {
    const data = this.props.navigation.getParam('data');
    const totalDay = this.props.navigation.getParam('totalDay');
    let startDate = this.props.navigation.getParam('start');
    const routeData = this.props.navigation.getParam('routeData');
    const isGone = this.props.navigation.getParam('isGone', false);
    const idHanhTrinh = this.props.navigation.getParam('idHanhTrinh');
    const isShare = this.props.navigation.getParam('isShare', false);
    const isLeader = this.props.navigation.getParam('isLeader');
    this.setState({
      routeData,
      schedule_detail: data,
      totalDay,
      isGone,
      startDate,
      idHanhTrinh,
      isShare,
      isLeader,
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.detailLichTrinh.type === types.ADD_LANDSCAPES) {
      this.setState({
        schedule_detail: nextProps.detailLichTrinh.data.schedule_detail,
        routeData: nextProps.detailLichTrinh.data.routes,
      });
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
    } else if (
      nextProps.detailLichTrinh.type === types.UPDATE_SCHEDULE_DETAIL
    ) {
      this.setState({
        loadingVisible: false,
        loadingCompleted: true,
        message: 'Đã lưu! đang chuyển màn hình',
      });
      setTimeout(() => {
        this.setState({
          loadingCompleted: false,
        });
        this.props.navigation.navigate('TripDetail', {
          data: nextProps.detailLichTrinh.data,
        });
      }, 1500);
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
  onDragEnd = (dataDay, keyday) => {
    const data = this.props.navigation.getParam('data');
    data[keyday] = dataDay;
    this.setState({
      schedule_detail: data,
    });
    this.props.get_location_info(data, this.state.totalDay);
  };
  onPressRating = data => {
    this.props.navigation.navigate('Rating', {data});
  };
  _renderItem = () => {
    let array = [];
    let countday = 0;
    const {
      schedule_detail,
      totalDay,
      startDate,
      routeData,
      isGone,
    } = this.state;
    let start_date = startDate;
    for (let i = 1; i <= totalDay; i++) {
      let dataItem = schedule_detail['day_' + i];
      let routeDataItem = routeData[i - 1];
      let date = moment(start_date).format('DD/MM/YYYY');
      let day = date.split('/')[0];
      let month = date.split('/')[1];
      let lable = day + '.' + month;
      start_date = moment(start_date).add(1, 'day');
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
          isLeader={this.state.isLeader}
          onDragEnd={this.onDragEnd}
          onPressMap={this.onPressMap}
          onPressRating={this.onPressRating}
        />,
      );
    }
    return array;
  };
  onPressShare = () => {
    this.props.navigation.navigate('CreatePost', {
      idHanhTrinh: this.state.idHanhTrinh,
      background: this.props.navigation.getParam('background'),
    });
  };
  onPressCompleted = () => {
    this.setState({loadingVisible: true});
    const {schedule_detail, totalDay, idHanhTrinh} = this.state;
    this.props.update_schedule_detail(schedule_detail, idHanhTrinh, totalDay);
  };
  onPressAddPlace = keyDay => {
    let schedule_detail = this.props.navigation.getParam('data');
    let destinationId = this.props.navigation.getParam('destinationId');
    this.props.navigation.navigate('AddPlaceDetail', {
      destinationId: destinationId,
      keyDay: keyDay,
      schedule_detail: schedule_detail,
      totalDay: this.props.navigation.getParam('totalDay'),
    });
  };

  render() {
    const page = this.props.navigation.getParam('page', 1) - 1;
    const isGone = this.props.navigation.getParam('isGone', false);
    //trừ 1 vì Tính từ 0, nhưng page lấy từ 1
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
                Đang lưu hành trình...
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
          {this._renderItem()}
        </ScrollableTabView>
        {!this.state.isLeader ? null : isGone ? (
          this.state.isShare ? null : (
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => this.onPressShare()}>
                <Text
                  style={{
                    fontSize: EStyleSheet.value('16rem'),
                    fontFamily: constants.Fonts.medium,
                    color: 'white',
                  }}>
                  Chia sẻ
                </Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressCompleted()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('16rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Lưu
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    delete_schedule_detail_item: (schedule_detail, keyDay, itemId) =>
      dispatch(
        actions.delete_schedule_detail_item(schedule_detail, keyDay, itemId),
      ),
    get_location_info: (params, number) =>
      dispatch(actions.get_location_info(params, number)),
    reset: () => dispatch(actions.reset()),
    update_schedule_detail: (schedule_detail, idHanhTrinh, num_of_days) =>
      dispatch(
        actions.update_schedule_detail(
          schedule_detail,
          idHanhTrinh,
          num_of_days,
        ),
      ),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeLineDetailScreen);
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
});
