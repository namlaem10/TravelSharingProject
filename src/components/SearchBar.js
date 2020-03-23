import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

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

  render() {
    const {value, onChangeText, title, placeHolder} = this.props;
    const {isClickSearch} = this.state;
    return isClickSearch ? (
      <View style={styles.container1}>
        <View style={styles.iconSearch1}>
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
        <View style={styles.inputText}>
          <TextInput
            placeholder={placeHolder}
            style={styles.searchBar}
            onChangeText={text => onChangeText(text)}
            value={value}
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
              fontFamily: constants.Fonts.black,
              letterSpacing: 2,
            }}>
            {title}
          </Text>
        </View>
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
    borderRadius: '10rem',
    backgroundColor: '#CDCDCD',
  },
  container2: {
    width: '100%',
    height: '45rem',
    justifyContent: 'center',
  },
  inputText: {
    marginLeft: '45rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    width: '100%',
    height: '45rem',
    fontSize: '16rem',
    // fontFamily: constants.Fonts.light,
    letterSpacing: 2,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconSearch1: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: '10rem',
  },
  iconSearch2: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
