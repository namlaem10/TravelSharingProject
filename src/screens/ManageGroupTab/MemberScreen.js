import React, {Component} from 'react';
import {View, Text, Platform, StatusBar, Image, ScrollView} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import HeaderBar from '../../components/HeaderBar';
import {BASE_URL} from '../../services/URL';
import {TouchableOpacity} from 'react-native-gesture-handler';
var data = [
  {
    _id: 'USER01',
    email: 'test@gmail.com',
    display_name: 'Nam Ngu',
    phone: '0123546789',
    avatar: 'uploads/fd72eff14fe22bc10f1b35e59f82f6f3.png',
  },
  {
    _id: 'USER02',
    email: 'test2@gmail.com',
    display_name: 'Manager 2',
    phone: '0912313333',
    avatar: null,
  },
  {
    _id: 'USER03',
    email: 'test3@gmail.com',
    display_name: 'Manager 3',
    phone: '0911111111',
    avatar: null,
  },
  {
    _id: 'USER04',
    email: 'test@gmail.com',
    display_name: 'Nam Ngu',
    phone: '0123546789',
    avatar: 'uploads/fd72eff14fe22bc10f1b35e59f82f6f3.png',
  },
  {
    _id: 'USER05',
    email: 'test2@gmail.com',
    display_name: 'Manager 2',
    phone: '0912313333',
    avatar: null,
  },
  {
    _id: 'USER06',
    email: 'test3@gmail.com',
    display_name: 'Manager 3',
    phone: '0911111111',
    avatar: null,
  },
];

export default class MemberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Danh sách thành viên',
    };
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressItem(item) {
    console.log(item);
  }
  _renderItems(array) {
    let render = [];
    array.map(item => {
      let avatar = item.avatar;
      if (avatar !== null) {
        avatar = BASE_URL + '/' + avatar;
      }
      let renderItem = (
        <TouchableOpacity
          style={styles.memberItem}
          onPress={() => this.onPressItem(item)}>
          <Image
            source={
              avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
            }
            style={{
              width: EStyleSheet.value('84rem'),
              height: EStyleSheet.value('84rem'),
              borderRadius: EStyleSheet.value('42rem'),
            }}
          />
          <Text>{item.display_name}</Text>
        </TouchableOpacity>
      );
      render.push(renderItem);
    });
    return render;
  }
  render() {
    const {title} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <HeaderBar title={title} onPressBack={this.onPressBack} />
          </View>
        </View>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.memberGroup}>{this._renderItems(data)}</View>
        </ScrollView>
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
  memberGroup: {
    flexDirection: 'row',
    paddingHorizontal: '8rem',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  memberItem: {
    height: '121rem',
    width: '85rem',
    marginHorizontal: '5rem',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '15rem',
  },
});
