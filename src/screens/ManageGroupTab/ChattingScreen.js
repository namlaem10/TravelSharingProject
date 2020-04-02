import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {GiftedChat, Send} from 'react-native-gifted-chat';

import * as constants from '../../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import HeaderBar from '../../components/HeaderBar';
//fakedata
let fakemessdata = [
  {
    _id: 1,
    text: 'Chào Anh!',
    createdAt: new Date(),
    user: {
      _id: 'user2',
      name: 'Hoàn',
      avatar: constants.Images.IC_AVATAR3,
    },
  },
  {
    _id: 2,
    text: 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE',
    createdAt: new Date(),
    user: {
      _id: 'user2',
      name: 'Hoàn',
      avatar: constants.Images.IC_AVATAR3,
    },
  },
  {
    _id: 3,
    text: 'Cút',
    createdAt: new Date(),
    user: {
      _id: 'user1',
      name: 'Nam ngu',
      avatar: constants.Images.IC_AVATAR1,
    },
  },
];

export default class ChattingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      title: 'Trò chuyện nhóm',
    };
  }
  UNSAFE_componentWillMount = () => {
    this.setState({
      messages: fakemessdata,
    });
  };
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
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    const {messages, title} = this.state;
    return (
      <View style={styles.container}>
        <HeaderBar title={title} />
        <View style={styles.content}>
          <GiftedChat
            messages={messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 'user1',
            }}
            isTyping={true}
            keyboardShouldPersistTaps={'never'}
            renderAvatarOnTop={true}
            placeholder={'Nhấp để trò chuyện'}
            renderSend={this.renderSend}
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
});
