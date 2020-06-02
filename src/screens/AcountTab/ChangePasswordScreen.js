import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as constants from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {
  validatePassword,
  validateEmpty,
  validateReTypePassword,
} from '../../utils/Validate';
import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Constants';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import HeaderBar from '../../components/HeaderBar';

EStyleSheet.build({$rem: WIDTH / 380});
// let token = null;
class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: '',
      placeholderPassword: 'Nhập mật khẩu cũ',
      placeholderNewPassword: 'Nhập mật khẩu mới',
      placeholderConfirm: 'Nhập lại mật khẩu',
      show: false,
      show2: false,
      show3: false,
      error: '',
      isLoading: false,
      isCompleted: false,
      title: 'Đổi mật khẩu',
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.type === types.CHANGE_PASSWORD ||
      nextProps.user.type === types.CHANGE_PASSWORD_FAIL
    ) {
      if (nextProps.user.type === types.CHANGE_PASSWORD) {
        this.setState({isLoading: false, isCompleted: true});
      } else {
        this.setState({isLoading: false, error: nextProps.user.message});
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
  onpressChangePass = () => {
    const {password, newPassword, confirmPassword} = this.state;
    let checkEmptyOldPass = validateEmpty(password);
    let checkEmptyNewPass = validateEmpty(newPassword);
    if (!checkEmptyOldPass || !checkEmptyNewPass) {
      if (!checkEmptyOldPass) {
        this.setState({
          error: 'Mật khẩu cũ không được để trống',
        });
      } else {
        this.setState({
          error: 'Mật khẩu mới không được để trống',
        });
      }
    } else {
      if (!validatePassword(password)) {
        this.setState({error: 'Mật khẩu phải từ 6 ký tự'});
      } else if (!validateReTypePassword(newPassword, confirmPassword)) {
        this.setState({error: 'Nhập lại mật khẩu không khớp'});
      } else {
        this.setState({isLoading: true});
        this.props.change_password(password, newPassword);
      }
    }
  };
  onPressCompletedDialog = () => {
    this.setState({isCompleted: false});
    this.props.navigation.goBack();
  };
  render() {
    const {
      password,
      newPassword,
      confirmPassword,
      placeholderConfirm,
      placeholderPassword,
      placeholderNewPassword,
      show,
      show2,
      show3,
      error,
      title,
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
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    letterSpacing: 1,
                    marginLeft: EStyleSheet.value('5rem'),
                  }}>
                  Đang đổi mật khẩu
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <Dialog
            visible={this.state.isCompleted}
            footer={
              <DialogFooter>
                <DialogButton
                  text="Trở về"
                  onPress={() => this.onPressCompletedDialog()}
                />
              </DialogFooter>
            }>
            <DialogContent>
              <View style={styles.loadingDialog}>
                <Image
                  source={constants.Images.IC_PASSWORD_ACTIVE}
                  style={{
                    width: EStyleSheet.value('60rem'),
                    height: EStyleSheet.value('60rem'),
                  }}
                />
                <Text
                  style={{
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    letterSpacing: 1,
                    marginLeft: EStyleSheet.value('5rem'),
                    textAlign: 'center',
                  }}>
                  Đã đổi mật khẩu
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <View style={styles.header}>
            <View style={styles.title}>
              <HeaderBar title={title} onPressBack={this.onPressBack} />
            </View>
          </View>
          {error === '' ? null : (
            <View
              style={[
                styles.ErrorInput,
                {marginBottom: EStyleSheet.value('10rem')},
              ]}>
              <Text style={[styles.textEmail, {color: 'red'}]}>{error}</Text>
            </View>
          )}
          <View style={styles.viewTextInput}>
            <View style={styles.viewInput}>
              {placeholderPassword === '' && (
                <Text style={[styles.textPassword, {color: Colors.primary}]}>
                  Mật khẩu cũ
                </Text>
              )}
              <TextInput
                placeholder={placeholderPassword}
                selectionColor="white"
                onChangeText={text => this.setState({password: text})}
                autoCapitalize="none"
                secureTextEntry={show ? false : true}
                placeholderTextColor={Colors.deactive}
                ref={ref => (this.passRef = ref)}
                value={password}
                style={styles.textPassword}
                onFocus={() => this.setState({placeholderPassword: ''})}
                onEndEditing={() =>
                  password === ''
                    ? this.setState({
                        placeholderPassword: 'Nhập mật khẩu cũ',
                      })
                    : null
                }
              />
              <TouchableOpacity
                onPress={() => this.setState({show: !show})}
                style={styles.buttonClear}>
                <Image
                  source={
                    show ? Images.IC_SHOW_PASSWORD : Images.IC_HIDE_PASSWORD
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
              {placeholderNewPassword === '' && (
                <Text style={[styles.textPassword, {color: Colors.primary}]}>
                  Mật khẩu mới
                </Text>
              )}
              <TextInput
                placeholder={placeholderNewPassword}
                selectionColor="white"
                onChangeText={text => this.setState({newPassword: text})}
                autoCapitalize="none"
                secureTextEntry={show2 ? false : true}
                placeholderTextColor={Colors.deactive}
                ref={ref => (this.passRef = ref)}
                value={newPassword}
                style={styles.textPassword}
                onFocus={() => this.setState({placeholderNewPassword: ''})}
                onEndEditing={() =>
                  password === ''
                    ? this.setState({
                        placeholderNewPassword: 'Nhập mật khẩu mới',
                      })
                    : null
                }
              />
              <TouchableOpacity
                onPress={() => this.setState({show2: !show2})}
                style={styles.buttonClear}>
                <Image
                  source={
                    show2 ? Images.IC_SHOW_PASSWORD : Images.IC_HIDE_PASSWORD
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
                selectionColor="white"
                onChangeText={text => this.setState({confirmPassword: text})}
                autoCapitalize="none"
                secureTextEntry={show2 ? false : true}
                placeholderTextColor={Colors.deactive}
                ref={ref => (this.passRef = ref)}
                value={confirmPassword}
                style={styles.textPassword}
                onFocus={() => this.setState({placeholderConfirm: ''})}
                onEndEditing={() =>
                  confirmPassword === ''
                    ? this.setState({
                        placeholderConfirm: 'Nhập lại mật khẩu',
                      })
                    : null
                }
              />
              <TouchableOpacity
                onPress={() => this.setState({show3: !show3})}
                style={styles.buttonClear}>
                <Image
                  source={
                    show3 ? Images.IC_SHOW_PASSWORD : Images.IC_HIDE_PASSWORD
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
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity onPress={() => this.onpressChangePass()}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={Colors.gradient.background}
              style={styles.buttonSignIn}>
              <Text style={styles.textSignIn}>Đổi mật khẩu</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    change_password: (password, newPassword) =>
      dispatch(actions.change_password(password, newPassword)),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);
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
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '5rem',
    marginTop: '50rem',
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
    top: '100rem',
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
    flexDirection: 'row',
    height: EStyleSheet.value('95rem'),
    width: EStyleSheet.value('250rem'),
    backgroundColor: 'white',
  },
});
