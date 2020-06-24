import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from './Fonts';
import colors from './Colors';
import images from './Images';
if (Platform.OS === 'android') {
  //only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/vi'); // load the required locale details
}
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

export async function GetRoutes(schedule_detail, numberOfDay) {
  let scheduleDetails = [];
  try {
    for (let i = 1; i <= numberOfDay; i++) {
      if (schedule_detail['day_' + i].length > 1) {
        let startCoord = schedule_detail['day_' + i][0].location;
        let link = `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${API_KEY}&waypoint0=geo!${
          startCoord.latitude
        },${startCoord.longitude}`;
        let count = 1;
        for (let j = 1; j < schedule_detail['day_' + i].length; j++) {
          let wayPointCoord = schedule_detail['day_' + i][j].location;
          link += `&waypoint${count}=geo!${wayPointCoord.latitude},${
            wayPointCoord.longitude
          }`;
          count++;
        }
        link += '&mode=fastest;car;traffic:enabled';
        let response = await fetch(link);
        let responseJson = await response.json();
        let routes = responseJson.response.route[0];
        scheduleDetails.push(routes);
      } else {
        let routes = null;
        scheduleDetails.push(routes);
      }
    }
    return scheduleDetails;
  } catch (error) {
    console.log(error);
  }
}
export function groupBy(objectArray, property) {
  return objectArray.reduce(function(acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
export async function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX + 0.01,
    longitudeDelta: deltaY + 0.01,
  };
}
const options2 = {style: 'decimal', currency: 'VND'};
export const currencyFormatter = new Intl.NumberFormat('vi-VI', options2);
