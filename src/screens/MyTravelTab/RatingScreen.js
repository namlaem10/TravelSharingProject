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
  Alert,
} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import TitleBarCustom from '../../components/TitleBarCustom';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/myTravelPlaceReducer.js';
import {BASE_URL} from '../../services/URL';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import MapView, {Marker, Polyline} from 'react-native-maps';
import * as Progress from 'react-native-progress';

EStyleSheet.build({$rem: constants.WIDTH / 380});

class RatingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      region: {
        latitude: 12.284453612548909,
        longitude: 107.5169186666079,
        latitudeDelta: 21,
        longitudeDelta: 21,
      },
      point: null,
      rating_choose: 0,
      rating_list: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    };
  }
  UNSAFE_componentWillMount() {
    let data = this.props.navigation.getParam('data');
    let array = [];
    if (data.rating_list !== []) {
      array = constants.groupBy(data.rating_list, 'rating');
    }
    let newRating_list = {
      1: array['1'] ? array['1'].length : 0,
      2: array['2'] ? array['2'].length : 0,
      3: array['3'] ? array['3'].length : 0,
      4: array['4'] ? array['4'].length : 0,
      5: array['5'] ? array['5'].length : 0,
    };
    let region = {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      latitudeDelta: 0.0065,
      longitudeDelta: 0.000025,
    };
    let point = data.location;
    this.setState({
      region,
      point,
      isLoading: false,
      data,
      rating_list: newRating_list,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.createTrip.type === types.RATING_TOURISTL ||
      nextProps.createTrip.type === types.RATING_TOURISTL_FAIL
    ) {
      if (nextProps.createTrip.type === types.RATING_TOURISTL) {
        let array = [];
        if (nextProps.createTrip.data.rating_list !== []) {
          array = constants.groupBy(
            nextProps.createTrip.data.rating_list,
            'rating',
          );
        }
        let newRating_list = {
          1: array['1'] ? array['1'].length : 0,
          2: array['2'] ? array['2'].length : 0,
          3: array['3'] ? array['3'].length : 0,
          4: array['4'] ? array['4'].length : 0,
          5: array['5'] ? array['5'].length : 0,
        };
        this.setState({
          data: nextProps.createTrip.data,
          isLoading: false,
          rating_list: newRating_list,
        });
        Alert.alert(
          'Đánh giá thành công',
          'Cám ơn bạn đã đánh giá địa điểm này',
          [
            {
              text: 'Xong',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      } else {
        this.setState({
          isLoading: false,
        });
      }
    }
  }
  onSendRating = () => {
    const {data, rating_choose} = this.state;
    this.props.rating_tourist(data, rating_choose);
  };
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  renderStar = () => {
    const {rating_choose} = this.state;
    const star = [];
    for (let index = 1; index <= 5; index++) {
      if (index <= rating_choose) {
        star.push(
          <TouchableOpacity
            key={index}
            onPress={() =>
              this.setState({
                rating_choose: index,
              })
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: EStyleSheet.value('5rem'),
            }}>
            <Image
              source={constants.Images.IC_GOLD_STAR}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>,
        );
      } else {
        star.push(
          <TouchableOpacity
            key={index}
            onPress={() =>
              this.setState({
                rating_choose: index,
              })
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: EStyleSheet.value('5rem'),
            }}>
            <Image
              onPress={() =>
                this.setState({
                  rating_choose: index,
                })
              }
              source={constants.Images.IC_NORMAL_STAR}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>,
        );
      }
    }
    return star;
  };
  renderStarLittleStart = point => {
    const rating_poin = point === undefined ? this.state.data.rating : point;
    const star = [];
    for (let index = 1; index <= 5; index++) {
      if (index <= rating_poin) {
        star.push(
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: EStyleSheet.value('2rem'),
            }}>
            <Image
              source={constants.Images.IC_GOLD_STAR}
              style={{
                width: EStyleSheet.value('15rem'),
                height: EStyleSheet.value('15rem'),
                resizeMode: 'contain',
              }}
            />
          </View>,
        );
      } else {
        star.push(
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: EStyleSheet.value('2rem'),
            }}>
            <Image
              source={constants.Images.IC_NORMAL_STAR}
              style={{
                width: EStyleSheet.value('15rem'),
                height: EStyleSheet.value('15rem'),
                resizeMode: 'contain',
              }}
            />
          </View>,
        );
      }
    }
    return star;
  };
  renderProcessRating = () => {
    let array = [];
    const {rating_list, data} = this.state;
    let rating_count = data.rating_count;
    for (let i = 5; i > 0; i--) {
      let percent = rating_list[i] / rating_count;
      array.push(
        <View style={styles.bar}>
          <Text
            style={{
              fontSize: 10,
              marginRight: EStyleSheet.value('5rem'),
            }}>
            {i}
          </Text>
          <Progress.Bar
            progress={percent}
            width={EStyleSheet.value('170rem')}
            height={EStyleSheet.value('11rem')}
            color={'#34D374'}
          />
        </View>,
      );
    }
    return array;
  };
  renderRatingHistory = () => {
    const {data} = this.state;
    let arrayComponent = [];
    var userHistoryCheck = [];
    let arrayRatingHistory = data.rating_history;
    arrayRatingHistory.map(item => {
      console.log(item.user);
      const found = userHistoryCheck.find(element => element === item.user);
      if (found === undefined) {
        arrayComponent.push(
          <View style={styles.historyItem}>
            <View style={styles.avarGroup}>
              <Image
                source={
                  item.user.avatar !== null
                    ? {uri: BASE_URL + '/' + item.user.avatar}
                    : constants.Images.IC_AVATAR1
                }
                style={{
                  height: EStyleSheet.value('40rem'),
                  width: EStyleSheet.value('40rem'),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: EStyleSheet.value('3rem')}}>
                  {item.user} - {moment(item.create_at).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                {this.renderStarLittleStart(item.rating)}
              </View>
            </View>
          </View>,
        );
        userHistoryCheck.push(item.user);
      } else {
        arrayComponent.push(
          <View style={styles.historyItem}>
            <View style={styles.avarGroup}>
              <Image
                source={
                  item.user.avatar === null
                    ? {uri: BASE_URL + '/' + item.user.avatar}
                    : constants.Images.IC_AVATAR1
                }
                style={{
                  height: EStyleSheet.value('40rem'),
                  width: EStyleSheet.value('40rem'),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: EStyleSheet.value('3rem')}}>
                  {item.user} - {moment(item.create_at).format('DD/MM/YYYY')} -
                  Đã chỉnh sửa
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                {this.renderStarLittleStart(item.rating)}
              </View>
            </View>
          </View>,
        );
      }
    });
    return arrayComponent.reverse().slice(0, 10);
  };
  render() {
    const {data, isLoading, region, point} = this.state;
    return !isLoading ? (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={{uri: data.tourist_destination_image}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}>
            <TitleBarCustom onPress={this.onPressBack} />
          </ImageBackground>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.infoCard}>
              <MapView style={styles.mapView} region={region}>
                {point !== null ? (
                  <Marker coordinate={point} title={'Hầm Đất Sét'} />
                ) : null}
              </MapView>
              <Text style={styles.title}>{data.tourist_destination_name}</Text>
              <Text style={styles.address}>
                {data.tourist_destination_address}
              </Text>
            </View>
            <View style={styles.RatingGroup}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: EStyleSheet.value('18rem'),
                    fontFamily: constants.Fonts.medium,
                  }}>
                  Đánh giá của bạn
                </Text>
              </View>
              <View
                style={{
                  width: EStyleSheet.value('250rem'),
                  height: EStyleSheet.value('50rem'),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.renderStar()}
              </View>
              <TouchableOpacity
                style={styles.sendRatingButton}
                onPress={() => this.onSendRating()}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: EStyleSheet.value('16rem'),
                    fontFamily: constants.Fonts.regular,
                  }}>
                  Gửi đánh giá
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ShowRatingGroup}>
              <View style={styles.showColLeft}>
                <Text style={styles.bigPoint}>{data.rating}</Text>
                <View style={{flexDirection: 'row'}}>
                  {this.renderStarLittleStart()}
                </View>
                <Text style={{color: 'gray'}}>{data.rating_count}</Text>
              </View>
              <View style={styles.showColRight}>
                {this.renderProcessRating()}
              </View>
            </View>
            <View style={styles.ratingHistoryGroup}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('18rem'),
                  fontFamily: constants.Fonts.medium,
                  alignSelf: 'center',
                }}>
                Lịch sử đánh giá
              </Text>
              {this.renderRatingHistory()}
            </View>
          </View>
        </ScrollView>
      </View>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size={EStyleSheet.value('60rem')} color="#34D374" />
      </View>
    );
  }
}
const mapStateToProps = ({createTrip}) => {
  return {
    createTrip: createTrip,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    rating_tourist: (data, rating) =>
      dispatch(actions.rating_tourist(data, rating)),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingScreen);
const styles = EStyleSheet.create({
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
  content: {
    marginHorizontal: '11rem',
    paddingBottom: '11rem',
  },
  infoCard: {
    marginTop: '11rem',
    height: '180rem',
    borderRadius: '20rem',
    marginVertical: '10rem',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#DADDE1',
    overflow: 'hidden',
  },
  mapView: {
    height: '60%',
    width: '100%',
    borderTopLeftRadius: '20rem',
    borderTopRightRadius: '20rem',
  },
  title: {
    fontFamily: constants.Fonts.medium,
    fontSize: constants.FontSizes.title,
    marginVertical: '5rem',
    marginLeft: '10rem',
  },
  address: {
    fontFamily: constants.Fonts.light,
    fontSize: constants.FontSizes.light,
    marginLeft: '10rem',
  },
  RatingGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendRatingButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: EStyleSheet.value('120rem'),
    height: EStyleSheet.value('40rem'),
    backgroundColor: constants.Colors.primary,
    borderRadius: EStyleSheet.value('10rem'),
    marginTop: EStyleSheet.value('5rem'),
  },
  ShowRatingGroup: {
    width: '100%',
    height: '120rem',
    flexDirection: 'row',
    marginTop: '11rem',
  },
  showColLeft: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showColRight: {
    flex: 0.6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigPoint: {
    fontFamily: constants.Fonts.light,
    fontSize: '50rem',
    color: '#34D374',
  },
  bar: {
    flexDirection: 'row',
    marginVertical: '6rem',
  },
  ratingHistoryGroup: {
    marginVertical: '11rem',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '5rem',
  },
  avarGroup: {
    backgroundColor: 'red',
    borderRadius: '20rem',
    marginRight: '7rem',
    overflow: 'hidden',
  },
});
