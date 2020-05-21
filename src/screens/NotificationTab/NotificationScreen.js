import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/notificationReducer';
import moment from 'moment';
import 'moment/locale/vi';

//fake data
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      data: null,
      isLoading: true,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.notification.type === types.GET_NOTI) {
      this.setState({data: nextProps.notification.data, isLoading: false});
    }
  }
  UNSAFE_componentWillMount() {
    this.props.get_noti();
  }
  onPressItem = item => {
    this.props.navigation.navigate('TrackingMap', {
      location: 'Notification',
      data: item.travel,
      member_away: item.member_away,
    });
  };
  _renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => this.onPressItem(item)}>
        <Image
          source={constants.Images.IC_RUNNING}
          style={{
            width: EStyleSheet.value('70rem'),
            height: EStyleSheet.value('70rem'),
            borderRadius: EStyleSheet.value('35rem'),
            alignSelf: 'center',
            marginHorizontal: EStyleSheet.value('5rem'),
          }}
        />
        <View
          style={{
            justifyContent: 'flex-start',
            width: EStyleSheet.value('240rem'),
            paddingTop: EStyleSheet.value('5rem'),
          }}>
          <Text numberOfLines={2} style={styles.textTitle}>
            Nhóm {item.travel.departure.destination_name} -{' '}
            {item.travel.destination.destination_name} có thành viên ở ngoài
            phạm vi
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: EStyleSheet.value('10rem'),
            bottom: EStyleSheet.value('5rem'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: EStyleSheet.value('255rem'),
          }}>
          <Text style={styles.subText}>{moment(item.create_at).fromNow()}</Text>
          <Text style={{...styles.subText, color: '#34D374'}}>
            Nhấn để xem chi tiết
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  onRefresh = () => {
    this.setState({isRefreshing: true});
    this.props.get_noti();
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1000);
  };
  render() {
    const {isLoading, data} = this.state;
    moment.locale('vi');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: EStyleSheet.value('22rem'),
                fontFamily: constants.Fonts.regular,
              }}>
              Thông báo
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator
              size={EStyleSheet.value('60rem')}
              color="#34D374"
            />
          ) : (
            <View style={styles.flatList}>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: EStyleSheet.value('70rem'),
                  flex: 0,
                }}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => this._renderItem(item)}
                keyExtractor={item => item._id}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.onRefresh.bind(this)}
                  />
                }
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({notification}) => {
  return {
    notification: notification,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_noti: () => dispatch(actions.get_noti()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  // buttonPushNoti: {
  //   height: '40rem',
  //   width: '150rem',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'blue',
  // },
  header: {
    width: '100%',
    height: '50rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: '13rem',
    paddingTop: '10rem',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  itemView: {
    alignSelf: 'center',
    width: '98%',
    height: '80rem',
    backgroundColor: 'white',
    marginVertical: '7rem',
    //shadow
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: '5rem',
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: '4rem',

    // elevation: '4rem',
    borderWidth: 1,
    borderColor: '#DADDE1',
    borderRadius: '5rem',
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
  },
  subText: {
    fontSize: constants.FontSizes.smalltext,
    fontFamily: constants.Fonts.regular,
  },
});
