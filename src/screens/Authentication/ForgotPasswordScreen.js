import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import {validateEmail, validateEmpty} from '../../utils/Validate';
import {Images, FontSizes, Fonts, Colors, WIDTH} from '../../utils/Constants';
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import {actions, types} from '../../redux/reducers/UserReducer';
import * as constants from '../../utils/Constants';

EStyleSheet.build({$rem: WIDTH / 380});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      placeholderEmail: 'Nhập địa chỉ Email',
      error: '',
      isLoadingVisible: false,
      isCompletedVisible: false,
      message: '',
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.user.type === types.FORGOT_PASSWORD ||
      nextProps.user.type === types.FORGOT_PASSWORD_FAIL
    ) {
      if (nextProps.user.status) {
        this.setState({isLoadingVisible: false, error: 'Email không tồn tại'});
      } else {
        this.setState({
          isLoadingVisible: false,
          isCompletedVisible: true,
        });
      }
    }
  }
  onPressCompletedDialog = () => {
    this.setState({
      isCompletedVisible: false,
    });
    this.props.navigation.navigate('SignIn');
  };
  onPressSignIn = () => {
    let email = this.state.email;
    let checkEmptyEmail = validateEmpty(email);
    if (!checkEmptyEmail) {
      this.setState({error: 'Email không được bỏ trống!'});
    } else {
      if (!validateEmail(email)) {
        this.setState({error: 'Email không hợp lệ'});
      } else {
        this.setState({
          isLoadingVisible: true,
        });
      }
      this.props.forgot_password(email);
    }
  };

  render() {
    const {email, placeholderEmail, error} = this.state;
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
          <Dialog visible={this.state.isLoadingVisible}>
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
                  Vui lòng chờ...
                </Text>
              </View>
            </DialogContent>
          </Dialog>
          <Dialog
            visible={this.state.isCompletedVisible}
            footer={
              <DialogFooter
                style={{
                  height: EStyleSheet.value('50rem'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <DialogButton
                  textStyle={{
                    fontFamily: constants.Fonts.medium,
                    fontSize: EStyleSheet.value('16rem'),
                  }}
                  text="Đăng nhập"
                  onPress={() => this.onPressCompletedDialog()}
                />
              </DialogFooter>
            }>
            <DialogContent>
              <View style={[styles.loadingDialog, {flexDirection: 'column'}]}>
                <Image
                  source={constants.Images.IC_EMAIL}
                  resizeMode="contain"
                  style={{
                    width: EStyleSheet.value('40rem'),
                    height: EStyleSheet.value('30rem'),
                  }}
                />
                <Text
                  style={{
                    fontFamily: constants.Fonts.light,
                    fontSize: EStyleSheet.value('15rem'),
                    marginTop: EStyleSheet.value('10rem'),
                    textAlign: 'center',
                  }}>
                  {'Mật khẩu mới \nđã gửi đến email của bạn'}
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
                selectionColor="white"
                onChangeText={text => this.setState({email: text})}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor={Colors.deactive}
                blurOnSubmit={false}
                onSubmitEditing={() => (
                  Keyboard.dismiss(), this.onPressSignIn()
                )}
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
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={() => (Keyboard.dismiss(), this.onPressSignIn())}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={Colors.gradient.background}
                style={styles.buttonSignIn}>
                <Text style={styles.textSignIn}>Tiếp tục</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={styles.textForgotPass}>Đăng nhập</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: EStyleSheet.value('10rem'),
              }}>
              <Text style={styles.textSignUp}>Chưa có tài khoản?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text
                  style={[styles.textSignUp, {color: Colors.gradient.blue[7]}]}>
                  Đăng kí ngay
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
    forgot_password: email => dispatch(actions.forgot_password(email)),
  };
};
// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
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
    paddingTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: EStyleSheet.value('80rem'),
    width: EStyleSheet.value('200rem'),
  },
});
