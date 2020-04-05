import React, {Component} from 'react';
import {View, Text, Platform, StatusBar, FlatList, Image} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import SearchBar from '../../components/SearchBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FamousLandscapes} from '../../utils/fakedata';
export default class AddPlaceDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Thêm địa điểm',
      searchText: '',
    };
  }
  onPressCompleted = () => {
    this.props.navigation.goBack();
  };
  onChangeText = (text) => {
    this.setState({searchText: text});
  };
  onPressPlace = (item) => {
    console.log(item);
  };
  createStars = (ratingPoint) => {
    let count = ratingPoint;
    let leftstar = 5 - count;
    let starts = [];
    for (let i = 1; i <= count; i++) {
      starts.push(
        <Image
          source={constants.Images.IC_GOLD_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
          }}
        />,
      );
    }
    for (let i = 1; i <= leftstar; i++) {
      starts.push(
        <Image
          source={constants.Images.IC_NORMAL_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
          }}
        />,
      );
    }
    return starts;
  };
  _renderGoingItem = (item) => {
    return (
      <View style={styles.flatListItem} onPress={() => this.onPressPlace(item)}>
        <Image
          source={item.image}
          style={{
            width: EStyleSheet.value('60rem'),
            height: EStyleSheet.value('58rem'),
            borderRadius: EStyleSheet.value('7rem'),
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: EStyleSheet.value('220rem'),
            paddingLeft: EStyleSheet.value('10rem'),
            height: '100%',
          }}>
          <Text style={styles.textPlace}>{item.name}</Text>
          <View style={{flexDirection: 'row'}}>
            {this.createStars(item.point)}
          </View>
        </TouchableOpacity>
        <View style={{position: 'absolute', right: 0, top: 0}}>
          <TouchableOpacity>
            <Text style={{...styles.touchText}}>Chọn</Text>
          </TouchableOpacity>
        </View>
      </View>
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
          />
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => this.onPressCompleted()}
            style={{alignSelf: 'flex-end'}}>
            <Text style={{...styles.touchText}}>Hoàn tất</Text>
          </TouchableOpacity>
          <View style={styles.flatList}>
            <FlatList
              contentContainerStyle={{
                paddingBottom: EStyleSheet.value('0rem'),
              }}
              data={FamousLandscapes}
              renderItem={({item}) => this._renderGoingItem(item)}
              keyExtractor={(item) => item.id}
            />
          </View>
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
  touchText: {color: '#259CDF', fontSize: constants.FontSizes.title},
  flatList: {height: '495rem', paddingTop: '10rem'},
  flatListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '15rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    height: '58rem',
  },
  textPlace: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
  },
});
