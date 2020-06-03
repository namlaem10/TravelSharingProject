import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';

import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
import {BASE_URL} from '../services/URL';
import Comment from './Comment';
import moment from 'moment';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: false,
      height: 0,
      messageText: '',
    };
  }
  //tạo rating hình ngôi sao theo điểm (point/5)
  createStars = () => {
    const {dataRating} = this.props;
    let count = dataRating.rating;
    let leftstar = 5 - count;
    let starts = [];
    for (let i = 1; i <= count; i++) {
      starts.push(
        <Image
          key={i}
          source={constants.Images.IC_GOLD_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
            resizeMode: 'contain',
          }}
        />,
      );
    }
    for (let i = 1; i <= leftstar; i++) {
      starts.push(
        <Image
          key={`${i}+10`}
          source={constants.Images.IC_NORMAL_STAR}
          style={{
            width: EStyleSheet.value('16rem'),
            height: EStyleSheet.value('16rem'),
            resizeMode: 'contain',
          }}
        />,
      );
    }
    return starts;
  };
  onPressSend = () => {
    const {onPressSendComment} = this.props;
    const {messageText} = this.state;
    if (messageText.replace(/ /g, '+') !== '') {
      this.setState({comment: false, height: 0, messageText: ''});
      onPressSendComment(messageText);
    } else {
      this.setState({comment: false, height: 0, messageText: ''});
    }
  };
  RenderComment = () => {
    const {dataComment} = this.props;
    return <Comment data={dataComment} />;
  };
  render() {
    const {data, dataComment, dataRating, onPressRating} = this.props;
    const {comment, messageText} = this.state;
    const User = data.create_by;
    let avatar = null;
    if (User) {
      avatar = BASE_URL + '/' + User.avatar;
    }
    return (
      <View style={styles.content}>
        <View style={styles.headerInfo}>
          <View style={styles.headerCol1}>
            <Image
              source={
                User.avatar !== null
                  ? {uri: avatar}
                  : constants.Images.IC_AVATAR3
              }
              style={{
                width: EStyleSheet.value('40rem'),
                height: EStyleSheet.value('40rem'),
                borderRadius: EStyleSheet.value('20rem'),
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginLeft: EStyleSheet.value('10rem'),
              }}>
              <Text
                style={{
                  fontSize: EStyleSheet.value('14rem'),
                  fontFamily: constants.Fonts.medium,
                }}>
                {User.display_name}
              </Text>
              <Text
                style={{
                  fontSize: EStyleSheet.value('14rem'),
                  fontFamily: constants.Fonts.light,
                }}>
                {data.departure.destination_name}&nbsp;-&nbsp;
                {data.destination.destination_name}
              </Text>
            </View>
          </View>
          <View style={styles.headerCol2}>
            <Text
              style={{
                fontFamily: constants.Fonts.light,
                fontSize: EStyleSheet.value('14rem'),
                color: '#8E8E8E',
              }}>
              {moment(data.end_day).format('DD/MM/YYYY')}
            </Text>
            <View style={{flexDirection: 'row'}}>{this.createStars()}</View>
          </View>
        </View>
        <View style={styles.contentInfo}>
          <Text
            style={{
              fontFamily: constants.Fonts.medium,
              fontSize: EStyleSheet.value('15rem'),
            }}>
            {data.title}
          </Text>
          <Text
            style={{
              fontFamily: constants.Fonts.medium,
              fontSize: EStyleSheet.value('13rem'),
              color: '#41A96B',
            }}>
            #{data.schedule.destination}
          </Text>
          <Text
            style={{
              fontFamily: constants.Fonts.light,
              fontSize: EStyleSheet.value('14rem'),
            }}>
            {data.description}
          </Text>
        </View>
        <View style={styles.commentGroup}>
          <View style={styles.likeAndCommentSmallIcon}>
            <View style={styles.icItem}>
              <Image
                resizeMode="contain"
                source={constants.Images.IC_GOLD_STAR}
                style={styles.smallIcon}
              />
              <Text>{dataRating.rating_count}</Text>
            </View>
            <View style={styles.icItem}>
              <Image
                resizeMode="contain"
                source={constants.Images.IC_COMMENT}
                style={styles.smallIcon}
              />
              <Text>{dataComment.length}</Text>
            </View>
          </View>
          <View style={styles.likeAndCommentBigIcon}>
            <TouchableOpacity
              style={styles.icItem}
              onPress={() => onPressRating(true)}>
              <Image
                resizeMode="contain"
                source={constants.Images.IC_GOLD_STAR}
                style={styles.bigIcon}
              />
              <Text>Đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icItem}
              onPress={() => this.setState({comment: true})}>
              <Image
                resizeMode="contain"
                source={constants.Images.IC_COMMENT}
                style={styles.bigIcon}
              />
              <Text>Bình luận</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.comment}>{this.RenderComment()}</View>
          {comment && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <View style={styles.viewInputPost}>
                <TextInput
                  multiline={true}
                  ref={ref => {
                    this.textInput = ref;
                  }}
                  autoFocus={true}
                  returnKeyType="default"
                  placeholder="Nhập bình luận của bạn ..."
                  value={messageText}
                  onChangeText={editedText =>
                    this.setState({messageText: editedText})
                  }
                  onContentSizeChange={event =>
                    this.setState({
                      height: event.nativeEvent.contentSize.height,
                    })
                  }
                  style={[
                    styles.textInputStyle,
                    {
                      height: Math.min(
                        EStyleSheet.value('120rem'),
                        Math.max(EStyleSheet.value('45rem'), this.state.height),
                      ),
                    },
                  ]}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonSend}
                onPress={() => this.onPressSend()}>
                <Image
                  source={constants.Images.IC_SEND}
                  resizeMode="contain"
                  style={styles.iconSend}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1.3,
    marginHorizontal: '13rem',
    marginBottom: '12rem',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCol1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerCol2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  contentInfo: {
    marginTop: '10rem',
  },
  commentGroup: {
    // backgroundColor: 'red',
  },
  likeAndCommentSmallIcon: {
    marginTop: '6rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: '0.5rem',
    borderBottomColor: '#CFCFCF',
  },
  smallIcon: {
    width: '18rem',
    height: '18rem',
    marginRight: '8rem',
  },
  likeAndCommentBigIcon: {
    marginTop: '8rem',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: '0.5rem',
    borderBottomColor: '#CFCFCF',
  },
  bigIcon: {
    width: '24rem',
    height: '24rem',
    marginRight: '10rem',
    resizeMode: 'contain',
  },
  icItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8rem',
  },
  comment: {
    flexDirection: 'column',
  },
  textInputStyle: {
    paddingHorizontal: '10rem',
    fontSize: '14rem',
    color: '#979797',
    // height: "160rem",
    fontFamily: constants.Fonts.light,
  },
  viewInputPost: {
    width: '280rem',
    borderWidth: 0.5,
    borderColor: '#979797',
    borderRadius: 10,
    // paddingBottom: "5rem",
    marginTop: '7rem',
  },
  buttonSend: {
    width: '50rem',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSend: {
    width: '50rem',
    height: '50rem',
  },
});
