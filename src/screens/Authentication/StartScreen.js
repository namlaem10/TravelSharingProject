import React, {Component} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import notificationService from '../../services/Notification';
import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Constants';

EStyleSheet.build({$rem: WIDTH / 380});

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.log('get token has error');
    }
  };

  getOldUser = async () => {
    try {
      const value = await AsyncStorage.getItem('oldUser');
      if (value) {
        return value;
      } else {
        return null;
      }
    } catch (e) {
      console.log('get token has error');
    }
  };

  componentDidMount = async () => {
    let token = await this.getToken();
    let oldUser = await this.getOldUser();
    const {navigation} = this.props;
    notificationService.setNavigation(navigation);
    if (oldUser === null) {
      setTimeout(() => {
        this.props.navigation.navigate('Onboarding');
      }, 1500);
    } else {
      if (token !== null) {
        setTimeout(() => {
          this.props.navigation.navigate('NewsFeed');
        }, 1500);
      } else {
        setTimeout(() => {
          this.props.navigation.navigate('SignIn');
        }, 1500);
      }
    }
  };
  render() {
    return (
      <LinearGradient
        colors={['#7EFBB0', 'rgba(60, 165, 146, 0.67)']}
        style={styles.containerView}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <View style={styles.viewLogo}>
          <Image
            source={Images.IC_LOGO}
            style={styles.imageLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewAppName}>
          <Text style={styles.textAppName}>Travel Sharing</Text>
        </View>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>
            Chia sẻ hành trình du lịch của bạn
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = EStyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
  },
  viewLogo: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: '300rem',
    height: '300rem',
  },
  viewAppName: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTitle: {
    flex: 0.4,
    alignItems: 'center',
    paddingHorizontal: '20rem',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: FontSizes.startTitle,
    color: Colors.white,
    fontFamily: Fonts.thin,
    textAlign: 'center',
  },
  textAppName: {
    fontSize: FontSizes.time,
    color: Colors.white,
    fontFamily: Fonts.light,
    textAlign: 'center',
  },
});
