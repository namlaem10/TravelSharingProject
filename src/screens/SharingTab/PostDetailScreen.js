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
} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import TitleBarCustom from '../../components/TitleBarCustom';
import ScrollVerticalLichTrinh from '../../components/ScrollVerticalLichTrinh';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/detailLichTrinhReducer.js';
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
      isLoading: true,
      linkImage: null,
      routeData: [],
      isDetailLichTrinhReady: false,
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
    });
    this.props.get_location_info(
      data.schedule.schedule_detail,
      data.schedule.number_of_days,
    );
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      routeData: nextProps.detailLichTrinh.data,
      isDetailLichTrinhReady: true,
    });
  }
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
  render() {
    const {
      data,
      isLoading,
      linkImage,
      routeData,
      isDetailLichTrinhReady,
    } = this.state;
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
    return !isLoading ? (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          <View style={styles.scrollViewContent}>
            <ScrollVerticalLichTrinh
              routeInfo={routeData}
              isDetailLichTrinhReady={isDetailLichTrinhReady}
              data={data}
              onPressDetailButton={this.onPressDetailButton}
              onPressTravelDay={this.onPressTravelDay}
              isBlog={true}
              isButton={false}
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
              source={require('../../assets/images/vinhhalong.jpeg')}
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
                  <Text style={{...styles.text}}>{data.price}đ</Text>
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
            <View style={styles.AddButton}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    fontSize: EStyleSheet.value('12rem'),
                    letterSpacing: EStyleSheet.value('1rem'),
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
    marginBottom: '8rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
