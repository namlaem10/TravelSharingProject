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
import {BASE_URL} from '../../services/URL';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

EStyleSheet.build({$rem: constants.WIDTH / 380});

class TripDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dataComment: null,
      dataRating: null,
      showRating: false,
      rating_choose: 0,
      isLoading: true,
      linkImage: null,
      routeData: [],
      isDetailLichTrinhReady: false,
      isGone: false,
      isShare: false,
    };
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
      dataComment: data.comment,
      dataRating: {
        rating: data.rating || 0,
        rating_count: data.rating_count || 0,
        rating_history: data.rating_history || [],
      },
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
      data: this.state.data,
      isGone: this.state.isGone,
      isShare: this.state.isShare,
      isLeader: this.props.navigation.getParam('isLeader'),
    });
  };
  onPressChat = () => {
    this.props.navigation.navigate('Chatting', {
      location: 'TripDetail',
      data: this.state.data,
      isInfoGroup: false,
      isLeader: this.props.navigation.getParam('isLeader'),
      isGone: this.state.isGone,
      isShare: this.state.isShare,
    });
  };
  onPressTrackingButton = () => {
    const {data} = this.state;
    this.props.navigation.navigate('TrackingMap', {
      location: 'TripDetail',
      data: data,
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
    this.setState({showRating: false, rating_choose: 0});
    const {data, rating_choose} = this.state;
    this.props.post_rating(data._id, rating_choose);
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
      dataComment,
      dataRating,
      showRating,
    } = this.state;
    let background = null;
    if (data !== null) {
      background =
        data.background !== null
          ? BASE_URL + '/' + data.background
          : BASE_URL + '/' + data.destination.destination_image;
    }
    return !isLoading ? (
      <View style={isGone ? styles.container1 : styles.container}>
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
          </DialogContent>
        </Dialog>
        <ScrollView
          // eslint-disable-next-line react/no-string-refs
          scrollEventThrottle={16}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <View style={styles.backgroundHeader}>
            <ImageBackground
              source={{uri: background}}
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
              ref={ref => {
                this.ScrollView = ref;
              }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                this.ScrollView.scrollToEnd({animated: true});
              }}
              dataComment={dataComment}
              dataRating={dataRating}
              onPressSendComment={this.onPressSendComment}
              onPressRating={this.onPressRating}
              onPressDetailButton={this.onPressDetailButton}
              onPressTravelDay={this.onPressTravelDay}
              isButton={true}
              onPressAddMember={this.onPressAddMember}
              onPressChat={this.onPressChat}
              isBlog={isShare ? true : false}
              isLeader={this.props.navigation.getParam('isLeader')}
              isGone={isGone}
              isLoading={this.state.isLoading}
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
    post_comment: (id, param) => dispatch(actions.post_comment(id, param)),
    post_rating: (id, param) => dispatch(actions.post_rating(id, param)),
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
    resizeMode: 'contain',
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
