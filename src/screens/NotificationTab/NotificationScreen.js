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
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/notificationReducer';
//fake data
const data = [
  {
    id: 'noti1',
    title: 'Hoàn đã gửi 1 tin nhắn trong nhóm du lịch',
    time: '3 phút trước',
    image: constants.Images.IC_AVATAR3,
  },
];
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.notification.type === types.PUSH_NOTI) {
      console.log(nextProps.notification.data);
    }
  }
  _renderItem = item => {
    return (
      <TouchableOpacity style={styles.itemView}>
        <Image
          source={item.image}
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
            {item.title}
          </Text>
        </View>
        <View style={{position: 'absolute', right: 0}}>
          <TouchableOpacity>
            <Image
              style={{
                width: EStyleSheet.value('30rem'),
                height: EStyleSheet.value('30rem'),
                resizeMode: 'contain',
              }}
              source={constants.Images.IC_DIFFERENCE_ACTIVE}
            />
          </TouchableOpacity>
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
          <Text style={styles.subText}>{item.time}</Text>
          <Text style={styles.subText}>Nhấn để xem chi tiết</Text>
        </View>
      </TouchableOpacity>
    );
  };
  onRefresh = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 1000);
  };
  onPressButtonNoti = () => {
    let data = {
      idHanhTrinh: 'HT01',
      message: 'Out range!',
    };
    this.props.push_noti(data);
  };
  render() {
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
          <View style={styles.flatList}>
            <TouchableOpacity
              style={styles.buttonPushNoti}
              onPress={() => this.onPressButtonNoti()}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
                Push Noti
              </Text>
            </TouchableOpacity>
            {/* <FlatList
              contentContainerStyle={{
                paddingBottom: EStyleSheet.value('70rem'),
                flex: 0,
              }}
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
            /> */}
          </View>
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
    push_noti: data => dispatch(actions.push_noti(data)),
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
  buttonPushNoti: {
    height: '40rem',
    width: '150rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: constants.Fonts.light,
    color: '#4A4A4A',
  },
});
