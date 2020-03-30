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
                  height: EStyleSheet.value('25rem'),
                }}
                source={constants.Images.IC_ARROW_BACK_GREEN}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: EStyleSheet.value('5rem')}}>
            <TouchableOpacity>
              <Image
                style={{
                  width: EStyleSheet.value('35rem'),
                  height: EStyleSheet.value('35rem'),
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
          left: EStyleSheet.value('10rem'),
        }}>
        <TouchableOpacity>
          <Image
            style={{
              width: EStyleSheet.value('35rem'),
              height: EStyleSheet.value('35rem'),
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
                height: EStyleSheet.value('25rem'),
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
            placeholder={placeHolder ? placeHolder : 'Nhập để tìm kiếm'}
            style={styles.searchBar}
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
              fontSize: EStyleSheet.value('20rem'),
              fontFamily: constants.Fonts.regular,
              letterSpacing: 2,
            }}>
            {title}
          </Text>
        </View>
        {this.renderBackButton2()}
        <View style={styles.iconSearch2}>
          <TouchableOpacity onPress={this.onPressSearchIcon}>
            <Image
              style={{
                width: EStyleSheet.value('35rem'),
                height: EStyleSheet.value('35rem'),
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
    borderRadius: '10rem',
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
    marginLeft: '15rem',
  },
  searchBar: {
    width: '230rem',
    height: '45rem',
    fontSize: '16rem',
    fontFamily: constants.Fonts.light,
    letterSpacing: 2,
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
