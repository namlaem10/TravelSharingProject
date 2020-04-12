import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import database from '../../utils/fireBaseConfig';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
const idGroup = 'group1';
const idUser = 'mem2';
const RADIUS = 1000;
export default class TrackingMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayMem: null,
      isLoading: true,
      lastPosition: null,
      region: {
        latitude: 12.284453612548909,
        longitude: 107.5169186666079,
        latitudeDelta: 21,
        longitudeDelta: 21,
      },
    };
  }

  DistanceCalculation = array => {
    let distances = [];
    const leader = array.find(e => e.rank === 'leader');
    array.map(item => {
      if (item.id !== leader.id) {
        let dis = getDistance(
          {
            latitude: leader.location.latitude,
            longitude: leader.location.longitude,
          },
          {
            latitude: item.location.latitude,
            longitude: item.location.longitude,
          },
        );
        if (dis > 1000) {
          distances.push({id: item.id, dis: dis});
        }
      }
    });
    console.log('this members is out of range!!! ', distances);
  };

  UNSAFE_componentWillMount = async () => {
    const GroupRef = database.ref('groups/' + idGroup);
    const snapshot = await GroupRef.once('value');
    let arrayMem = [];
    let array = snapshot.val();
    Object.keys(array.members).forEach((key, index) => {
      arrayMem.push(array.members[key]);
    });
    this.setState({
      arrayMem,
    });

    Geolocation.watchPosition(position => {
      const {longitude, latitude} = position.coords;
      database.ref('groups/' + idGroup + '/members/' + idUser).update({
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        name: 'Thien',
      });
      this.setState({
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
        isLoading: false,
        lastPosition: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    });
    GroupRef.on(
      'child_changed',
      function(data) {
        arrayMem = [];
        let changeArray = data.val();
        Object.keys(changeArray).forEach((key, index) => {
          arrayMem.push(changeArray[key]);
        });
        this.setState({
          arrayMem,
        });
      }.bind(this),
    );
    this.DistanceCalculation(arrayMem);
  };
  render() {
    const {arrayMem, isLoading, lastPosition, region} = this.state;
    let leader = null;
    if (arrayMem !== null) {
      leader = arrayMem.find(e => e.rank === 'leader');
    }
    return isLoading ? (
      <ActivityIndicator size={EStyleSheet.value('60rem')} color="#34D374" />
    ) : (
      <View style={styles.container}>
        <MapView style={styles.mapView} region={region}>
          {leader !== null ? (
            <MapView.Circle
              center={leader.location}
              radius={RADIUS}
              strokeWidth={1}
              strokeColor={'#1a66ff'}
              fillColor={'rgba(230,238,255,0.5)'}
            />
          ) : null}
          {lastPosition !== null ? (
            <Marker coordinate={lastPosition} title={'Bạn'}>
              <View style={styles.markerCustom}>
                <Image
                  source={constants.Images.IC_AVATAR1}
                  style={{
                    height: EStyleSheet.value('24rem'),
                    width: EStyleSheet.value('24rem'),
                    borderRadius: EStyleSheet.value('12rem'),
                  }}
                />
              </View>
            </Marker>
          ) : null}
          {arrayMem !== null
            ? arrayMem.map(item => {
                if (item.id !== idUser) {
                  return (
                    <Marker
                      key={item.id}
                      coordinate={{
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                      }}
                      title={item.name}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.rank === 'leader' ? (
                          <Text style={styles.leaderText}>Nhóm Trưởng</Text>
                        ) : null}
                        <View style={styles.markerCustomAnother}>
                          <Image
                            source={constants.Images.IC_AVATAR2}
                            style={{
                              height: EStyleSheet.value('24rem'),
                              width: EStyleSheet.value('24rem'),
                              borderRadius: EStyleSheet.value('12rem'),
                            }}
                          />
                        </View>
                      </View>
                    </Marker>
                  );
                }
              })
            : null}
        </MapView>
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
  markerCustom: {
    width: '45rem',
    height: '45rem',
    borderRadius: '22.5rem',
    backgroundColor: 'rgba(0,0,200,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerCustomAnother: {
    backgroundColor: 'rgba(52,211,116,0.4)',
    width: '45rem',
    height: '45rem',
    borderRadius: '22.5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderText: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.bold,
    backgroundColor: 'rgba(52,211,116,0.4)',
    borderRadius: '5rem',
    width: '120rem',
    height: '25rem',
    textAlign: 'center',
    color: 'white',
  },
});
