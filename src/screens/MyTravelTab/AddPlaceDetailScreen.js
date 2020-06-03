import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import SearchBar from '../../components/SearchBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/detailLichTrinhReducer.js';
class AddPlaceDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Thêm địa điểm',
      searchText: '',
      famousLandscapes: [],
      famousLandscapesBackup: [],
      ChoseItem: [],
      loadingVisible: false,
    };
  }
  componentDidMount() {
    let destinationId = this.props.navigation.getParam('destinationId');
    this.props.get_landscapes(destinationId);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.detailLichTrinh.type === types.GET_LANDSCAPES) {
      this.setState({
        famousLandscapes: nextProps.detailLichTrinh.data,
        famousLandscapesBackup: nextProps.detailLichTrinh.data,
      });
    } else if (nextProps.detailLichTrinh.type === types.ADD_LANDSCAPES) {
      setTimeout(() => {
        this.props.navigation.goBack();
        this.setState({
          loadingVisible: false,
        });
      }, 1000);
    }
  }
  onPressCompleted = () => {
    this.setState({
      loadingVisible: true,
    });
    const {ChoseItem, famousLandscapes} = this.state;
    const keyDay = this.props.navigation.getParam('keyDay');
    const scheduledetail = this.props.navigation.getParam('schedule_detail');
    const number_of_days = this.props.navigation.getParam('totalDay');
    let addItems = [];
    ChoseItem.map(item => {
      var land = famousLandscapes.find(x => x._id === item);
      addItems.push(land);
    });
    this.props.add_landscapes(addItems, keyDay, scheduledetail, number_of_days);
    //this.props.navigation.goBack();
  };
  setSearchText = text => {
    let searchText = text.replace(/[^a-zA-Z-  ]/g, '');
    this.setState({searchText: searchText});
    let data = this.state.famousLandscapesBackup;
    searchText = searchText.trim().toLowerCase();
    data = data.filter(element => {
      let searchData = null;
      let sText = element.tourist_destination_name;
      searchData = sText.toLowerCase().match(searchText);
      return searchData;
    });
    this.setState({
      famousLandscapes: data,
    });
  };
  onPressPlace = item => {
    console.log(item);
  };
  onPressChoseItem = item => {
    const {ChoseItem} = this.state;
    const newArray = ChoseItem;
    newArray.push(item._id);
    this.setState({ChoseItem: newArray});
  };
  inPressUnSelectItem = item => {
    const {ChoseItem} = this.state;
    const newArray = ChoseItem;
    const index = newArray.indexOf(item._id);
    if (index > -1) {
      newArray.splice(index, 1);
    }
    this.setState({ChoseItem: newArray});
  };
  onPressItem = item => {
    this.props.navigation.navigate('Rating', {data: item});
  };
  createStars = point => {
    let count = point;
    let leftstar = 5 - count;
    let starts = [];
    for (let i = 1; i <= count; i++) {
      starts.push(
        <Image
          key={i}
          source={constants.Images.IC_GOLD_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
            resizeMode: 'contain',
          }}
        />,
      );
    }
    for (let i = 1; i <= leftstar; i++) {
      starts.push(
        <Image
          key={`${i}+1`}
          source={constants.Images.IC_NORMAL_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
            resizeMode: 'contain',
          }}
        />,
      );
    }
    return starts;
  };
  _renderGoingItem = item => {
    const {ChoseItem} = this.state;
    let isChose = false;
    if (ChoseItem.includes(item._id)) {
      isChose = true;
    }
    return (
      <View style={styles.flatListItem} onPress={() => this.onPressPlace(item)}>
        <Image
          source={{uri: item.tourist_destination_image}}
          style={{
            width: EStyleSheet.value('60rem'),
            height: EStyleSheet.value('60rem'),
            borderRadius: EStyleSheet.value('10rem'),
          }}
        />
        <TouchableOpacity
          onPress={() => this.onPressItem(item)}
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: EStyleSheet.value('220rem'),
            paddingLeft: EStyleSheet.value('10rem'),
            height: '100%',
          }}>
          <Text numberOfLines={1} style={styles.textPlace}>{item.tourist_destination_name}</Text>
          <View style={{flexDirection: 'row'}}>
            {item.rating_count === 0 ? (
              <Text>Chưa có đánh giá</Text>
            ) : (
              this.createStars(item.rating)
            )}
          </View>
        </TouchableOpacity>
        <View style={{position: 'absolute', right: 0, top: 0}}>
          {isChose ? (
            <TouchableOpacity onPress={() => this.inPressUnSelectItem(item)}>
              <Text style={{...styles.touchUnSelectText}}>Bỏ chọn</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.onPressChoseItem(item)}>
              <Text style={{...styles.touchText}}>Chọn</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  render() {
    const {title, searchText, famousLandscapes} = this.state;
    return (
      <View style={styles.container}>
        <Dialog visible={this.state.loadingVisible}>
          <DialogContent>
            <View style={styles.loadingCompleted}>
              <ActivityIndicator
                size={EStyleSheet.value('60rem')}
                color="#34D374"
              />
              <Text
                style={{
                  fontFamily: constants.Fonts.light,
                  fontSize: EStyleSheet.value('15rem'),
                  letterSpacing: 1,
                  marginLeft: EStyleSheet.value('5rem'),
                }}>
                Đang tạo hành trình...
              </Text>
            </View>
          </DialogContent>
        </Dialog>
        <View style={styles.header}>
          <SearchBar
            title={title}
            onChangeText={this.setSearchText}
            value={searchText}
          />
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => this.onPressCompleted()}
            style={{alignSelf: 'flex-end'}}>
            <Text
              style={{
                ...styles.touchText,
                fontSize: EStyleSheet.value('18rem'),
              }}>
              Hoàn tất
            </Text>
          </TouchableOpacity>
          <View style={styles.flatList}>
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: EStyleSheet.value('0rem'),
              }}
              showsVerticalScrollIndicator={false}
              data={famousLandscapes}
              renderItem={({item}) => this._renderGoingItem(item)}
              keyExtractor={item => item._id}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({detailLichTrinh}) => {
  return {
    detailLichTrinh: detailLichTrinh,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    get_landscapes: params => dispatch(actions.get_landscapes(params)),
    add_landscapes: (arrayItems, keyDay, scheduledetail, number_of_days) =>
      dispatch(
        actions.add_landscapes(
          arrayItems,
          keyDay,
          scheduledetail,
          number_of_days,
        ),
      ),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPlaceDetailScreen);
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
  content: {
    flex: 1,
    paddingTop: '10rem',
    paddingHorizontal: '23rem',
  },
  touchText: {
    color: '#259CDF',
    fontFamily: constants.Fonts.medium,
    fontSize: constants.FontSizes.regular,
  },
  touchUnSelectText: {
    color: 'red',
    fontFamily: constants.Fonts.medium,
    fontSize: constants.FontSizes.regular,
  },
  flatList: {
    flex: 1,
    height: '100%',
    paddingTop: '10rem',
  },
  flatListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '15rem',
    borderBottomWidth: 0.5,
    borderColor: '#CFCFCF',
    height: '60rem',
  },
  textPlace: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.medium,
    marginBottom: '3rem',
  },
});
