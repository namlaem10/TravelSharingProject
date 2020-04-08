import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import TitleBarCustom from '../../components/TitleBarCustom';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import {BASE_URL} from '../../services/URL';
class EditInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      avatar: '',
    };
  }
  UNSAFE_componentWillMount = () => {
    const user = this.props.user.data;
    const avatar = BASE_URL + '/' + user.avatar;
    this.setState({
      name: user.displayName,
      phone: user.phone,
      avatar: avatar,
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
  ChangeAvatar = () => {
    console.log('change avatar');
  };
  SaveChange = () => {
    console.log('change info');
  };
  render() {
    const {name, phone, avatar} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.backgroundHeader}>
          <ImageBackground
            source={require('../../assets/images/vinhhalong.jpeg')}
            style={{width: '100%', height: '100%'}}>
            <TitleBarCustom onPress={this.onPressBack} />
          </ImageBackground>
        </View>
        <View
          style={{
            paddingTop: EStyleSheet.value('40rem'),
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity onPress={() => this.ChangeAvatar()}>
            <Text style={styles.textTitle}>Đổi ảnh đại diện</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lastInfoGroup}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên</Text>
            <TextInput
              style={name === '' ? styles.placeHolder : styles.textInput}
              value={name}
              placeholder="Nhấn để nhập"
              onChangeText={text => this.setState({name: text})}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={phone === '' ? styles.placeHolder : styles.textInput}
              value={phone}
              placeholder="Nhấn để nhập"
              onChangeText={text => this.setState({phone: text})}
            />
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.SaveChange()}>
            <Text
              style={{
                fontSize: EStyleSheet.value('13rem'),
                fontFamily: constants.Fonts.medium,
                color: 'white',
              }}>
              Lưu thay đổi
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            left: '39%',
            top: EStyleSheet.value('150rem'),
          }}>
          <Image style={styles.avatar} source={{uri: avatar}} />
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({user}) => {
  return {
    user: user,
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     login: parrams => dispatch(actions.login(parrams)),
//     reset: () => dispatch(actions.reset()),
//   };
// };
// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps)(EditInfoScreen);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  backgroundHeader: {
    height: '195rem',
  },
  avatar: {
    width: '85rem',
    height: '85rem',
    borderRadius: '42.5rem',
    borderColor: 'white',
    borderWidth: '1rem',
  },
  editButton: {
    marginTop: '20rem',
    width: '100%',
    height: '30rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
    color: '#1161D8',
  },
  subText: {
    fontSize: constants.FontSizes.tabTitle,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  lastInfoGroup: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: '20rem',
    alignItems: 'center',
    paddingHorizontal: '13rem',
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.regular,
  },
  placeHolder: {borderBottomWidth: 1, borderColor: 'black'},
  textInput: {
    borderBottomWidth: 1,
    borderColor: 'black',
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.medium,
  },
});
