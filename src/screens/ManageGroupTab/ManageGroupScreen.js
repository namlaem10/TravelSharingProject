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
import TeamItem from './TeamItem';

//fake data:
const Data = [
  {
    id: 'Group1',
    teamName: 'Ngu si nhóm',
    place: 'Tp. Hồ Chí Minh - Đà Lạt',
    leader: 'Nam ngu si',
    memberQuantity: 4,
  },
  {
    id: 'Group7',
    teamName: 'Ngu si nhóm',
    place: 'Tp. Hồ Chí Minh - Đà Lạt',
    leader: 'Nam ngu si',
    memberQuantity: 4,
  },
  {
    id: 'Group2',
    teamName: 'Ngu si nhóm',
    place: 'Tp. Hồ Chí Minh - Đà Lạt',
    leader: 'Nam ngu si',
    memberQuantity: 4,
  },
  {
    id: 'Group3',
    teamName: 'Ngu si nhóm',
    place: 'Tp. Hồ Chí Minh - Đà Lạt',
    leader: 'Nam ngu si',
    memberQuantity: 4,
  },
  {
    id: 'Group4',
    teamName: 'Ngu si nhóm',
    place: 'Tp. Hồ Chí Minh - Đà Lạt',
    leader: 'Nam ngu si',
    memberQuantity: 4,
  },
  {
    id: 'Group5',
    teamName: 'Ngu si nhóm',
    place: 'Tp. Hồ Chí Minh - Đà Lạt',
    leader: 'Nam ngu si',
    memberQuantity: 4,
  },
  {
    id: 'Group6',
    teamName: 'Ngu si nhóm',
    place: 'Tp. Hồ Chí Minh - Đà Lạt',
    leader: 'Nam ngu si',
    memberQuantity: 4,
  },
];
export default class ManageGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Quản lý nhóm du lịch',
      searchText: '',
      isDarg: false,
    };
  }
  onSearchChangeText = text => {
    this.setState({
      searchText: text,
    });
  };
  onPressItem = id => {
    console.log(id);
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
        <View styles={styles.content}>
          <Text style={styles.text}>Danh sách nhóm của bạn</Text>
          <FlatList
            contentContainerStyle={{
              paddingBottom: EStyleSheet.value('100rem'),
              paddingHorizontal: EStyleSheet.value('20rem'),
            }}
            data={Data}
            renderItem={({item}) => (
              <TeamItem data={item} onPress={this.onPressItem} />
            )}
            keyExtractor={item => item.id}
            onScrollEndDrag={() => this._handleEndDrag()}
            onScrollBeginDrag={() => this._handleStartDrag()}
          />
        </View>
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
  },
  text: {
    marginLeft: '20rem',
    marginTop: '10rem',
    fontFamily: constants.Fonts.regular,
    fontSize: constants.FontSizes.title,
    letterSpacing: '1.5rem',
  },
  content: {},
  addButton: {
    width: '70rem',
    height: '70rem',
    position: 'absolute',
    right: '10rem',
    bottom: '0rem',
  },
});
