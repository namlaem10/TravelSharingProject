/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

import TitleBarCustom from '../../components/TitleBarCustom';
import ScrollVerticalLichTrinh from '../../components/ScrollVerticalLichTrinh';

EStyleSheet.build({$rem: constants.WIDTH / 380});

export default class TripDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressBack = () => {
    this.props.navigation.navigate('MyTravel');
  };
  onPressDetailButton = () => {
    // this.props.updateTab(1);
    this.props.navigation.navigate('ShareTimeLineDetail', {
      page: 1,
    });
  };
  onPressTravelDay = page => {
    // this.props.updateTab(page);
    this.props.navigation.navigate('ShareTimeLineDetail', {
      page: page,
    });
  };
  onPressAddMember = () => {
    this.props.navigation.navigate('AddMember', {location: 'TripDetail'});
  };
  onPressChat = () => {
    this.props.navigation.navigate('Chatting', {location: 'TripDetail'});
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          // eslint-disable-next-line react/no-string-refs
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
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
          </View>
          <View style={styles.scrollViewContent}>
            <ScrollVerticalLichTrinh
              onPressDetailButton={this.onPressDetailButton}
              onPressTravelDay={this.onPressTravelDay}
              onPressAddMember={this.onPressAddMember}
              onPressChat={this.onPressChat}
              isBlog={false}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.trackingButton}>
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
        </ScrollView>
      </View>
    );
  }
}

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
