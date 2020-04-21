import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/managerGroupReducer';

import SearchBar from '../../components/SearchBar';

//fake data
const data = [
  {
    id: 'trip1',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'going',
  },
  {
    id: 'trip2',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'going',
  },
  {
    id: 'trip3',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'going',
  },
  {
    id: 'trip4',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'going',
  },
  {
    id: 'trip5',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'going',
  },
  {
    id: 'trip6',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'going',
  },
  {
    id: 'trip7',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'will go',
  },
  {
    id: 'trip8',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'will go',
  },
  {
    id: 'trip9',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'will go',
  },
  {
    id: 'trip10',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'will go',
  },
  {
    id: 'trip11',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'will go',
  },
  {
    id: 'trip12',
    place: 'TP. Hồ Chí Minh - Đà Lạt',
    time: '29/03/2020 - 02/04/2020',
    status: 'will go',
  },
];

class AddTripScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Chọn lịch trình',
      searchText: '',
    };
  }
  onSearchChangeText = text => {
    this.setState({searchText: text});
  };
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressTrip = item => {
    this.props.update_trip(item);
    this.props.navigation.goBack();
  };

  _renderGoingItem = item => {
    return (
      <TouchableOpacity
        style={styles.flatListItem}
        onPress={() => this.onPressTrip(item)}>
        <View style={{marginRight: EStyleSheet.value('10rem')}}>
          <Image
            source={constants.Images.IC_EARTH_GREEN}
            style={{
              width: EStyleSheet.value('30rem'),
              height: EStyleSheet.value('30rem'),
            }}
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.textPlace}>{item.place}</Text>
          <Text style={styles.textTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {title, searchText} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            title={title}
            onChangeText={this.onSearchChangeText}
            value={searchText}
            isBack={true}
            onPressBack={this.onPressBack}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.listTripGroup}>
            <Text
              style={{
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('18rem'),
                marginBottom: EStyleSheet.value('10rem'),
              }}>
              Lịch trình sắp bắt đầu
            </Text>
            <View style={styles.flatList}>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: EStyleSheet.value('0rem'),
                }}
                data={data}
                renderItem={({item}) =>
                  item.status === 'going' ? this._renderGoingItem(item) : null
                }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          <View style={styles.listTripGroup}>
            <Text
              style={{
                fontFamily: constants.Fonts.medium,
                fontSize: EStyleSheet.value('18rem'),
                marginBottom: EStyleSheet.value('10rem'),
              }}>
              Lịch trình đang đi
            </Text>
            <View style={styles.flatList}>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: EStyleSheet.value('0rem'),
                }}
                data={data}
                renderItem={({item}) =>
                  item.status === 'will go' ? this._renderGoingItem(item) : null
                }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update_trip: params => dispatch(actions.update_trip(params)),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  null,
  mapDispatchToProps,
)(AddTripScreen);

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '60rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  content: {paddingTop: '10rem', paddingHorizontal: '23rem'},
  flatList: {height: '230rem'},
  flatListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: '10rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    height: '60rem',
  },
  textPlace: {
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.regular,
  },
  textTime: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
  },
});
