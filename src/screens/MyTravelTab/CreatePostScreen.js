import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import HeaderBar from '../../components/HeaderBar';
import {BASE_URL} from '../../services/URL';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/detailLichTrinhReducer.js';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class CreatePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Tạo bài viết',
      textInput: '',
      textTitle: '',
      backgroundFile: null,
      backgroundUri: null,
      placeholder:
        'Chia sẻ cảm nghĩ, kinh nghiệm của bạn về chuyến đi với mọi người...',
      idHanhTrinh: null,
      loadingVisible: false,
      loadingCompleted: false,
      message: '',
      user: this.props.user.data || null,
    };
  }
  UNSAFE_componentWillMount() {
    const background = this.props.navigation.getParam('background', null);
    let backgroundUri = null;
    if (background !== null) {
      backgroundUri = BASE_URL + '/' + background;
    }
    const idHanhTrinh = this.props.navigation.getParam('idHanhTrinh');
    this.setState({
      backgroundUri: backgroundUri,
      idHanhTrinh,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.detailLichTrinh.type === types.CREATE_POST ||
      nextProps.detailLichTrinh.type === types.CREATE_POST_FAIL
    ) {
      if (nextProps.detailLichTrinh.type === types.CREATE_POST) {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Đã tạo xong! đang chuyển màn hình',
        });
        setTimeout(() => {
          this.setState({
            loadingCompleted: false,
          });
          this.props.navigation.navigate('TripDetail', {
            data: nextProps.detailLichTrinh.data[0],
            isGone: true,
            isShare: true,
          });
        }, 1500);
      } else {
        this.setState({
          loadingVisible: false,
          loadingCompleted: true,
          message: 'Lỗi tạo hành trình!',
        });
      }
    }
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      this.props.navigation.navigate(location);
    } else {
      this.props.navigation.goBack();
    }
  };
  onPressConfirm = async () => {
    const {textTitle, textInput, backgroundFile, idHanhTrinh} = this.state;
    if (textTitle === '') {
      Alert.alert(
        'Lưu ý',
        'Xin lỗi bạn :(. Tiêu đề không được để trống',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else if (textInput === '') {
      Alert.alert(
        'Lưu ý',
        'Xin lỗi bạn :(. nội dung bài viết không được để trống',
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      await this.props.create_post(
        idHanhTrinh,
        textTitle,
        textInput,
        backgroundFile,
      );
    }
  };
  ChangeBackground = () => {
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
            backgroundUri: response.uri,
            backgroundFile: response,
          });
        }
      }
    });
  };
  render() {
    const {
      title,
      textInput,
      placeholder,
      textTitle,
      backgroundUri,
      user,
    } = this.state;
    let avatar = null;
    if (user.user_info.avatar !== null) {
      avatar = BASE_URL + '/' + user.user_info.avatar;
    }
    return (
      <DismissKeyboard>
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
          <Dialog visible={this.state.loadingCompleted}>
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
                  {this.state.message}
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <HeaderBar title={title} onPressBack={this.onPressBack} />
          <View style={styles.userInfo}>
            <Image
              source={
                avatar !== null ? {uri: avatar} : constants.Images.IC_AVATAR1
              }
              style={{
                width: EStyleSheet.value('40rem'),
                height: EStyleSheet.value('40rem'),
                borderRadius: EStyleSheet.value('20rem'),
              }}
            />
            <Text
              style={{
                ...styles.titleText,
                marginLeft: EStyleSheet.value('10rem'),
              }}>
              {user.user_info.display_name}
            </Text>
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textTitle}
              placeholder={'Nhập tiêu đề'}
              value={textTitle}
              onChangeText={text => this.setState({textTitle: text})}
            />
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder={placeholder}
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              value={textInput}
              onChangeText={text => this.setState({textInput: text})}
            />
          </View>
          <View style={styles.uploadPictureGroup}>
            <Text style={styles.titleText}>Chọn ảnh bìa cho bài viết</Text>
            {backgroundUri !== null ? (
              <TouchableOpacity
                style={styles.imageArena}
                onPress={() => this.ChangeBackground()}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{uri: backgroundUri}}
                />
                <View style={styles.changeBackgroundText}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: constants.Fonts.regular,
                      fontSize: EStyleSheet.value('15rem'),
                    }}>
                    Nhấp để đổi ảnh
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.imageArena}
                onPress={() => this.ChangeBackground()}>
                <Image
                  style={{
                    width: EStyleSheet.value('120rem'),
                    height: EStyleSheet.value('120rem'),
                  }}
                  source={constants.Images.IC_ADD}
                />
                <Text>Bấm để thêm ảnh</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => this.onPressConfirm()}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('15rem'),
                  fontFamily: constants.Fonts.medium,
                  color: 'white',
                }}>
                Chia sẻ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}
const mapStateToProps = ({detailLichTrinh, user}) => {
  return {
    detailLichTrinh: detailLichTrinh,
    user: user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    create_post: (idHanhTrinh, title, description, backgroundFile) =>
      dispatch(
        actions.create_post(idHanhTrinh, title, description, backgroundFile),
      ),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePostScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  textAreaContainer: {
    paddingHorizontal: '13rem',
  },
  textArea: {
    height: '160rem',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    color: 'black',
    fontSize: constants.FontSizes.regular,
  },
  textTitle: {
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40rem',
    color: 'black',
    fontSize: constants.FontSizes.title,
    fontFamily: constants.Fonts.bold,
  },
  userInfo: {
    flexDirection: 'row',
    marginTop: '5rem',
    justifyContent: 'flex-start',
    paddingHorizontal: '13rem',
  },
  uploadPictureGroup: {
    flexDirection: 'column',
    paddingHorizontal: '13rem',
  },
  titleText: {
    fontFamily: constants.Fonts.medium,
    fontSize: EStyleSheet.value('15rem'),
    marginTop: EStyleSheet.value('5rem'),
  },
  imageArena: {
    marginTop: '5rem',
    height: '200rem',
    borderWidth: 1,
    borderColor: '#41A96B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: '300rem',
    height: '35rem',
    backgroundColor: '#34D374',
    borderRadius: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40rem',
    marginTop: '25rem',
  },
  changeBackgroundText: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '7rem',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '120rem',
    height: '30rem',
    bottom: '5rem',
    right: '5rem',
  },
});
