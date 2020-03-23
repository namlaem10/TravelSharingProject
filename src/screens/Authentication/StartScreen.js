import React, {Component} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Constants';

EStyleSheet.build({$rem: WIDTH / 380});

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Onboarding');
    }, 1500);
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
            source={Images.IC_MANAGEGROUP_DEACTIVE}
            style={styles.imageLogo}
            resizeMode="contain"
          />
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
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: '150rem',
    height: '150rem',
  },
  viewTitle: {
    flex: 0.3,
    alignItems: 'center',
    paddingHorizontal: '40rem',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: FontSizes.startTitle,
    color: Colors.white,
    fontFamily: Fonts.light,
    textAlign: 'center',
  },
});
