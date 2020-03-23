import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import SearchBar from '../../components/SearchBar';
import * as contants from '../../utils/Contants';
import NewsFeedItem from './SharingTapComponents/NewsFeedItem';
import { FeedNews } from './SharingTapComponents/fakedata';
export default class NewsFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  onSearchChangeText = text => {
    this.setState({
      searchText: text,
    });
  };

  render() {
    const { searchText } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <SearchBar
              onChangeText={this.onSearchChangeText}
              value={searchText}
              placeHolder={'Nhập để tìm kiếm'}
              title={'Hành trình phổ biến'}
            />
          </View>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Image
                style={{ width: 85, height: 85 }}
                source={require("../../assets/images/avatar.png")}
              />
            </View>
            <View style={styles.infoText}>
              <Text style={{ ...styles.Text, fontFamily: contants.Fonts.medium }}>
                Nam ngu si
              </Text>
              <Text style={styles.Text}>
                Số bài viết: <Text style={{ fontFamily: contants.Fonts.medium }}>69</Text>
              </Text>
              <Text style={styles.Text}>
                Lượt yêu thích : <Text style={{ fontFamily: contants.Fonts.medium }}>69</Text>
              </Text>
            </View>
            <View style={styles.shareButtonGroup}>
              <TouchableOpacity style={styles.ShareButton}>
                <Text
                  style={{
                    ...styles.Text, textAlign: 'center',
                    textAlignVertical: 'center', flex: 1,
                    color: 'white',
                    fontFamily: contants.Fonts.medium
                  }}>
                  Chia sẻ {"\n"}
                  Hành trình của bạn
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <FlatList
            data={FeedNews}
            renderItem={
              ({ item }) => <NewsFeedItem
                key={item.id}
                data={item}
              />
            }
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CFCFCF'
  },
  content: {
    flex: 3,
  },
  titleGroup: {
    marginHorizontal: 10,
    flex: 1,
  },
  userInfo: {
    flex: 3,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
  },
  infoText: {
    flex: 1.3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  shareButtonGroup: {
    flex: 1.3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  Text: {
    fontSize: 12.5,
    letterSpacing: 1.5,
  },
  ShareButton: {
    height: 49,
    backgroundColor: '#34D374',
    borderRadius: 5,
    marginTop: contants.HEIGHT / 50,
  }
});
