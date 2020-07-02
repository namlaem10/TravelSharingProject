import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
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
      phone: '',
      display_name: '',
      placeholderEmail: 'Email',
      placeholderPassword: 'Mật khẩu',
      placeholderConfirm: 'Nhập lại mật khẩu',
      placeholderPhone: 'Nhập số điện thoại',
      placeholderDisplayName: 'Nhập tên hiển thị',
      showPassword: false,
      showConfirm: false,
      error: '',
      isLoading: false,
      isSuccess: false,
      isFail: false,
    };
  }

  onPressSignUp = async () => {
    let email = this.state.email;
    let password = this.state.password;
    let confirmPass = this.state.confirm;
    let phone = this.state.phone;
    let display_name = this.state.display_name;
    let checkEmptyEmail = validateEmpty(email);
    let checkEmptyPass = validateEmpty(password);
    let checkEmptyPhone = validateEmpty(phone);
    let checkEmptyDisplayName = validateEmpty(display_name);
    if (
      !checkEmptyEmail ||
      !checkEmptyPass ||
      !checkEmptyPhone ||
      !checkEmptyDisplayName
    ) {
      this.setState({
        error: 'Cần điền đầy đủ thông tin',
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
        params.append('display_name', display_name);
        params.append('phone', phone);
        await this.props.sign_up(params);
        if (this.props.user.status) {
          this.setState({
            error: this.props.user.data.message,
            isLoading: false,
            isFail: true,
          });
          setTimeout(() => {
            this.setState({isFail: false});
          }, 1000);
        } else {
          this.setState({isLoading: false, isSuccess: true});
          setTimeout(() => {
            this.setState({isSuccess: false});
            this.props.navigation.navigate('SignIn');
          }, 1000);
        }
      }
    }
  };

  render() {
    const {
      email,
      password,
      confirm,
      phone,
      display_name,
      placeholderEmail,
      placeholderPassword,
      placeholderConfirm,
      placeholderPhone,
      placeholderDisplayName,
      showPassword,
      showConfirm,
      error,
    } = this.state;
    return (
      <KeyboardAwareScrollView
        // enableOnAndroid={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.backgroundColor,
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
                    fontFamily: Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    marginLeft: EStyleSheet.value('10rem'),
                  }}>
                  Đang xử lý...
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
                  source={Images.IC_SUCCESS}
                />
                <Text
                  style={{
                    fontFamily: Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    marginLeft: EStyleSheet.value('10rem'),
                  }}>
                  Đăng kí thành công
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
                  source={Images.IC_FAIL}
                />
                <Text
                  style={{
                    fontFamily: Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    marginLeft: EStyleSheet.value('10rem'),
                  }}>
                  Đã có lỗi xảy ra
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
                onSubmitEditing={() => this.displayNameRef.focus()}
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
              {placeholderDisplayName === '' && (
                <Text style={[styles.textEmail, {color: Colors.primary}]}>
                  Tên hiển thị
                </Text>
              )}
              <TextInput
                placeholder={placeholderDisplayName}
                selectionColor={Colors.primary}
                onChangeText={text => this.setState({display_name: text})}
                autoCapitalize="none"
                ref={ref => (this.displayNameRef = ref)}
                placeholderTextColor={Colors.deactive}
                onSubmitEditing={() => this.phoneRef.focus()}
                blurOnSubmit={false}
                value={display_name}
                style={styles.textEmail}
                onFocus={() => this.setState({placeholderDisplayName: ''})}
                onEndEditing={() =>
                  email === ''
                    ? this.setState({
                        placeholderDisplayName: 'Tên hiển thị',
                      })
                    : null
                }
              />
              <TouchableOpacity
                style={styles.buttonClear}
                onPress={() => this.setState({display_name: ''})}>
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
              {placeholderPhone === '' && (
                <Text style={[styles.textPassword, {color: Colors.primary}]}>
                  Số điện thoại
                </Text>
              )}
              <TextInput
                placeholder={placeholderPhone}
                selectionColor={Colors.primary}
                onChangeText={text => this.setState({phone: text})}
                autoCapitalize="none"
                keyboardType="number-pad"
                placeholderTextColor={Colors.deactive}
                ref={ref => (this.phoneRef = ref)}
                value={phone}
                onSubmitEditing={() => this.passRef.focus()}
                style={styles.textPassword}
                onFocus={() => this.setState({placeholderPhone: ''})}
                onEndEditing={() =>
                  phone === ''
                    ? this.setState({placeholderPhone: 'Số điện thoại'})
                    : null
                }
              />
              <TouchableOpacity
                style={styles.buttonClear}
                onPress={() => this.setState({phone: ''})}>
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
            <View
              style={[
                styles.viewInput,
                {marginBottom: EStyleSheet.value('10rem')},
              ]}>
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
                onSubmitEditing={() => (
                  Keyboard.dismiss(), this.onPressSignUp()
                )}
                style={styles.textPassword}
                onFocus={() => this.setState({placeholderConfirm: ''})}
                onEndEditing={() =>
                  confirm === ''
                    ? this.setState({
                        placeholderConfirm: 'Nhập lại mật khẩu',
                      })
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
            <TouchableOpacity
              onPress={() => (Keyboard.dismiss(), this.onPressSignUp())}>
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
    height: '200rem',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '200rem',
    height: '200rem',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '35rem',
  },
  viewInput: {
    height: '60rem',
    width: '315rem',
    borderBottomWidth: 0.5,
    borderColor: Colors.primary,
  },
  ErrorInput: {
    width: '285rem',
    position: 'absolute',
    left: '32rem',
    bottom: '-40rem',
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
    flex: 1,
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
    fontSize: FontSizes.regular,
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
    paddingTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: EStyleSheet.value('80rem'),
    width: EStyleSheet.value('200rem'),
  },
});
