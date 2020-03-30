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
import {actions, types} from '../../redux/reducers/managerGroupMemberReducer';

import SearchBar from '../../components/SearchBar';

//fake data
let dataUser = [
  {
    id: 'user1',
    name: 'Hoàn 1',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user2',
    name: 'Hoàn 2',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user3',
    name: 'Hoàn 3',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user4',
    name: 'Hoàn 4',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user5',
    name: 'Hoàn 5',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user6',
    name: 'Hoàn 6',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user7',
    name: 'Hoàn 7',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user8',
    name: 'Hoàn 8',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user9',
    name: 'Hoàn 9',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
  {
    id: 'user10',
    name: 'Hoàn 10',
    avatar: constants.Images.IC_AVATAR1,
    email: 'email@gmail.com',
  },
];
class AddMemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Chọn thành viên',
      searchText: '',
      idUserPick: [],
    };
  }
  UNSAFE_componentWillMount = () => {
    this.setState({idUserPick: this.props.memsId.data});
  };
  onSearchChangeText = text => {
    this.setState({searchText: text});
  };
  onPressBack = () => {
    if (this.props.location) {
      this.props.navigation.navigate(this.props.location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressDone = () => {
    this.props.update_mem(this.state.idUserPick);
    if (this.props.location) {
      this.props.navigation.navigate(this.props.location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onSelectItem = item => {
    let array = this.state.idUserPick;
    array.push(item.id);
    this.setState({
      idUserPick: array,
    });
  };
  onUnselectItem = item => {
    let array = this.state.idUserPick;
    console.log('array', array);
    let index = array.indexOf(item.id);
    array.splice(index, 1);
    this.setState({
      idUserPick: array,
    });
  };
  _renderItem = item => {
    let array = this.state.idUserPick;
    let found = array.find(e => e === item.id);
    let isSelect = found === undefined ? false : true;
    return (
      <View style={styles.flatListItem}>
        <Image
          source={item.avatar}
          style={{
            width: EStyleSheet.value('54rem'),
            height: EStyleSheet.value('54rem'),
          }}
        />
        <View style={styles.infoCol}>
          <Text style={styles.textName}>{item.name}</Text>
          <Text style={styles.textemail}>{item.email}</Text>
        </View>
        {isSelect ? (
          <TouchableOpacity
            style={styles.selectedButton}
            onPress={() => this.onUnselectItem(item)}>
            <Text style={{color: 'white'}}>Bỏ chọn</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => this.onSelectItem(item)}>
            <Text style={{color: 'white'}}>chọn</Text>
          </TouchableOpacity>
        )}
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
            isBack={true}
            onPressBack={this.onPressBack}
            placeHolder={'Tìm thành viên'}
          />
        </View>
        <View style={styles.content}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{...styles.textName}}>Danh sách bạn bè</Text>
            <TouchableOpacity onPress={() => this.onPressDone()}>
              <Text style={{color: '#1161D8'}}>HOÀN TẤT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.flatList}>
            <FlatList
              contentContainerStyle={{
                paddingBottom: EStyleSheet.value('40rem'),
                flex: 0,
              }}
              data={dataUser}
              renderItem={({item}) => this._renderItem(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({membersId}) => {
  return {
    memsId: membersId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    update_mem: parrams => dispatch(actions.update_mem(parrams)),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(AddMemberScreen);

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
  textName: {
    letterSpacing: '1rem',
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.regular,
  },
  textemail: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  flatList: {marginTop: '10rem'},
  flatListItem: {
    flexDirection: 'row',
    marginVertical: '15rem',
  },
  infoCol: {justifyContent: 'space-around', paddingLeft: '10rem'},
  selectButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65rem',
    height: '25rem',
    backgroundColor: '#76B5FF',
    borderRadius: '17rem',
    top: '15rem',
    right: '0rem',
  },
  selectedButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '65rem',
    height: '25rem',
    backgroundColor: '#34D374',
    borderRadius: '17rem',
    top: '15rem',
    right: '0rem',
  },
});
