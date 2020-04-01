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
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'absolute',
              flexDirection: 'row',
              left: EStyleSheet.value('15rem'),
            }}>
            <TouchableOpacity onPress={this.onPressBack}>
              <Image
                style={{
                  width: EStyleSheet.value('25rem'),
                  height: EStyleSheet.value('25rem'),
                }}
                source={constants.Images.IC_ARROW_BACK_GREEN}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text
              style={{
                fontSize: EStyleSheet.value('20rem'),
                fontFamily: constants.Fonts.regular,
                letterSpacing: 2,
              }}>
              Trò chuyện nhóm
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <GiftedChat
            messages={this.state.messages}
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
  header: {
    width: '100%',
    height: '60rem',
    borderBottomWidth: 0.3,
    borderBottomColor: '#CDCDCD',
    paddingHorizontal: '13rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   footer: {
  //     backgroundColor: 'white',
  //     width: '100%',
  //     height: '55rem',
  //     position: 'absolute',
  //     top: '575rem',
  //     borderColor: 'transparent', // Required to show shadows on Android for some reason !?!?
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 0,
  //     },
  //     shadowOpacity: 0.3,
  //     shadowRadius: '5rem',

  //     elevation: '15rem',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  content: {
    flex: 1,
  },
});
