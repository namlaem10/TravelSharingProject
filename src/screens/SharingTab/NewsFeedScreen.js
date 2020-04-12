import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import * as constants from '../../utils/Constants';
import NewsFeedItem from './SharingTapComponents/NewsFeedItem';
import {FeedNews} from '../../utils/fakedata';
import EStyleSheet from 'react-native-extended-stylesheet';
import {BASE_URL} from '../../services/URL';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/allLichTrinhReducer';

EStyleSheet.build({$rem: constants.WIDTH / 380});
class NewsFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isLoading: true,
      message: '',
    };
  }
  componentDidMount = async () => {
    await this.props.get_all();
    const {allLichTrinh} = this.props;
    if (allLichTrinh.status) {
      this.setState({
        isLoading: false,
        message: allLichTrinh.data.message
          ? allLichTrinh.data.message
          : 'Lỗi tải thông tin :(',
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  onSearchChangeText = text => {
    this.setState({
      searchText: text,
    });
  };
  onPressItem = item => {
    this.props.navigation.navigate('PostDetail', {
      data: item,
    });
  };
  render() {
    const {searchText, isLoading, message} = this.state;
    const {allLichTrinh, user} = this.props;
    const User = user.data;
    let avatar = null;
    if (User) {
      avatar = BASE_URL + '/' + User.avatar;
    }
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
                style={{
                  width: EStyleSheet.value('80rem'),
                  height: EStyleSheet.value('80rem'),
                  borderRadius: EStyleSheet.value('40rem'),
                }}
                source={
                  avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
                }
              />
            </View>
            <View style={styles.infoText}>
              <Text
                style={{
                  ...styles.Text,
                  fontFamily: constants.Fonts.medium,
                }}>
                {User.display_name}
              </Text>
              <Text style={styles.Text}>
                Số bài viết:{' '}
                <Text style={{fontFamily: constants.Fonts.medium}}>69</Text>
              </Text>
              <Text style={styles.Text}>
                Lượt yêu thích:{' '}
                <Text style={{fontFamily: constants.Fonts.medium}}>69</Text>
              </Text>
            </View>
            <View style={styles.shareButtonGroup}>
              <TouchableOpacity style={styles.ShareButton}>
                <Text
                  style={{
                    ...styles.Text,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flex: 1,
                    color: 'white',
                    fontFamily: constants.Fonts.medium,
                  }}>
                  {'Chia sẻ \n hành trình của bạn'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator
              size={EStyleSheet.value('60rem')}
              color="#34D374"
            />
          ) : allLichTrinh.data !== null ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allLichTrinh.data}
              renderItem={({item}) => (
                <NewsFeedItem
                  data={item}
                  key={item.id}
                  onPressItem={this.onPressItem}
                />
              )}
              keyExtractor={item => item._id}
            />
          ) : (
            <Text>{message}</Text>
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({user, allLichTrinh}) => {
  return {
    user: user,
    allLichTrinh: allLichTrinh,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_all: () => dispatch(actions.get_all()),
    reset: () => dispatch(actions.reset()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsFeedScreen);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    width: constants.WIDTH,
    height: '150rem',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    marginTop: '10rem',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
  },
  titleGroup: {
    paddingHorizontal: '15rem',
    width: constants.WIDTH,
  },
  userInfo: {
    flex: 3,
    flexDirection: 'row',
    paddingHorizontal: '15rem',
  },
  avatar: {
    flex: 1,
    justifyContent: 'center',
  },
  infoText: {
    flex: 1.2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: '10rem',
  },
  shareButtonGroup: {
    flex: 1.4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  Text: {
    fontSize: '13rem',
    letterSpacing: 0.1,
  },
  ShareButton: {
    height: '55rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    marginTop: '20rem',
  },
});
