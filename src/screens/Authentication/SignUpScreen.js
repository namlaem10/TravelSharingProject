import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import {
  validateEmail,
  validateEmpty,
  validateReTypePassword,
  validatePassword,
} from '../../utils/Validate';

import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Constants';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
EStyleSheet.build({$rem: WIDTH / 380});

class SignUpScreen extends Component {
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
      error: '',
      isLoading: false,
      isSuccess: false,
    };
  }

  onPressSignUp = async () => {
    let email = this.state.email;
    let password = this.state.password;
    let confirmPass = this.state.confirm;
    let checkEmptyEmail = validateEmpty(email);
    let checkEmptyPass = validateEmpty(password);
    if (!checkEmptyEmail || !checkEmptyPass) {
      this.setState({
        error: 'Tài khoản hoặc mật khẩu không được bỏ trống!',
      });
    } else {
      if (!validateEmail(email)) {
        this.setState({error: 'Email không hợp lệ'});
      } else if (!validatePassword(password)) {
        this.setState({error: 'Mật khẩu phải từ 6 ký tự'});
      } else if (!validateReTypePassword(password, confirmPass)) {
        this.setState({error: 'Nhập lại mật khẩu không khớp'});
      } else {
        this.setState({error: '', isLoading: true});
        let params = new URLSearchParams();
        params.append('email', email);
        params.append('password', password);
        params.append('displayName', 'Test Name');
        await this.props.sign_up(params);
        if (this.props.user.status) {
          this.setState({
            error: this.props.user.data.message,
            isLoading: false,
          });
        } else {
          this.setState({isLoading: false, isSuccess: true});
          setTimeout(() => {
            this.setState({isSuccess: false});
            this.props.navigation.navigate('SignIn');
          }, 2000);
        }
      }
    }
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
      error,
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
          <Dialog visible={this.state.isLoading}>
            <DialogContent>
              <View style={styles.loadingDialog}>
                <ActivityIndicator
                  size={EStyleSheet.value('60rem')}
                  color="#34D374"
                />
                <Text
                  style={{
                    fontFamily: Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    letterSpacing: 1,
                    marginLeft: EStyleSheet.value('5rem'),
                  }}>
                  Đang xử lý...
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <Dialog visible={this.state.isSuccess}>
            <DialogContent>
              <View style={styles.loadingDialog}>
                <Text
                  style={{
                    fontFamily: Fonts.light,
                    fontSize: EStyleSheet.value('18rem'),
                    letterSpacing: 1,
                    marginLeft: EStyleSheet.value('5rem'),
                    color: '#34D374',
                    textAlignVertical: 'center',
                  }}>
                  Đăng ký thành công!
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.light,
                    fontSize: EStyleSheet.value('18rem'),
                    letterSpacing: 1,
                    marginLeft: EStyleSheet.value('5rem'),
                    color: 'black',
                    textAlignVertical: 'center',
                  }}>
                  Đang chuyển về trang đăng nhập...
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <View style={styles.viewLogo}>
            <Image
              source={Images.IC_LOGO}
              resizeMode="contain"
              style={styles.image}
            />
            {error === '' ? null : (
              <View
                style={[
                  styles.ErrorInput,
                  {marginBottom: EStyleSheet.value('10rem')},
                ]}>
                <Text style={[styles.textEmail, {color: 'red'}]}>{error}</Text>
              </View>
            )}
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
const mapStateToProps = ({user}) => {
  return {
    user: user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sign_up: parrams => dispatch(actions.sign_up(parrams)),
    reset: () => dispatch(actions.reset()),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreen);
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
  ErrorInput: {
    width: '285rem',
    position: 'absolute',
    left: '32rem',
    bottom: '-20rem',
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
  loadingDialog: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: EStyleSheet.value('95rem'),
    width: EStyleSheet.value('250rem'),
    backgroundColor: 'white',
  },
});
