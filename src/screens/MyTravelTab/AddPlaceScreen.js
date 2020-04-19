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
import {actions, types} from '../../redux/reducers/myTravelPlaceReducer';
import SearchBar from '../../components/SearchBar';

//fake data
import {Places} from '../../utils/fakedata';

class AddPlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Chọn Điểm xuất phát',
      searchText: '',
      isStart: this.props.navigation.getParam('isStart', false),
      desitnationArray: [],
    };
  }
  UNSAFE_componentWillMount = async () => {
    await this.props.getDestination();
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({desitnationArray: nextProps.desitnation});
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
  onPressPlace = item => {
    if (this.state.isStart) {
      this.props.pickStartPlace(item);
    } else {
      this.props.pickEndPlace(item);
    }
    this.props.navigation.goBack();
  };
  _renderGoingItem = item => {
    if (item) {
      return (
        <TouchableOpacity
          style={styles.flatListItem}
          onPress={() => this.onPressPlace(item)}>
          <View style={{marginRight: EStyleSheet.value('10rem')}}>
            <Image
              source={constants.Images.IC_LOCATION_ACTIVE}
              style={{
                width: EStyleSheet.value('30rem'),
                height: EStyleSheet.value('30rem'),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: EStyleSheet.value('290rem'),
            }}>
            <Text style={styles.textPlace}>{item.destination_name}</Text>
            <Text style={styles.textFar}> {item.distance} km</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  render() {
    const {title, searchText, desitnationArray} = this.state;
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
              Địa điểm phổ biến
            </Text>
            <View style={styles.flatList}>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: EStyleSheet.value('0rem'),
                }}
                data={desitnationArray.data}
                renderItem={({item}) => this._renderGoingItem(item)}
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStatetToProps = ({desitnation}) => {
  return {
    desitnation: desitnation,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pickStartPlace: params => dispatch(actions.pickStartPlace(params)),
    pickEndPlace: params => dispatch(actions.pickEndPlace(params)),
    getDestination: () => dispatch(actions.getDestination()),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStatetToProps,
  mapDispatchToProps,
)(AddPlaceScreen);
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
  flatList: {height: '495rem'},
  flatListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '10rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    height: '40rem',
  },
  textPlace: {
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.regular,
  },
  textFar: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
  },
});
