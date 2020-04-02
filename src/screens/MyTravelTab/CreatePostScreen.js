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
} from 'react-native';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});

import HeaderBar from '../../components/HeaderBar';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class CreatePostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Tạo bài viết',
      textInput: '',
      placeholder:
        'Chia sẻ cảm nghĩ, kinh nghiệm của bạn về chuyến đi với mọi người...',
    };
  }
  onPressBack = () => {
    if (this.props.location) {
      this.props.navigation.navigate(this.props.location);
    } else {
      this.props.navigation.goBack();
    }
  };
  render() {
    const {title, textInput, placeholder} = this.state;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <HeaderBar title={title} onPressBack={this.onPressBack} />
          <View style={styles.userInfo}>
            <Image
              source={constants.Images.IC_AVATAR3}
              style={{
                width: EStyleSheet.value('40rem'),
                height: EStyleSheet.value('40rem'),
              }}
            />
            <Text
              style={{
                ...styles.titleText,
                marginLeft: EStyleSheet.value('10rem'),
              }}>
              Hoàn
            </Text>
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
            <TouchableOpacity style={styles.imageArena}>
              <Image
                style={{
                  width: EStyleSheet.value('120rem'),
                  height: EStyleSheet.value('120rem'),
                }}
                source={constants.Images.IC_ADD}
              />
              <Text>Bấm để thêm ảnh</Text>
            </TouchableOpacity>
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

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  textAreaContainer: {
    paddingHorizontal: '13rem',
    padding: 5,
  },
  textArea: {
    height: '180rem',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlignVertical: 'top',
    color: 'black',
    fontSize: constants.FontSizes.regular,
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
});
