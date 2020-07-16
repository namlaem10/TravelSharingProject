/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Platform,
  StatusBar,
  Image,
  ActivityIndicator,
  BackHandler,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat, Send} from 'react-native-gifted-chat';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import HeaderBar from '../../components/HeaderBar';
import database from '../../utils/fireBaseConfig';

class ChattingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      groupData: null,
      user: null,
      title: 'Trò chuyện nhóm',
      isLoading: true,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'willFocus',
      async payload => {
        if (payload.action.type === 'Navigation/NAVIGATE') {
          const groupData = this.props.navigation.getParam('data');
          const GroupRef = database.ref('groupChats/' + groupData._id);
          const snapshot = await GroupRef.once('value');
          let array = snapshot.val();
          let messages = [];
          if (array === null) {
            GroupRef.set({
              messages: [],
            });
          } else {
            Object.keys(array.chats).forEach((key, index) => {
              messages.push(array.chats[key]);
            });
          }
          this.setState({
            messages: messages,
            user: this.props.user.data.user_info,
            groupData,
            isLoading: false,
          });
        }
      },
    );
  }
  UNSAFE_componentWillMount = async () => {
    const groupData = this.props.navigation.getParam('data');
    const GroupRef = database.ref('groupChats/' + groupData._id);
    const snapshot = await GroupRef.once('value');
    let array = snapshot.val();
    let messages = [];
    if (array === null) {
      GroupRef.set({
        messages: [],
      });
    } else {
      Object.keys(array.chats).forEach((key, index) => {
        messages.push(array.chats[key]);
      });
    }
    this.setState({
      messages: messages,
      user: this.props.user.data.user_info,
      groupData,
      isLoading: false,
    });
  };
  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.onPressBack();
      return true;
    });
    const groupData = this.props.navigation.getParam('data');
    const GroupRef = database.ref('groupChats/' + groupData._id);
    GroupRef.on('child_changed', snapshot => {
      let array = snapshot.val();
      let newArray = [];
      Object.keys(array).forEach((key, index) => {
        newArray.push(array[key]);
      });
      this.setState({
        messages: newArray,
      });
    });
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            marginBottom: 5,
            marginRight: 10,
            alignSelf: 'center',
          }}>
          <Image
            style={{
              width: EStyleSheet.value('30rem'),
              height: EStyleSheet.value('30rem'),
            }}
            source={constants.Images.IC_SEND}
          />
        </View>
      </Send>
    );
  }
  onPressBack = () => {
    const location = this.props.navigation.getParam('location', '');
    if (location !== '') {
      let data = this.props.navigation.getParam('data');
      let currentDate = new Date();
      let startDate = new Date(data.start_day);
      let isWillGo = false;
      if (startDate < currentDate) {
        isWillGo = true;
      }
      this.props.navigation.navigate(location, {
        data: this.props.navigation.getParam('data'),
        isGone: this.props.navigation.getParam('isGone'),
        isShare: this.props.navigation.getParam('isShare'),
        isLeader: this.props.navigation.getParam('isLeader'),
        title: this.props.navigation.getParam('title'),
        isWillGo: isWillGo,
      });
    } else {
      this.props.navigation.goBack();
    }
  };
  onSend(messages = []) {
    const groupId = this.state.groupData._id;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    messages[0].createdAt = Date.now();
    database.ref('groupChats/' + groupId + '/chats').push(...messages);
  }
  render() {
    const {messages, title, user, isLoading} = this.state;
    let mess = messages.reverse();
    return (
      <View style={styles.container}>
        <HeaderBar title={title} onPressBack={this.onPressBack} />
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <ActivityIndicator
              size={EStyleSheet.value('60rem')}
              color="#34D374"
            />
            <Text>Đang tải nội dung trò chuyện...</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <GiftedChat
              messages={mess}
              onSend={message => this.onSend(message)}
              user={{
                _id: user._id,
                display_name: user.display_name,
                avatar:
                  user !== null ? user.avatar : constants.Images.IC_AVATAR1,
              }}
              isTyping={true}
              keyboardShouldPersistTaps={'never'}
              renderAvatarOnTop={true}
              placeholder={'Nhấp để trò chuyện'}
              renderSend={this.renderSend}
              isKeyboardInternallyHandled={false}
              multiline={false}
              scrollToBottom={true}
              bottomOffset={26}
            />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = ({user}) => {
  return {
    user: user,
  };
};
export default connect(mapStateToProps)(ChattingScreen);
const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flexGrow: 1,
    padding: '13rem',
    // backgroundColor: 'red',
  },
});
