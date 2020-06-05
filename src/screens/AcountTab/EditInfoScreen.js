import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import TitleBarCustom from '../../components/TitleBarCustom';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import {BASE_URL} from '../../services/URL';
import ImagePicker from 'react-native-image-picker';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class EditInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.data.user_info || null,
      name: this.props.user.data.user_info.display_name || null,
      phone: this.props.user.data.user_info.phone || null,
      avatar: this.props.user.data.user_info.avatar
        ? `${BASE_URL + '/' + this.props.user.data.user_info.avatar}`
        : null,
      error: '',
      isLoading: false,
      isSuccess: false,
      avatarFile: null,
      isFail: false,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (
          payload.action.type === 'Navigation/NAVIGATE' ||
          payload.action.type === 'Navigation/BACK'
        ) {
          this.setState({
            user: this.props.user.data.user_info || null,
            name: this.props.user.data.user_info.display_name || null,
            phone: this.props.user.data.user_info.phone || null,
            avatar: this.props.user.data.user_info.avatar
              ? `${BASE_URL + '/' + this.props.user.data.user_info.avatar}`
              : null,
            error: '',
            isLoading: false,
            isSuccess: false,
            avatarFile: null,
            isFail: false,
          });
        }
      },
    );
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  ChangeAvatar = () => {
    const options = {
      title: 'Select Avatar',
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (response.uri) {
          this.setState({
            avatar: response.uri,
            avatarFile: response,
          });
        }
      }
    });
  };
  SaveChange = async () => {
    this.setState({isLoading: true});
    const {name, phone, avatarFile} = this.state;
    var bodyFormData = new FormData();
    bodyFormData.append('displayName', name);
    bodyFormData.append('phone', phone);
    if (avatarFile !== null) {
      bodyFormData.append('avatar', {
        uri: avatarFile.uri,
        type: avatarFile.type,
        name: avatarFile.fileName,
      });
    }
    await this.props.update_info(bodyFormData);
    if (!this.props.user.status) {
      this.setState({isLoading: false, isSuccess: true});
      setTimeout(() => {
        this.setState({isSuccess: false});
        this.props.navigation.navigate('InfoUser');
      }, 1000);
    } else {
      this.setState({isLoading: false, isFail: true});
      setTimeout(() => {
        this.setState({isFail: false});
      }, 1000);
    }
  };

  render() {
    const {name, phone, avatar} = this.state;
    return (
      <KeyboardAwareScrollView
        // enableOnAndroid={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.container}>
          <Dialog visible={this.state.isLoading}>
            <DialogContent>
              <View style={styles.loadingDialog}>
                <ActivityIndicator
                  size={EStyleSheet.value('40rem')}
                  color="#34D374"
                />
                <Text
                  style={{
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    marginLeft: EStyleSheet.value('10rem'),
                  }}>
                  Đang cập nhật
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <Dialog visible={this.state.isSuccess}>
            <DialogContent>
              <View style={styles.loadingDialog}>
                <Image
                  style={{
                    width: EStyleSheet.value('20rem'),
                    height: EStyleSheet.value('20rem'),
                  }}
                  resizeMode="contain"
                  source={constants.Images.IC_SUCCESS}
                />
                <Text
                  style={{
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    marginLeft: EStyleSheet.value('10rem'),
                  }}>
                  Cập nhật thành công
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <Dialog visible={this.state.isFail}>
            <DialogContent>
              <View style={styles.loadingDialog}>
                <Image
                  style={{
                    width: EStyleSheet.value('20rem'),
                    height: EStyleSheet.value('20rem'),
                  }}
                  resizeMode="contain"
                  source={constants.Images.IC_FAIL}
                />
                <Text
                  style={{
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    marginLeft: EStyleSheet.value('5rem'),
                  }}>
                  Có lỗi xảy ra
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <View style={styles.backgroundHeader}>
            <ImageBackground
              source={require('../../assets/images/vinhhalong.jpeg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}>
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
            <TouchableOpacity
              onPress={() => this.ChangeAvatar()}
              style={{marginTop: EStyleSheet.value('15rem')}}>
              <Text style={styles.textTitle}>Đổi ảnh đại diện</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lastInfoGroup}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tên</Text>
              <TextInput
                style={name === '' ? styles.placeHolder : styles.textInput}
                value={name}
                onSubmitEditing={() => this.ref_phone.focus()}
                placeholder="Nhấn để nhập"
                onChangeText={text => this.setState({name: text})}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                style={phone === '' ? styles.placeHolder : styles.textInput}
                value={phone}
                keyboardType="number-pad"
                ref={ref => (this.ref_phone = ref)}
                onSubmitEditing={() => this.SaveChange()}
                placeholder="Nhấn để nhập"
                onChangeText={text => this.setState({phone: text})}
              />
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => this.SaveChange()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('18rem'),
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
            <Image
              style={styles.avatar}
              source={
                avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
              }
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = ({user}) => {
  return {
    user: user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    update_info: parrams => dispatch(actions.update_info(parrams)),
    reset: () => dispatch(actions.reset()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditInfoScreen);
const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    width: '90%',
    height: '50rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: constants.FontSizes.regular,
    fontFamily: constants.Fonts.light,
    color: '#1161D8',
  },
  subText: {
    fontSize: constants.FontSizes.tabTitle,
    fontFamily: constants.Fonts.light,
    color: '#797979',
  },
  lastInfoGroup: {
    backgroundColor: 'white',
    height: '450rem',
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
    fontFamily: constants.Fonts.light,
    color: '#8E8E8E',
  },
  placeHolder: {borderBottomWidth: 0.5, borderColor: '#797979'},
  textInput: {
    borderBottomWidth: 0.5,
    paddingHorizontal: '5rem',
    borderColor: '#797979',
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.medium,
  },
  loadingDialog: {
    paddingTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: EStyleSheet.value('80rem'),
    width: EStyleSheet.value('200rem'),
  },
});
