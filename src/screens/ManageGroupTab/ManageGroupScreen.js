import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/ownLichTrinhReducer';
import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import SearchBar from '../../components/SearchBar';
import TeamItem from './TeamItem';

class ManageGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Quản lý nhóm du lịch',
      searchText: '',
      // isDarg: false,
      data: null,
      dataBackup: null,
      isLoading: true,
      isRefreshing: false,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (
          payload.action.type === 'Navigation/NAVIGATE' ||
          payload.action.type === 'Navigation/BACK'
        ) {
          this.setState({searchText: '', isLoading: true});
          await this.props.get_own();
        }
      },
    );
  }
  UNSAFE_componentWillMount() {
    this.setState({
      data: this.props.ownLichTrinh.data,
      dataBackup: this.props.ownLichTrinh.data,
      isLoading: false,
    });
  }
  onRefresh = async () => {
    this.setState({isRefreshing: true, searchText: ''});
    await this.props.get_own();
    this.setState({isRefreshing: false});
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ownLichTrinh.type === types.GET_OWN) {
      const {ownLichTrinh} = nextProps;
      if (ownLichTrinh.status) {
        this.setState({
          isLoading: false,
          message: ownLichTrinh.data.message
            ? ownLichTrinh.data.message
            : 'Lỗi tải thông tin :(',
        });
      } else {
        this.setState({
          isLoading: false,
          data: ownLichTrinh.data,
          dataBackup: ownLichTrinh.data,
        });
      }
    }
  }
  _renderItem = item => {
    if (!item.isShare) {
      return <TeamItem data={item} onPress={this.onPressItem} />;
    }
  };
  onSearchChangeText = text => {
    this.setState({
      searchText: text,
    });
  };
  setSearchText = text => {
    let searchText = text.replace(
      /[^a-zA-Z0-9-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ  ]/g,
      '',
    );
    this.setState({searchText: searchText});
    let data = this.state.dataBackup;
    searchText = searchText.trim().toLowerCase();
    data = data.filter(element => {
      let searchData = null;
      let sText =
        element.departure.destination_name +
        element.destination.destination_name;
      searchData = sText.toLowerCase().match(searchText);
      return searchData;
    });
    this.setState({
      data: data,
    });
  };
  onPressItem = item => {
    let currentDate = new Date();
    let startDate = new Date(item.start_day);
    let isWillGo = false;
    if (startDate < currentDate) {
      isWillGo = true;
    }
    this.props.navigation.navigate('InfoGroup', {
      location: 'ManageGroup',
      data: item,
      title:
        item.departure.destination_name +
        ' - ' +
        item.destination.destination_name,
      isWillGo: isWillGo,
    });
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
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressAddButton = () => {
    this.props.navigation.navigate('CreateTeam');
  };

  render() {
    const {title, searchText, data, isLoading} = this.state;
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={EStyleSheet.value('60rem')}
            color="#34D374"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            title={title}
            onChangeText={this.setSearchText}
            value={searchText}
          />
        </View>
        <View styles={styles.content}>
          <View
            style={{
              paddingBottom: EStyleSheet.value('100rem'),
            }}>
            <Text style={styles.text}>Danh sách nhóm của bạn</Text>
            <FlatList
              contentContainerStyle={{
                paddingBottom: EStyleSheet.value('40rem'),
                paddingHorizontal: EStyleSheet.value('20rem'),
              }}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={item => item._id}
              onScrollEndDrag={() => this._handleEndDrag()}
              onScrollBeginDrag={() => this._handleStartDrag()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
            />
          </View>
        </View>
        {/* {this.state.isDarg ? null : (
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
        )} */}
      </View>
    );
  }
}
const mapStateToProps = ({user, ownLichTrinh}) => {
  return {
    user: user,
    ownLichTrinh: ownLichTrinh,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_own: () => dispatch(actions.get_own()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageGroupScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '50rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
  },
  text: {
    marginLeft: '20rem',
    marginTop: '10rem',
    fontFamily: constants.Fonts.regular,
    fontSize: constants.FontSizes.header,
  },
  content: {
    justifyContent: 'center',
  },
  addButton: {
    width: '70rem',
    height: '70rem',
    position: 'absolute',
    right: '10rem',
    bottom: '0rem',
  },
});
