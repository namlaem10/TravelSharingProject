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
      data: null,
      avatar: this.props.user.data.user_info.avatar || null,
      user: this.props.user.data.user_info || null,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (payload.action.type === 'Navigation/NAVIGATE') {
          await this.props.get_all();
        }
      },
    );
  }
  UNSAFE_componentWillMount = async () => {
    await this.props.get_all();
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.allLichTrinh.type === types.GET_ALL) {
      const {allLichTrinh} = nextProps;
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
          data: allLichTrinh.data,
        });
      }
    }
  }
  onSearchChangeText = text => {
    this.setState({
      searchText: text,
    });
  };
  onPressItem = item => {
    this.props.navigation.navigate('PostDetail', {data: item});
  };
  render() {
    const {searchText, isLoading, message, data, avatar, user} = this.state;
    let uriAvatar = null;
    uriAvatar = BASE_URL + '/' + avatar;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <SearchBar
              onChangeText={this.onSearchChangeText}
              value={searchText}
              placeHolder={'Nhập địa điểm bạn tìm kiếm'}
              title={'Hành trình phổ biến'}
            />
          </View>
        </View>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator
              size={EStyleSheet.value('60rem')}
              color="#34D374"
            />
          ) : data !== null ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({item}) =>
                item.isShare ? (
                  <NewsFeedItem
                    data={item}
                    key={item._id}
                    onPressItem={this.onPressItem}
                  />
                ) : null
              }
              keyExtractor={item => item._id}
            />
          ) : (
            <Text
              styles={{
                fontSize: EStyleSheet.value('20rem'),
                fontFamily: constants.Fonts.regular,
              }}>
              {message}
            </Text>
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
    height: '50rem',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    marginTop: '10rem',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
