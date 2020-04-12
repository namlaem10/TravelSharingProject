import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from './Fonts';
import colors from './Colors';
import images from './Images';

export const Fonts = fonts;

export const Colors = colors;

export const Images = images;

export const WIDTH = Dimensions.get('window').width;

export const HEIGHT = Dimensions.get('window').height;

EStyleSheet.build({$rem: WIDTH / 380});

export const FontSizes = {
  big: '42rem',
  time: '34rem',
  percent: '32rem',
  number: '28rem',
  headline: '26rem',
  startTitle: '24rem',
  onBoardingTitle: '22rem',
  header: '20rem',
  title: '18rem',
  regular: '16rem',
  normal: '14rem',
  smalltext: '12rem',
  tabTitle: '10rem',
};

export const API_KEY = 'Hkbvju0uKF1GS4Ex45IGlrxvZC7c2Vx0So2B8yPnRnU';
