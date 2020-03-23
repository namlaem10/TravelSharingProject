import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Constants';

EStyleSheet.build({$rem: WIDTH / 380});

const sildeData = [
  {
    key: 'slide1',
    title: 'Chia sẻ chuyến hành trình',
    image: Images.IC_MANAGEGROUP_DEACTIVE,
    description:
      'Một dòng description dài thòn lòn gì đó về nội dung này từ từ viết sau chứ giờ nghĩ chưa ra nha',
  },
  {
    key: 'slide2',
    title: 'Tham khảo lên kế hoạch',
    image: Images.IC_MANAGEGROUP_DEACTIVE,
    description:
      'Một dòng description dài thòn lòn gì đó về nội dung này từ từ viết sau chứ giờ nghĩ chưa ra nha',
  },
  {
    key: 'slide3',
    title: 'Quản lý nhóm du lịch',
    image: Images.IC_MANAGEGROUP_DEACTIVE,
    description:
      'Một dòng description dài thòn lòn gì đó về nội dung này từ từ viết sau chứ giờ nghĩ chưa ra nha',
  },
];

export default class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#7EFBB0', 'rgba(60, 165, 146, 0.67)']}
          style={styles.viewImageOnboard}>
          <Image
            source={item.image}
            style={styles.imageOnboard}
            resizeMode="contain"
          />
        </LinearGradient>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>{item.title}</Text>
        </View>
        <View style={styles.viewDescription}>
          <Text style={styles.textDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  skipSlider = () => {
    this.props.navigation.navigate('SignIn');
  };

  render() {
    const {activeSlide} = this.state;
    return (
      <View style={{flex: 1}}>
        <Carousel
          ref={c => {
            this.carousel = c;
          }}
          data={sildeData}
          renderItem={this.renderItem}
          onSnapToItem={index => this.setState({activeSlide: index})}
          sliderWidth={WIDTH}
          itemWidth={WIDTH}
          removeClippedSubviews={false}
          inactiveSlideOpacity={0}
          contentContainerCustomStyle={styles.contentContainerCarousel}
        />
        <View style={styles.viewPagination}>
          {activeSlide !== 2 ? (
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={this.skipSlider}>
              <Text style={styles.textDone}>Bỏ qua</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonNext} />
          )}
          <Pagination
            dotsLength={sildeData.length}
            activeDotIndex={activeSlide}
            dotStyle={styles.dotStyle}
            containerStyle={styles.containerStyle}
            dotContainerStyle={styles.dotContainerStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
          />
          {activeSlide === 2 ? (
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={this.skipSlider}>
              <Text style={styles.textDone}>Bắt đầu</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => {
                this.setState({activeSlide: activeSlide + 1}, () => {
                  this.carousel.snapToItem(activeSlide + 1);
                });
              }}>
              <Text style={styles.textDone}>Tiếp tục</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  textDone: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.title,
    color: Colors.primary,
  },
  viewImageOnboard: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: '80rem',
    borderBottomRightRadius: '80rem',
  },
  imageOnboard: {
    width: WIDTH - 40,
    height: '150rem',
  },
  viewTitle: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10rem',
    marginVertical: '10rem',
  },
  textTitle: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.onBoardingTitle,
    color: Colors.black,
  },
  viewDescription: {
    flex: 0.38,
    paddingHorizontal: '45rem',
  },
  textDescription: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.normal,
    color: Colors.deactive,
    textAlign: 'center',
  },
  viewPagination: {
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  dotStyle: {
    width: '10rem',
    height: '10rem',
    borderRadius: '5rem',
    backgroundColor: Colors.primary,
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    // backgroundColor: 'blue',
  },
  dotContainerStyle: {
    marginHorizontal: '5rem',
    height: '10rem',
  },
  inactiveDotStyle: {
    width: '10rem',
    height: '10rem',
    borderRadius: '5rem',
    backgroundColor: Colors.primary,
    opacity: 0.5,
  },
  buttonNext: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
