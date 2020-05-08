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
  RefreshControl,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import SearchBar from '../../components/SearchBar';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import CustomTabBarNoScroll from '../../components/CustomTabBarNoScroll';
import TravelItem from './TravelItem';
import TravelItemGone from './TravelItemGone';
import EmptyTab from './EmptyTab';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/ownLichTrinhReducer';
const tabStyle = {};

class MyTravelScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Lịch trình của tôi',
      searchText: '',
      isDarg: false,
      ownLichTrinh: null,
      ownLichTrinhBackup: null,
      isLoading: true,
      will: 0,
      goin: 0,
      gone: 0,
      user: null,
      isRefreshing: false,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (
          payload.action.type === 'Navigation/NAVIGATE' ||
          payload.action.type === 'Navigation/BACK'
        ) {
          this.setState({searchText: ''});
        }
      },
    );
  }
  async UNSAFE_componentWillMount() {
    await this.props.get_own();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ownLichTrinh.type === types.GET_OWN) {
      const {ownLichTrinh} = nextProps;
      if (ownLichTrinh.status) {
        this.setState({
          isLoading: false,
          message: ownLichTrinh.data.message
            ? ownLichTrinh.data.message
            : 'Lỗi tải thông tin :(',
        });
      } else {
        this.countLichTrinh(ownLichTrinh.data);
        this.setState({
          isLoading: false,
          ownLichTrinh: ownLichTrinh.data,
          ownLichTrinhBackup: ownLichTrinh.data,
          user: this.props.user.data.user_info,
        });
      }
    }
  }
  onRefresh = async () => {
    this.setState({isRefreshing: true, searchText: ''});
    await this.props.get_own();
    this.setState({isRefreshing: false});
  };
  setSearchText = text => {
    let searchText = text.replace(/[^a-zA-Z-  ]/g, '');
    this.setState({searchText: searchText});
    let data = this.state.ownLichTrinhBackup;
    searchText = searchText.trim().toLowerCase();
    data = data.filter(element => {
      let searchData = null;
      let sText =
        element.departure.destination_name +
        element.destination.destination_name;
      searchData = sText.toLowerCase().match(searchText);
      return searchData;
    });
    this.setState({
      ownLichTrinh: data,
    });
  };
  countLichTrinh = lichtrinh => {
    let will = 0;
    let gone = 0;
    let goin = 0;
    lichtrinh.map(item => {
      var currentDate = new Date();
      var startDate = new Date(item.start_day);
      var endDate = new Date(item.end_day);
      if (startDate > currentDate) {
        will++;
      }
      if (currentDate >= startDate && currentDate <= endDate) {
        goin++;
      }
      if (endDate < currentDate) {
        gone++;
      }
    });
    this.setState({will, goin, gone});
  };
  onSearchChangeText = text => {
    this.setState({
      searchText: text,
    });
  };
  onPressItem = (item, isLeader) => {
    this.props.navigation.navigate('TripDetail', {
      data: item,
      isLeader: isLeader,
    });
  };
  onPressItemGone = (item, isLeader) => {
    this.props.navigation.navigate('TripDetail', {
      data: item,
      isGone: true,
      isShare: item.isShare,
      isLeader: isLeader,
    });
  };
  _handleStartDrag = () => {
    this.setState({
      isDarg: true,
    });
  };
  _handleEndDrag = () => {
    this.setState({
      isDarg: false,
    });
  };
  onPressConfirm = (item, isLeader) => {
    this.props.navigation.navigate('ShareTimeLineDetail', {
      action: 'sharing',
      data: item.schedule.schedule_detail,
      page: 1,
      idHanhTrinh: item._id,
      background: item.background,
      totalDay: item.schedule.number_of_days,
      start: item.start_day,
      isGone: true,
      isLeader: isLeader,
    });
  };
  onPressAddButton = () => {
    this.props.navigation.navigate('CreateTrip', {location: 'MyTravel'});
  };
  _renderWillGo = () => {
    const {ownLichTrinh, will} = this.state;
    if (will > 0) {
      return (
        <View style={styles.scontentTabView} tabLabel="Sắp đi">
          <FlatList
            style={{height: '100%'}}
            showsVerticalScrollIndicator={false}
            data={ownLichTrinh}
            renderItem={({item}) => {
              var currentDate = new Date();
              var startDate = new Date(item.start_day);
              if (startDate > currentDate) {
                let isLeader = false;
                if (this.state.user._id === item.create_by._id) {
                  isLeader = true;
                }
                return (
                  <TravelItem
                    data={item}
                    isLeader={isLeader}
                    onPressItem={this.onPressItem}
                  />
                );
              }
            }}
            keyExtractor={item => item._id}
            onScrollEndDrag={() => this._handleEndDrag()}
            onScrollBeginDrag={() => this._handleStartDrag()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
          {this.state.isDarg ? null : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.onPressAddButton()}>
              <Image
                source={constants.Images.IMAGE_ADD_CIRCLE_BUTTON}
                style={{
                  width: EStyleSheet.value('70rem'),
                  height: EStyleSheet.value('70rem'),
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <EmptyTab
          tabLabel="Sắp đi"
          status={1}
          onPressAddButton={this.onPressAddButton}
        />
      );
    }
  };
  _renderGoin = () => {
    const {ownLichTrinh, goin} = this.state;
    if (goin > 0) {
      return (
        <FlatList
          tabLabel="Đang đi"
          showsVerticalScrollIndicator={false}
          data={ownLichTrinh}
          renderItem={({item}) => {
            var currentDate = new Date();
            var startDate = new Date(item.start_day);
            var endDate = new Date(item.end_day);
            if (currentDate >= startDate && currentDate <= endDate) {
              let isLeader = false;
              if (this.state.user._id === item.create_by._id) {
                isLeader = true;
              }
              return (
                <TravelItem
                  data={item}
                  onPressItem={this.onPressItem}
                  isLeader={isLeader}
                />
              );
            }
          }}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      );
    } else {
      return (
        <EmptyTab
          tabLabel="Đang đi"
          status={2}
          onPressAddButton={this.onPressAddButton}
        />
      );
    }
  };
  _renderGone = () => {
    const {ownLichTrinh, gone} = this.state;
    if (gone > 0) {
      return (
        <FlatList
          tabLabel="Đã đi"
          showsVerticalScrollIndicator={false}
          data={ownLichTrinh}
          renderItem={({item}) => {
            var currentDate = new Date();
            var endDate = new Date(item.end_day);
            let isLeader = false;
            if (this.state.user._id === item.create_by._id) {
              isLeader = true;
            }
            if (endDate < currentDate) {
              return (
                <TravelItemGone
                  data={item}
                  onPressItem={this.onPressItemGone}
                  onPressConfirm={this.onPressConfirm}
                  isLeader={isLeader}
                />
              );
            }
          }}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      );
    } else {
      return (
        <EmptyTab
          tabLabel="Đã đi"
          status={3}
          onPressAddButton={this.onPressAddButton}
        />
      );
    }
  };
  render() {
    const {title, searchText, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            title={title}
            onChangeText={this.setSearchText}
            value={searchText}
          />
        </View>
        <ScrollableTabView
          renderTabBar={() => (
            <CustomTabBarNoScroll
              activeTextColor={'white'}
              inactiveTextColor={'#B7B7B7'}
              tabStyle={tabStyle}
              backgroundColor={'white'}
            />
          )}>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
            </View>
          ) : (
            this._renderWillGo()
          )}
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
            </View>
          ) : (
            this._renderGoin()
          )}
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
            </View>
          ) : (
            this._renderGone()
          )}
        </ScrollableTabView>
      </View>
    );
  }
}
const mapStateToProps = ({user, ownLichTrinh}) => {
  return {
    user: user,
    ownLichTrinh: ownLichTrinh,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_own: () => dispatch(actions.get_own()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTravelScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: '0rem',
  },
  header: {
    width: '100%',
    height: '60rem',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
  },
  addButton: {
    width: '70rem',
    height: '70rem',
    position: 'absolute',
    right: '10rem',
    bottom: '0rem',
  },
  scontentTabView: {},
});
