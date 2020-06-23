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
  RefreshControl,
  ScrollView,
  Alert,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import * as constants from '../../utils/Constants';
import NewsFeedItem from './SharingTapComponents/NewsFeedItem';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/allLichTrinhReducer';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {TextInput} from 'react-native-gesture-handler';

EStyleSheet.build({$rem: constants.WIDTH / 380});
class NewsFeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isLoading: true,
      message: '',
      data: null,
      dataBackup: null,
      dataHot: null,
      isRefreshing: false,
      showRating: false,
      reportId: null,
      reportContent: '',
      showReportResult: false,
      reportMessage: '',
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (
          payload.action.type === 'Navigation/NAVIGATE' ||
          payload.action.type === 'Navigation/BACK'
        ) {
          this.setState({searchText: '', isLoading: true});
          await this.props.get_all();
        }
      },
    );
  }
  UNSAFE_componentWillMount = async () => {
    await this.props.get_all();
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.allLichTrinh.type === types.GET_ALL ||
      nextProps.allLichTrinh.type === types.GET_ALL_FAIL
    ) {
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
          data: allLichTrinh.data.all,
          dataBackup: allLichTrinh.data.all,
          dataHot: allLichTrinh.data.hot,
        });
      }
    } else if (
      nextProps.allLichTrinh.type === types.REPORT_TRAVEL ||
      nextProps.allLichTrinh.type === types.REPORT_TRAVEL_FAIL
    ) {
      if (nextProps.allLichTrinh.type === types.REPORT_TRAVEL) {
        setTimeout(() => {
          this.setState({reportMessage: 'Báo cáo thành công'});
        }, 1000);
        setTimeout(() => {
          this.setState({
            showReportResult: false,
            reportMessage: '',
            reportId: null,
            reportContent: '',
          });
        }, 2200);
      } else {
        setTimeout(() => {
          this.setState({reportMessage: 'Có lỗi! xin thử lại'});
        }, 1000);
        setTimeout(() => {
          this.setState({
            showReportResult: false,
            reportMessage: '',
            reportId: null,
            reportContent: '',
          });
        }, 2200);
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
  onPressReportItem = id => {
    this.setState({showRating: true, reportId: id});
  };
  onSendReport = () => {
    const {reportId, reportContent} = this.state;
    this.props.report(reportId, reportContent);
    this.setState({showRating: false, showReportResult: true});
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
      let sText = element.destination.destination_name;
      searchData = sText.toLowerCase().match(searchText);
      return searchData;
    });
    if (data.length > 1) {
      data.sort(function(a, b) {
        return b.schedule.copy_list.length - a.schedule.copy_list.length;
      });
    }
    this.setState({
      data: data,
    });
  };
  onRefresh = async () => {
    this.setState({isRefreshing: true, searchText: ''});
    await this.props.get_all();
    this.setState({isRefreshing: false});
  };
  renderHeader = () => {
    const {dataHot, searchText} = this.state;
    let array = [];
    dataHot.map(item => {
      let endDate = new Date(item.end_day);
      let startDate = new Date(item.start_day);
      let number_of_days = new Date(endDate - startDate).getDate();
      array.push(
        <TouchableOpacity
          key={item._id}
          style={styles.headerItem}
          onPress={() => {
            this.onPressItem(item);
          }}>
          <Image
            source={{uri: item.background}}
            style={{
              height: EStyleSheet.value('100rem'),
              width: EStyleSheet.value('100%'),
              borderRadius: EStyleSheet.value('10rem'),
            }}
          />
          <Text
            style={{
              fontFamily: constants.Fonts.medium,
              marginTop: EStyleSheet.value('3rem'),
            }}>
            {item.departure.destination_name} -{' '}
            {item.destination.destination_name}
          </Text>
          <Text
            style={{
              fontFamily: constants.Fonts.light,
              fontSize: EStyleSheet.value('13rem'),
            }}>
            Lượt tham khảo:&nbsp; {item.schedule.copy_list.length}
          </Text>
          <View style={styles.dayMarker}>
            <Text style={{color: 'white'}}>{number_of_days} ngày</Text>
          </View>
        </TouchableOpacity>,
      );
    });
    return searchText === '' ? (
      <View style={styles.hotView}>
        <Text style={styles.headerTitle}>Hành trình đang HOT</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.hotScroll}>{array}</View>
        </ScrollView>
        <Text
          style={{
            ...styles.headerTitle,
            paddingTop: EStyleSheet.value('5rem'),
          }}>
          Bài viết mới
        </Text>
      </View>
    ) : (
      <View style={styles.hotViewBlank}>
        <Text
          style={{
            ...styles.headerTitle,
            paddingTop: EStyleSheet.value('5rem'),
          }}>
          Tìm kiếm cho "{searchText}"
        </Text>
      </View>
    );
  };
  render() {
    const {
      searchText,
      isLoading,
      message,
      data,
      showRating,
      reportContent,
      showReportResult,
      reportMessage,
    } = this.state;
    return (
      <View style={styles.container}>
        <Dialog visible={showRating}>
          <DialogContent>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: EStyleSheet.value('25rem'),
              }}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('18rem'),
                  fontFamily: constants.Fonts.medium,
                }}>
                Báo cáo bài viết này
              </Text>
            </View>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder={'nội dung báo cáo'}
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                value={reportContent}
                maxLength={1000}
                onChangeText={text => this.setState({reportContent: text})}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: EStyleSheet.value('120rem'),
                  height: EStyleSheet.value('40rem'),
                  backgroundColor: 'red',
                  borderRadius: EStyleSheet.value('10rem'),
                  marginTop: EStyleSheet.value('5rem'),
                  marginRight: EStyleSheet.value('10rem'),
                }}
                onPress={() => this.onSendReport()}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: EStyleSheet.value('16rem'),
                    fontFamily: constants.Fonts.regular,
                  }}>
                  Gửi báo cáo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: EStyleSheet.value('120rem'),
                  height: EStyleSheet.value('40rem'),
                  backgroundColor: constants.Colors.deactive,
                  borderRadius: EStyleSheet.value('10rem'),
                  marginTop: EStyleSheet.value('5rem'),
                }}
                onPress={() =>
                  this.setState({showRating: false, reportId: null})
                }>
                <Text
                  style={{
                    color: 'white',
                    fontSize: EStyleSheet.value('16rem'),
                    fontFamily: constants.Fonts.regular,
                  }}>
                  Hủy
                </Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        </Dialog>
        <Dialog visible={showReportResult}>
          <DialogContent>
            <View
              style={{
                width: EStyleSheet.value('250rem'),
                height: EStyleSheet.value('80rem'),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: EStyleSheet.value('25rem'),
              }}>
              {reportMessage !== '' ? (
                <Text
                  style={{
                    fontSize: EStyleSheet.value('18rem'),
                    fontFamily: constants.Fonts.regular,
                  }}>
                  {reportMessage}
                </Text>
              ) : (
                <ActivityIndicator
                  size={EStyleSheet.value('60rem')}
                  color="#34D374"
                />
              )}
            </View>
          </DialogContent>
        </Dialog>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <SearchBar
              onChangeText={this.setSearchText}
              value={searchText}
              placeHolder={'Nhập địa điểm bạn tìm kiếm'}
              title={'Khám phá'}
              data={data}
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
              ListHeaderComponent={this.renderHeader}
              renderItem={({item}) =>
                item.isShare ? (
                  <NewsFeedItem
                    data={item}
                    key={item._id}
                    onPressItem={this.onPressItem}
                    onPressReportItem={this.onPressReportItem}
                  />
                ) : null
              }
              keyExtractor={item => item._id}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
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
    report: (reportId, reportContent) =>
      dispatch(actions.report(reportId, reportContent)),
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
  hotView: {
    flexDirection: 'column',
    height: '220rem',
    paddingLeft: '15rem',
    paddingRight: '5rem',
    width: constants.WIDTH,
  },
  hotViewBlank: {
    flexDirection: 'column',
    paddingLeft: '15rem',
    paddingRight: '5rem',
    width: constants.WIDTH,
  },
  headerItem: {
    height: '150rem',
    width: '180rem',
    marginRight: '15rem',
  },
  hotScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: constants.Fonts.medium,
    fontSize: constants.FontSizes.header,
  },
  dayMarker: {
    position: 'absolute',
    top: EStyleSheet.value('10rem'),
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: EStyleSheet.value('60rem'),
    height: EStyleSheet.value('25rem'),
    borderTopLeftRadius: EStyleSheet.value('12.5rem'),
    borderBottomLeftRadius: EStyleSheet.value('12.5rem'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    height: '130rem',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    color: 'black',
    fontSize: constants.FontSizes.regular,
    borderWidth: 0.3,
    borderRadius: '10rem',
    paddingHorizontal: '15rem',
    marginVertical: '10rem',
  },
});
