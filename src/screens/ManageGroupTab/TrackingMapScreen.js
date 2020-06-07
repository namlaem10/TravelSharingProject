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
import database from '../../utils/fireBaseConfig';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/notificationReducer';
import HeaderBar from '../../components/HeaderBar';
import moment from 'moment';

const RADIUS = 1000;
class TrackingMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Vị trí nhóm',
      arrayMem: [],
      isLoading: true,
      lastPosition: null,
      region: {
        latitude: 12.284453612548909,
        longitude: 107.5169186666079,
        latitudeDelta: 21,
        longitudeDelta: 21,
      },
      user: null,
      groupData: null,
      isLeader: false,
      isAlert: false,
    };
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '' && location !== 'notificationService') {
      if (location === 'Notification') {
        this.props.navigation.navigate(location);
      } else {
        this.props.navigation.navigate(location, {
          data: this.props.navigation.getParam('data'),
          isLeader: this.state.isLeader,
          title: this.props.navigation.getParam('title'),
        });
      }
    } else if (location === 'notificationService') {
      let data = this.state.groupData;
      let title =
        data.departure.destination_name +
        ' - ' +
        data.destination.destination_name;
      this.props.navigation.navigate('InfoGroup', {data: data, title: title});
    } else {
      this.props.navigation.goBack();
    }
  };
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
          distances.push({user: item, dis: dis});
        }
      }
    });
    if (distances.length > 0) {
      let arrayMemAway = [];
      distances.map(item => {
        let dis = Math.round((item.dis / 1000) * 10 + Number.EPSILON) / 10;
        let name = item.user.id;
        let mem = {
          name: name,
          dis: dis,
        };
        arrayMemAway.push(mem);
      });
      if (
        this.state.isAlert === false &&
        this.props.navigation.getParam('location') !== 'Notification'
      ) {
        this.props.push_noti(
          this.state.groupData._id,
          arrayMemAway,
          this.state.groupData.member,
        );
      }
    }
  };
  componentDidMount() {
    const location = this.props.navigation.getParam('location', '');
    if (location === 'notificationService') {
      this.props.get_travel_by_id(
        this.props.navigation.getParam('idHanhTrinh'),
      );
    } else {
      let groupData = this.props.navigation.getParam('data');
      const user = this.props.user.data;
      let isLeader = false;
      if (user.user_info._id === groupData.create_by._id) {
        isLeader = true;
      }
      Geolocation.getCurrentPosition(position => {
        const {longitude, latitude} = position.coords;
        database
          .ref('groups/' + groupData._id + '/members/' + user.user_info._id)
          .update({
            id: user.user_info._id,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            name: user.user_info.display_name,
            rank: isLeader ? 'leader' : 'member',
            avatar: user.user_info.avatar,
          });
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          lastPosition: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      });

      Geolocation.watchPosition(position => {
        const {longitude, latitude} = position.coords;
        database
          .ref('groups/' + groupData._id + '/members/' + user.user_info._id)
          .update({
            id: user.user_info._id,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            name: user.user_info.display_name,
            rank: isLeader ? 'leader' : 'member',
            avatar: user.user_info.avatar,
          });
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          lastPosition: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      });
    }
  }
  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.notification.type === types.GET_TRAVEL_BY_ID) {
      const {notification} = nextProps;
      let groupData = notification.data;
      let user = this.props.user.data;
      let isLeader = false;
      if (user.user_info._id === groupData.create_by._id) {
        isLeader = true;
      }
      const GroupRef = database.ref('groups/' + groupData._id);
      const snapshot = await GroupRef.once('value');
      let arrayMem = [];
      let array = snapshot.val();
      if (array === null) {
        GroupRef.set({
          members: [],
        });
      } else {
        Object.keys(array.members).forEach((key, index) => {
          arrayMem.push(array.members[key]);
        });
      }
      this.setState({
        arrayMem,
        user: user,
        isLoading: false,
        groupData: groupData,
        isLeader: isLeader,
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

      Geolocation.getCurrentPosition(position => {
        const {longitude, latitude} = position.coords;
        database
          .ref('groups/' + groupData._id + '/members/' + user.user_info._id)
          .update({
            id: user.user_info._id,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            name: user.user_info.display_name,
            rank: isLeader ? 'leader' : 'member',
            avatar: user.user_info.avatar,
          });
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          lastPosition: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      });

      Geolocation.watchPosition(position => {
        const {longitude, latitude} = position.coords;
        database
          .ref('groups/' + groupData._id + '/members/' + user.user_info._id)
          .update({
            id: user.user_info._id,
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            name: user.user_info.display_name,
            rank: isLeader ? 'leader' : 'member',
            avatar: user.user_info.avatar,
          });
        this.setState({
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          },
          lastPosition: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      });
      let warmMess = 'Thành viên ngoài phạm vi cho phép: ';
      const array_away = this.props.navigation.getParam('member_away');
      array_away.map(item => {
        warmMess += ` ${item.name} - ${item.distance}km `;
      });
      if (this.state.isAlert === false) {
        Alert.alert('Cảnh báo', warmMess);
        this.setState({isAlert: true});
      }
    }
  }
  UNSAFE_componentWillMount = async () => {
    const location = this.props.navigation.getParam('location', '');
    if (location === 'notificationService') {
      this.props.get_travel_by_id(
        this.props.navigation.getParam('idHanhTrinh'),
      );
    } else {
      let groupData = this.props.navigation.getParam('data');
      let user = this.props.user.data;
      let isLeader = false;
      if (user.user_info._id === groupData.create_by._id) {
        isLeader = true;
      }
      const GroupRef = database.ref('groups/' + groupData._id);
      const snapshot = await GroupRef.once('value');
      let arrayMem = [];
      let array = snapshot.val();
      if (array === null) {
        GroupRef.set({
          members: [],
        });
      } else {
        Object.keys(array.members).forEach((key, index) => {
          arrayMem.push(array.members[key]);
        });
      }
      this.setState({
        arrayMem,
        user: user,
        isLoading: false,
        groupData: groupData,
        isLeader: isLeader,
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
    }
  };
  render() {
    const {
      arrayMem,
      isLoading,
      lastPosition,
      region,
      user,
      isLeader,
      title,
    } = this.state;
    let leader = null;
    if (arrayMem !== []) {
      leader = arrayMem.find(e => e.rank === 'leader');
    }
    let avatar = null;
    if (user !== null) {
      if (user.user_info.avatar !== null) {
        avatar = user.user_info.avatar;
      }
    }
    return isLoading ? (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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
            <Marker coordinate={lastPosition}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.leaderText}>Bạn</Text>
                <View style={styles.markerCustom}>
                  <Image
                    source={
                      avatar !== null
                        ? {uri: avatar}
                        : constants.Images.IC_AVATAR1
                    }
                    style={{
                      height: EStyleSheet.value('24rem'),
                      width: EStyleSheet.value('24rem'),
                      borderRadius: EStyleSheet.value('12rem'),
                    }}
                  />
                </View>
              </View>
            </Marker>
          ) : null}
          {arrayMem !== []
            ? arrayMem.map(item => {
                if (item.id !== user.user_info._id) {
                  return (
                    <Marker
                      key={item.id}
                      coordinate={{
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.leaderText}>{item.name}</Text>
                        <View
                          style={
                            item.rank === 'leader'
                              ? styles.markerCustomForLeader
                              : styles.markerCustomAnother
                          }>
                          <Image
                            source={
                              item.avatar !== undefined
                                ? {
                                    uri: item.avatar,
                                  }
                                : constants.Images.IC_AVATAR1
                            }
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
const mapStateToProps = ({user, groupInfo, notification}) => {
  return {
    user: user,
    groupInfo: groupInfo,
    notification: notification,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    push_noti: (idHanhTrinh, data, arrayMember) =>
      dispatch(actions.push_noti(idHanhTrinh, data, arrayMember)),
    get_travel_by_id: idHanhTrinh =>
      dispatch(actions.get_travel_by_id(idHanhTrinh)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackingMapScreen);
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
  markerCustomForLeader: {
    backgroundColor: 'rgba(247,130,30,0.6)',
    width: '45rem',
    height: '45rem',
    borderRadius: '22.5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderText: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
    borderRadius: '2rem',
    textAlign: 'center',
    color: 'black',
  },
});
