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

import SearchBar from '../../components/SearchBar';
import {ScrollableTabView} from '@valdio/react-native-scrollable-tabview';
import CustomTabBarNoScroll from '../../components/CustomTabBarNoScroll';
const tabStyle = {};
import {FeedNews} from '../../utils/fakedata';
import TravelItem from './TravelItem';
import TravelItemGone from './TravelItemGone';
import EmptyTab from './EmptyTab';

const fakeData = [];
export default class MyTravelScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Lịch trình của tôi',
      searchText: '',
      isDarg: false,
    };
  }
  onSearchChangeText = (text) => {
    this.setState({
      searchText: text,
    });
  };
  onPressItem = (id) => {
    this.props.navigation.navigate('TripDetail', {itemId: id});
  };
  _handleStartDrag = () => {
    this.setState({
      isDarg: true,
    });
  };
  _handleEndDrag = () => {
    this.setState({
      isDarg: false,
    });
  };
  onPressConfirm = (item) => {
    this.props.navigation.navigate('ShareTimeLineDetail', {
      action: 'sharing',
      item: item,
    });
  };
  onPressAddButton = () => {
    console.log('Add');
  };
  _renderWillGo = () => {
    return (
      <View tabLabel="Sắp đi">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={FeedNews}
          renderItem={({item}) => (
            <TravelItem data={item} onPressItem={this.onPressItem} />
          )}
          keyExtractor={(item) => item.id}
          onScrollEndDrag={() => this._handleEndDrag()}
          onScrollBeginDrag={() => this._handleStartDrag()}
        />
        {this.state.isDarg ? null : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.onPressAddButton()}>
            <Image
              source={constants.Images.IMAGE_ADD_CIRCLE_BUTTON}
              style={{
                width: EStyleSheet.value('70rem'),
                height: EStyleSheet.value('70rem'),
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  _renderGoin = () => {
    return (
      <FlatList
        tabLabel="Đang đi"
        showsVerticalScrollIndicator={false}
        data={FeedNews}
        renderItem={({item}) => (
          <TravelItem data={item} onPressItem={this.onPressItem} />
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };
  _renderGone = () => {
    return (
      <FlatList
        tabLabel="Đã đi"
        showsVerticalScrollIndicator={false}
        data={FeedNews}
        renderItem={({item}) => (
          <TravelItemGone
            data={item}
            onPressConfirm={this.onPressConfirm}
            onPressItem={this.onPressItem}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
        <ScrollableTabView
          renderTabBar={() => (
            <CustomTabBarNoScroll
              activeTextColor={'white'}
              inactiveTextColor={'#B7B7B7'}
              tabStyle={tabStyle}
              backgroundColor={'white'}
            />
          )}>
          {fakeData.length > 1 ? (
            this._renderWillGo()
          ) : (
            <EmptyTab tabLabel="Đã đi" />
          )}
          {this._renderGoin()}
          {this._renderGone()}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: '30rem',
  },
  header: {
    width: '100%',
    height: '60rem',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
  },
  addButton: {
    width: '70rem',
    height: '70rem',
    position: 'absolute',
    right: '10rem',
    bottom: '0rem',
  },
});
