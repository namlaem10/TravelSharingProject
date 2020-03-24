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
} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

import TitleBarCustom from '../../components/TitleBarCustom';
import ScrollVerticalLichTrinh from '../../components/ScrollVerticalLichTrinh';

EStyleSheet.build({$rem: constants.WIDTH / 380});

const HEADER_MAX_HEIGHT = EStyleSheet.value('290rem');
const HEADER_MIN_HEIGHT = EStyleSheet.value('120rem');
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class PostDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0), // animation
    };
  }
  onPressBack = () => {
    this.props.navigation.goBack();
  };
  render() {
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
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}>
          <View style={styles.scrollViewContent}>
            <ScrollVerticalLichTrinh />
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
              <TitleBarCustom onPress={this.onPressBack} />
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
                    Vịnh Hạ Long
                  </Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Image
                    source={constants.Images.IC_LOCATION}
                    style={styles.infoBoxIcon}
                  />
                  <Text style={{...styles.text}}>
                    Hà Phong, Tp. Hạ Long, Quảng Ninh, Việt Nam
                  </Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Image
                    source={constants.Images.IC_TIME}
                    style={styles.infoBoxIcon}
                  />
                  <Text style={{...styles.text}}>20/03/2020 - 22/03/2020</Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Image
                    source={constants.Images.IC_MONEY_GRAY}
                    style={styles.infoBoxIcon}
                  />
                  <Text style={{...styles.text}}>3.000.000đ</Text>
                </View>
                <View style={{...styles.infoBoxText}}>
                  <Text style={{...styles.text}}>Tạo bởi: &nbsp;&nbsp;</Text>
                  <Text
                    style={{
                      ...styles.text,
                      fontFamily: constants.Fonts.regular,
                    }}>
                    Nam ngu si
                  </Text>
                </View>
              </View>
              <View style={styles.miniMap}>
                <Image
                  source={require('../../assets/images/minimap.png')}
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
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
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
    height: '143rem',
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
    height: 35,
    width: 128,
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
});
