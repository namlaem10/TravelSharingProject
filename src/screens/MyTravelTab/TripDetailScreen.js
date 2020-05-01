/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import TitleBarCustom from '../../components/TitleBarCustom';
import ScrollVerticalLichTrinh from '../../components/ScrollVerticalLichTrinh';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/detailLichTrinhReducer.js';
EStyleSheet.build({$rem: constants.WIDTH / 380});

class TripDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      linkImage: null,
      routeData: [],
      isDetailLichTrinhReady: false,
      isGone: false,
      isShare: false,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (payload.action.type === 'Navigation/NAVIGATE') {
          this.setState({isLoading: true});
          const data = await this.props.navigation.getParam('data', null);
          this.setState({
            isLoading: false,
            data,
            isGone: this.props.navigation.getParam('isGone', false),
            isShare: this.props.navigation.getParam('isShare', false),
          });
          this.props.get_location_info(
            data.schedule.schedule_detail,
            data.schedule.number_of_days,
          );
        }
      },
    );
  }
  componentDidMount = async () => {
    const data = await this.props.navigation.getParam('data', null);
    const {longitude, latitude} = data.destination;
    const linkImage = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${
      constants.API_KEY
    }&c=${latitude},${longitude}&z=12`;
    this.setState({
      isLoading: false,
      data,
      linkImage,
      isGone: this.props.navigation.getParam('isGone', false),
      isShare: this.props.navigation.getParam('isShare', false),
    });
    this.props.get_location_info(
      data.schedule.schedule_detail,
      data.schedule.number_of_days,
    );
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.detailLichTrinh.type === types.GET_LOCATION_INFO) {
      this.setState({
        routeData: nextProps.detailLichTrinh.data,
        isDetailLichTrinhReady: true,
      });
    }
  }
  onPressBack = () => {
    this.props.navigation.navigate('MyTravel');
  };
  onPressDetailButton = () => {
    const {data, routeData, isGone, isShare} = this.state;
    this.props.navigation.navigate('TimeLineDetail', {
      data: data.schedule.schedule_detail,
      page: 1,
      totalDay: data.schedule.number_of_days,
      start: data.start_day,
      routeData: routeData,
      isGone: isGone,
      destinationId: data.schedule.destination,
      idHanhTrinh: data._id,
      isShare: isShare,
      background: data.background,
      isLeader: this.props.navigation.getParam('isLeader'),
    });
  };
  onPressTravelDay = page => {
    const {data, routeData, isGone, isShare} = this.state;
    this.props.navigation.navigate('TimeLineDetail', {
      data: data.schedule.schedule_detail,
      page: page,
      totalDay: data.schedule.number_of_days,
      start: data.start_day,
      routeData: routeData,
      isGone: isGone,
      destinationId: data.schedule.destination,
      idHanhTrinh: data._id,
      isShare: isShare,
      background: data.background,
      isLeader: this.props.navigation.getParam('isLeader'),
    });
  };
  onPressAddMember = () => {
    let member = [];
    let user = this.props.user.data;
    this.state.data.member.map(item => {
      if (item._id !== user.user_info._id) {
        member.push(item._id);
      }
    });
    this.props.navigation.navigate('AddMember', {
      location: 'TripDetail',
      member: member,
      type: 'update',
      idHanhTrinh: this.state.data._id,
    });
  };
  onPressChat = () => {
    this.props.navigation.navigate('Chatting', {
      location: 'TripDetail',
    });
  };
  onPressTrackingButton = () => {
    const {data} = this.state;
    this.props.navigation.navigate('TrackingMap', {
      location: 'TripDetail',
      data: data,
      isLeader: this.props.navigation.getParam('isLeader'),
    });
  };
  render() {
    const {
      data,
      isLoading,
      linkImage,
      routeData,
      isDetailLichTrinhReady,
      isGone,
      isShare,
    } = this.state;
    return !isLoading ? (
      <View style={isGone ? styles.container1 : styles.container}>
        <ScrollView
          // eslint-disable-next-line react/no-string-refs
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View style={styles.backgroundHeader}>
            <ImageBackground
              source={require('../../assets/images/vinhhalong.jpeg')}
              style={{
                width: '100%',
                height: '100%',
              }}>
              <TitleBarCustom
                onPress={this.onPressBack}
                onPressMore={() => {
                  console.log('more');
                }}
              />
            </ImageBackground>
            <View style={styles.infoBoxGroup}>
              <View style={styles.infoPlace}>
                <View style={{...styles.infoBoxText}}>
                  <Text
                    style={{
                      ...styles.text,
                      fontSize: EStyleSheet.value('18rem'),
                      fontFamily: constants.Fonts.regular,
                    }}>
                    {data.destination.destination_name}
                  </Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Image
                    source={constants.Images.IC_TIME}
                    style={styles.infoBoxIcon}
                  />
                  <Text style={{...styles.text}}>
                    {moment(data.start_day).format('DD/MM/YYYY')}
                    &nbsp;-&nbsp;
                    {moment(data.end_day).format('DD/MM/YYYY')}
                  </Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Image
                    source={constants.Images.IC_MONEY_GRAY}
                    style={styles.infoBoxIcon}
                  />
                  <Text style={{...styles.text}}>
                    {constants.currencyFormatter.format(data.price)}đ̲
                  </Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Text style={{...styles.text}}>Tạo bởi: &nbsp;&nbsp;</Text>
                  <Text
                    style={{
                      ...styles.text,
                      fontFamily: constants.Fonts.regular,
                    }}>
                    {data.create_by.display_name}
                  </Text>
                </View>
              </View>
              <View style={styles.miniMap}>
                <Image
                  source={{
                    uri: linkImage,
                  }}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
            </View>
          </View>
          <View style={styles.scrollViewContent}>
            <ScrollVerticalLichTrinh
              routeInfo={routeData}
              isDetailLichTrinhReady={isDetailLichTrinhReady}
              data={data}
              onPressDetailButton={this.onPressDetailButton}
              onPressTravelDay={this.onPressTravelDay}
              isButton={true}
              onPressAddMember={this.onPressAddMember}
              onPressChat={this.onPressChat}
              isBlog={isShare ? true : false}
              isLeader={this.props.navigation.getParam('isLeader')}
            />
          </View>
          {isGone ? null : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.trackingButton}
                onPress={() => this.onPressTrackingButton()}>
                <Text
                  style={{
                    fontSize: EStyleSheet.value('15rem'),
                    fontFamily: constants.Fonts.light,
                    letterSpacing: 0.5,
                    color: 'white',
                  }}>
                  Theo dõi nhóm
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size={EStyleSheet.value('60rem')} color="#34D374" />
      </View>
    );
  }
}
const mapStateToProps = ({detailLichTrinh, user}) => {
  return {
    detailLichTrinh: detailLichTrinh,
    user: user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_location_info: (params, number) =>
      dispatch(actions.get_location_info(params, number)),
    reset: () => dispatch(actions.reset()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripDetailScreen);
const styles = EStyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: '287rem',
    overflow: 'hidden',
  },
  scrollViewContent: {
    marginTop: '90rem',
  },
  backgroundHeader: {
    height: '195rem',
  },
  infoBoxGroup: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    height: '153rem',
    width: '97%',
    marginTop: '125rem',
    position: 'absolute',
    borderTopLeftRadius: '10rem',
    borderBottomLeftRadius: '10rem',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 4,
    flexDirection: 'row',
  },
  AddButton: {
    height: '35rem',
    width: '128rem',
    backgroundColor: '#34D374',
    marginTop: '255rem',
    marginLeft: '210rem',
    position: 'absolute',
    borderRadius: '5rem',
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 4,
  },
  infoPlace: {
    flex: 2.5,
  },
  miniMap: {
    backgroundColor: 'blue',
    flex: 1.5,
  },
  text: {
    marginVertical: '3rem',
    letterSpacing: '1rem',
    fontFamily: constants.Fonts.light,
  },
  infoBoxIcon: {
    width: '15rem',
    height: '15rem',
    marginRight: '7rem',
  },
  infoBoxText: {
    marginHorizontal: '12rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingButton: {
    height: '35rem',
    width: '350rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34D374',
    borderRadius: '8rem',
    marginBottom: '5rem',
  },
});
