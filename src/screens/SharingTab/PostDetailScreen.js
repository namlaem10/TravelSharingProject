import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import TitleBarCustom from '../../components/TitleBarCustom';
import ScrollVerticalLichTrinh from '../../components/ScrollVerticalLichTrinh';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/detailLichTrinhReducer.js';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
EStyleSheet.build({$rem: constants.WIDTH / 380});

const HEADER_MAX_HEIGHT = EStyleSheet.value('290rem');
const HEADER_MIN_HEIGHT = EStyleSheet.value('120rem');
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class PostDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0), // animation
      data: null,
      dataComment: null,
      dataRating: null,
      isLoading: true,
      showRating: false,
      rating_choose: 0,
    };
  }
  componentDidMount = async () => {
    const data = await this.props.navigation.getParam('data', null);
    const isCreated = await this.props.navigation.getParam('isCreated', false);
    const {longitude, latitude} = data.destination;
    const linkImage = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${
      constants.API_KEY
    }&c=${latitude},${longitude}&z=12`;
    this.setState({
      isLoading: false,
      data,
      dataComment: data.comment,
      dataRating: {
        rating: data.rating || 0,
        rating_count: data.rating_count || 0,
        rating_history: data.rating_history || [],
      },
      linkImage,
    });
    this.props.get_location_info(
      isCreated ? data.schedule_detail : data.schedule.schedule_detail,
      data.schedule.number_of_days,
    );
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.detailLichTrinh.type === types.GET_LOCATION_INFO) {
      this.setState({
        routeData: nextProps.detailLichTrinh.data,
        isDetailLichTrinhReady: true,
      });
    } else if (nextProps.detailLichTrinh.type === types.POST_COMMENT) {
      this.setState({
        dataComment: nextProps.detailLichTrinh.data.comment,
      });
    } else if (nextProps.detailLichTrinh.type === types.POST_RATING) {
      this.setState({
        dataRating: nextProps.detailLichTrinh.data,
      });
    }
  }
  getSchedule = data => {
    this.props.navigation.navigate('CreateTrip', {
      destination: data.destination,
      schedule_detail: data.schedule.schedule_detail,
      destinationId: data.schedule.destination,
      number_of_days: data.schedule.number_of_days,
      schedule_reference:
        data.schedule.copy_reference !== null
          ? data.schedule.copy_reference.schedule
          : data.schedule._id,
      copy_reference:
        data.schedule.copy_reference !== null
          ? data.schedule.copy_reference._id
          : data._id,
    });
  };
  onPressBack = () => {
    this.props.navigation.goBack();
  };
  onPressDetailButton = () => {
    const {data, routeData} = this.state;
    this.props.navigation.navigate('TravelTimelineDetail', {
      data: data.schedule.schedule_detail,
      page: 1,
      totalDay: data.schedule.number_of_days,
      start: data.start_day,
      routeData: routeData,
    });
  };
  onPressTravelDay = page => {
    const {data, routeData} = this.state;
    this.props.navigation.navigate('TravelTimelineDetail', {
      data: data.schedule.schedule_detail,
      page: page,
      totalDay: data.schedule.number_of_days,
      start: data.start_day,
      routeData: routeData,
    });
  };
  onPressSendComment = comment => {
    const {data} = this.state;
    this.props.post_comment(data._id, comment);
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
  onPressRating = rating => {
    this.setState({showRating: rating});
  };
  onSendRating = () => {
    const {data, rating_choose} = this.state;
    if (rating_choose > 1) {
      this.props.post_rating(data._id, rating_choose);
      this.setState({showRating: false, rating_choose: 0});
    } else {
      Alert.alert(
        'Lưu ý',
        'Vui lòng chọn ít nhất là 1 sao',
        [
          {
            text: 'Chọn lại',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };
  render() {
    const {
      data,
      dataComment,
      dataRating,
      isLoading,
      linkImage,
      routeData,
      isDetailLichTrinhReady,
      showRating,
    } = this.state;
    let background = null;
    if (data !== null) {
      background =
        data.background !== null
          ? data.background
          : data.destination.destination_image;
    }
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });
    return isDetailLichTrinhReady ? (
      <View style={styles.container}>
        <Dialog visible={showRating}>
          <DialogContent>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: EStyleSheet.value('25rem'),
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
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: EStyleSheet.value('120rem'),
                height: EStyleSheet.value('40rem'),
                backgroundColor: constants.Colors.primary,
                borderRadius: EStyleSheet.value('10rem'),
                marginTop: EStyleSheet.value('5rem'),
              }}
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
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: EStyleSheet.value('10rem'),
                right: EStyleSheet.value('5rem'),
                height: EStyleSheet.value('30rem'),
                width: EStyleSheet.value('30rem'),
              }}
              onPress={() => this.setState({showRating: false})}>
              <Text style={{fontSize: EStyleSheet.value('20rem')}}>X</Text>
            </TouchableOpacity>
          </DialogContent>
        </Dialog>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          <View style={styles.scrollViewContent}>
            <ScrollVerticalLichTrinh
              routeInfo={routeData}
              isDetailLichTrinhReady={isDetailLichTrinhReady}
              data={data}
              ref={ref => {
                this.ScrollView = ref;
              }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.ScrollView.scrollToEnd({animated: true});
              }}
              dataComment={dataComment}
              dataRating={dataRating}
              onPressDetailButton={this.onPressDetailButton}
              onPressTravelDay={this.onPressTravelDay}
              onPressSendComment={this.onPressSendComment}
              onPressRating={this.onPressRating}
              isBlog={true}
              isButton={false}
              isLoading={this.state.isLoading}
            />
          </View>
        </ScrollView>
        <Animated.View
          style={[
            styles.header,
            {
              height: headerHeight,
              opacity: imageOpacity,
              transform: [{translateY: imageTranslate}],
            },
          ]}>
          <View style={styles.backgroundHeader}>
            <ImageBackground
              source={
                background !== null
                  ? {uri: background}
                  : require('../../assets/images/vinhhalong.jpeg')
              }
              style={{width: '100%', height: '100%'}}>
              <TitleBarCustom
                onPress={this.onPressBack}
                onPressMore={this.onPressMore}
              />
            </ImageBackground>
            <View style={styles.infoBoxGroup}>
              <View style={styles.infoPlace}>
                <View style={{...styles.infoBoxText}}>
                  <Text
                    style={{
                      fontSize: EStyleSheet.value('16rem'),
                      fontFamily: constants.Fonts.medium,
                    }}>
                    {data.destination.destination_name}
                  </Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Image
                    source={constants.Images.IC_TIME}
                    style={styles.infoBoxIcon}
                  />
                  <Text
                    style={{
                      fontSize: EStyleSheet.value('14rem'),
                      fontFamily: constants.Fonts.light,
                    }}>
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
                  <Text
                    style={{
                      fontSize: EStyleSheet.value('14rem'),
                      fontFamily: constants.Fonts.light,
                    }}>
                    {constants.currencyFormatter.format(data.price)}đ̲
                  </Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Text
                    style={{
                      fontSize: EStyleSheet.value('14rem'),
                      fontFamily: constants.Fonts.light,
                    }}>
                    Tạo bởi: &nbsp;&nbsp;
                  </Text>
                  <Text
                    style={{
                      fontSize: EStyleSheet.value('14rem'),
                      fontFamily: constants.Fonts.medium,
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
            <View style={styles.AddButton}>
              <TouchableOpacity
                onPress={() => {
                  this.getSchedule(data);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    fontSize: EStyleSheet.value('14rem'),
                    color: 'white',
                    fontFamily: constants.Fonts.bold,
                  }}>
                  Nhận lịch trình
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size={EStyleSheet.value('60rem')} color="#34D374" />
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
    post_comment: (id, param) => dispatch(actions.post_comment(id, param)),
    post_rating: (id, param) => dispatch(actions.post_rating(id, param)),
    reset: () => dispatch(actions.reset()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetailScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    height: '287rem',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
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
    height: '40rem',
    width: '128rem',
    backgroundColor: '#34D374',
    marginTop: '250rem',
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
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingVertical: '5rem',
  },
  miniMap: {
    backgroundColor: 'blue',
    flex: 1.5,
  },
  text: {
    fontFamily: constants.Fonts.light,
  },
  infoBoxIcon: {
    width: '22rem',
    height: '22rem',
    marginRight: '5rem',
    resizeMode: 'contain',
  },
  infoBoxText: {
    marginHorizontal: '12rem',
    // marginBottom: '8rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
