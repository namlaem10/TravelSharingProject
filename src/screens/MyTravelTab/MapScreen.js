import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import MapView, {Marker, Polyline} from 'react-native-maps';
import HeaderBar from '../../components/HeaderBar';
import Geolocation from '@react-native-community/geolocation';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Lịch trình',
      region: {
        latitude: 12.284453612548909,
        longitude: 107.5169186666079,
        latitudeDelta: 21,
        longitudeDelta: 21,
      },
      routing: [],
      data: null,
      isLoading: true,
      userLocation: null,
    };
  }
  async UNSAFE_componentWillMount() {
    const points = this.props.navigation.getParam('points');
    let newRegion = await constants.getRegionForCoordinates(points);
    Geolocation.getCurrentPosition(position => {
      const {longitude, latitude} = position.coords;
      this.setState({
        routing: this.props.navigation.getParam('routing'),
        data: this.props.navigation.getParam('data'),
        region: newRegion,
        isLoading: false,
        userLocation: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    });
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressMyLocation = async () => {
    let points = this.props.navigation.getParam('points');
    points.push(this.state.userLocation);
    let newRegion = await constants.getRegionForCoordinates(points);
    this.setState({
      region: newRegion,
    });
  };
  render() {
    const {title, region, routing, data, isLoading, userLocation} = this.state;
    return isLoading ? (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size={EStyleSheet.value('60rem')} color="#34D374" />
        <Text>Bản đồ đang tải xuống...</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <HeaderBar title={title} onPressBack={this.onPressBack} />
          </View>
        </View>
        <MapView style={styles.mapView} region={region}>
          {userLocation !== null ? (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title={'Vị trí của bạn'}
            />
          ) : null}
          {data.map(item => {
            return (
              <Marker
                key={item._id}
                coordinate={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                }}
                title={item.tourist_destination_name}
              />
            );
          })}
          {routing !== undefined ? (
            <Polyline
              coordinates={routing}
              strokeColor="#4C79FF" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                '#7F0000',
                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                '#B24112',
                '#E5845C',
                '#238C23',
                '#7F0000',
              ]}
              strokeWidth={4}
            />
          ) : null}
        </MapView>
        <View style={styles.locateUserGroup}>
          <TouchableOpacity onPress={() => this.onPressMyLocation()}>
            <Image
              style={styles.myLocation}
              source={constants.Images.IC_MY_LOCATION}
            />
          </TouchableOpacity>
        </View>
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
  mapView: {
    flex: 1,
  },
  leaderText: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
    borderRadius: '2rem',
    textAlign: 'center',
    color: 'black',
  },
  markerCustomAnother: {
    backgroundColor: 'rgba(52,211,116,0.4)',
    width: '45rem',
    height: '45rem',
    borderRadius: '22.5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locateUserGroup: {
    position: 'absolute',
    height: '40rem',
    width: '40rem',
    borderRadius: '20rem',
    backgroundColor: 'rgba(255,255,255,0.7)',
    right: '10rem',
    top: '110rem',
  },
  myLocation: {
    height: '40rem',
    width: '40rem',
    borderRadius: '20rem',
  },
});
