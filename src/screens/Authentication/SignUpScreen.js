import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Contants';

EStyleSheet.build({$rem: WIDTH / 380});

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      placeholderEmail: 'Email',
      placeholderPassword: 'Mật khẩu',
      placeholderConfirm: 'Nhập lại mật khẩu',
      showPassword: false,
      showConfirm: false,
    };
  }

  onPressSignUp = () => {
    this.props.navigation.navigate('SignIn');
  };

  render() {
    const {
      email,
      password,
      confirm,
      placeholderEmail,
      placeholderPassword,
      placeholderConfirm,
      showPassword,
      showConfirm,
    } = this.state;
    return (
      <KeyboardAwareScrollView
        // enableOnAndroid={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.backgroundColor,
        }}>
        <View style={styles.container}>
          <View style={styles.viewLogo}>
            <Image
              source={Images.IC_LOGO}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.viewTextInput}>
            <View
              style={[
                styles.viewInput,
                {marginBottom: EStyleSheet.value('10rem')},
              ]}>
              {placeholderEmail === '' && (
                <Text style={[styles.textEmail, {color: Colors.primary}]}>
                  Email
                </Text>
              )}
              <TextInput
                placeholder={placeholderEmail}
                selectionColor={Colors.primary}
                onChangeText={text => this.setState({email: text})}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={Colors.deactive}
                onSubmitEditing={() => this.passRef.focus()}
                blurOnSubmit={false}
                value={email}
                style={styles.textEmail}
                onFocus={() => this.setState({placeholderEmail: ''})}
                onEndEditing={() =>
                  email === ''
                    ? this.setState({placeholderEmail: 'Email'})
                    : null
                }
              />
              <TouchableOpacity
                style={styles.buttonClear}
                onPress={() => this.setState({email: ''})}>
                <Image
                  source={Images.IC_CLEAR}
                  resizeMode="contain"
                  style={{
                    width: EStyleSheet.value('18rem'),
                    height: EStyleSheet.value('18rem'),
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.viewInput,
                {marginBottom: EStyleSheet.value('10rem')},
              ]}>
              {placeholderPassword === '' && (
                <Text style={[styles.textPassword, {color: Colors.primary}]}>
                  Mật khẩu
                </Text>
              )}
              <TextInput
                placeholder={placeholderPassword}
                selectionColor={Colors.primary}
                onChangeText={text => this.setState({password: text})}
                autoCapitalize="none"
                secureTextEntry={showPassword ? false : true}
                placeholderTextColor={Colors.deactive}
                ref={ref => (this.passRef = ref)}
                value={password}
                onSubmitEditing={() => this.confirmRef.focus()}
                style={styles.textPassword}
                onFocus={() => this.setState({placeholderPassword: ''})}
                onEndEditing={() =>
                  password === ''
                    ? this.setState({placeholderPassword: 'Mật khẩu'})
                    : null
                }
              />
              <TouchableOpacity
                onPress={() => this.setState({showPassword: !showPassword})}
                style={styles.buttonClear}>
                <Image
                  source={
                    showPassword
                      ? Images.IC_SHOW_PASSWORD
                      : Images.IC_HIDE_PASSWORD
                  }
                  resizeMode="contain"
                  style={{
                    width: EStyleSheet.value('16rem'),
                    height: EStyleSheet.value('16rem'),
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.viewInput}>
              {placeholderConfirm === '' && (
                <Text style={[styles.textPassword, {color: Colors.primary}]}>
                  Nhập lại mật khẩu
                </Text>
              )}
              <TextInput
                placeholder={placeholderConfirm}
                selectionColor={Colors.primary}
                onChangeText={text => this.setState({confirm: text})}
                autoCapitalize="none"
                secureTextEntry={showConfirm ? false : true}
                placeholderTextColor={Colors.deactive}
                ref={ref => (this.confirmRef = ref)}
                value={confirm}
                onSubmitEditing={() => this.onPressSignUp()}
                style={styles.textPassword}
                onFocus={() => this.setState({placeholderConfirm: ''})}
                onEndEditing={() =>
                  confirm === ''
                    ? this.setState({placeholderConfirm: 'Mật khẩu'})
                    : null
                }
              />
              <TouchableOpacity
                onPress={() => this.setState({showConfirm: !showConfirm})}
                style={styles.buttonClear}>
                <Image
                  source={
                    showConfirm
                      ? Images.IC_SHOW_PASSWORD
                      : Images.IC_HIDE_PASSWORD
                  }
                  resizeMode="contain"
                  style={{
                    width: EStyleSheet.value('16rem'),
                    height: EStyleSheet.value('16rem'),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity onPress={this.onPressSignUp}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={Colors.gradient.background}
                style={styles.buttonSignIn}>
                <Text style={styles.textSignIn}>Đăng kí</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: EStyleSheet.value('10rem'),
              }}>
              <Text style={styles.textSignUp}>Đã có tài khoản?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text
                  style={[styles.textSignUp, {color: Colors.gradient.blue[7]}]}>
                  Đăng nhập ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewLogo: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image: {
    width: '130rem',
    height: '130rem',
    backgroundColor: 'transparent',
  },
  buttonClear: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '30rem',
    height: '30rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTextInput: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '5rem',
  },
  viewInput: {
    width: '315rem',
    borderBottomWidth: 0.5,
    borderColor: Colors.primary,
  },
  textEmail: {
    color: Colors.deactive,
    fontSize: FontSizes.smalltext,
    paddingBottom: 3,
    width: '285rem',
    paddingLeft: 0,
    fontFamily: Fonts.light,
  },
  textPassword: {
    color: Colors.deactive,
    fontSize: FontSizes.smalltext,
    paddingBottom: 3,
    width: '285rem',
    paddingLeft: 0,
    fontFamily: Fonts.light,
  },
  viewButton: {
    flex: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonSignIn: {
    width: '315rem',
    height: '40rem',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '15rem',
    borderRadius: 10,
  },
  textSignIn: {
    color: Colors.white,
    fontSize: FontSizes.title,
    fontFamily: Fonts.medium,
  },
  textForgotPass: {
    fontSize: FontSizes.smalltext,
    color: Colors.gradient.blue[7],
    fontFamily: Fonts.light,
  },
  textSignUp: {
    fontSize: FontSizes.smalltext,
    color: Colors.deactive,
    fontFamily: Fonts.light,
    marginRight: 5,
  },
});
