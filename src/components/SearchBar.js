import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});
// truyền props bắt buộc phải có : onChangeText,value,title,onPressBack
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClickSearch: false,
    };
  }
  onPressSearchIcon = () => {
    this.setState({
      isClickSearch: true,
    });
  };
  onEndEditing = () => {
    if (this.props.value === '') {
      this.setState({
        isClickSearch: false,
      });
    }
  };
  renderIcon = () => {
    if (this.props.isBack) {
      return (
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'absolute',
            flexDirection: 'row',
            left: EStyleSheet.value('10rem'),
          }}>
          <View style={{}}>
            <TouchableOpacity onPress={this.props.onPressBack}>
              <Image
                style={{
                  width: EStyleSheet.value('25rem'),
                  height: EStyleSheet.value('20rem'),
                  resizeMode: 'contain',
                }}
                source={constants.Images.IC_ARROW_BACK_GREEN}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: EStyleSheet.value('5rem')}}>
            <TouchableOpacity>
              <Image
                style={{
                  width: EStyleSheet.value('30rem'),
                  height: EStyleSheet.value('30rem'),
                  resizeMode: 'contain',
                }}
                source={constants.Images.IC_SEARCH}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'absolute',
          flexDirection: 'row',
          left: 0,
        }}>
        <TouchableOpacity>
          <Image
            style={{
              width: EStyleSheet.value('30rem'),
              height: EStyleSheet.value('30rem'),
              resizeMode: 'contain',
            }}
            source={constants.Images.IC_SEARCH}
          />
        </TouchableOpacity>
      </View>
    );
  };
  renderBackButton2 = () => {
    if (this.props.isBack) {
      return (
        <View style={styles.iconBack}>
          <TouchableOpacity onPress={this.props.onPressBack}>
            <Image
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('20rem'),
                resizeMode: 'contain',
              }}
              source={constants.Images.IC_ARROW_BACK_GREEN}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  render() {
    const {value, onChangeText, title, placeHolder} = this.props;
    const {isClickSearch} = this.state;
    return isClickSearch ? (
      <View style={styles.container1}>
        {this.renderIcon()}
        <View style={styles.inputText}>
          <TextInput
            placeholder={
              placeHolder ? placeHolder : 'Nhập địa điểm bạn tìm kiếm'
            }
            style={[
              styles.searchBar,
              this.props.isBack
                ? {marginLeft: EStyleSheet.value('80rem')}
                : null,
            ]}
            onChangeText={text => onChangeText(text)}
            value={value}
            autoFocus={true}
            clearButtonMode={'while-editing'}
            onEndEditing={this.onEndEditing}
          />
        </View>
      </View>
    ) : (
      <View style={styles.container2}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: EStyleSheet.value('22rem'),
              fontFamily: constants.Fonts.regular,
            }}>
            {title}
          </Text>
        </View>
        {this.renderBackButton2()}
        <View style={styles.iconSearch2}>
          <TouchableOpacity onPress={this.onPressSearchIcon}>
            <Image
              style={{
                width: EStyleSheet.value('30rem'),
                height: EStyleSheet.value('30rem'),
              }}
              source={require('../assets/images/ic-search.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container1: {
    width: '100%',
    height: '45rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container2: {
    width: '100%',
    height: '45rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '300rem',
  },
  searchBar: {
    width: '280rem',
    height: '45rem',
    fontSize: '16rem',
    fontFamily: constants.Fonts.light,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconSearch2: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconBack: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: '10rem',
  },
});
