import React, {Component} from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';
import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build({$rem: constants.WIDTH / 380});
const {StyleSheet, Text, View, ViewPropTypes, Animated} = ReactNative;
import Button from './Button';

const defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

export default class CustomTabBarNoScroll extends React.Component {
  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);
  }

  renderTabOption(name, page) {}

  renderTab(name, page, isTabActive, onPressHandler) {
    const {activeTextColor, inactiveTextColor, textStyle} = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontSizes = isTabActive
      ? EStyleSheet.value('16rem')
      : EStyleSheet.value('15rem');
    const fontFamily = isTabActive
      ? constants.Fonts.medium
      : constants.Fonts.regular;
    const backgroundColor = isTabActive ? '#34DC78' : null;
    let borderRadiusTab = null;
    if (page === 0) {
      borderRadiusTab = {
        borderTopLeftRadius: EStyleSheet.value('5rem'),
        borderBottomLeftRadius: EStyleSheet.value('5rem'),
      };
    } else if (page === 2) {
      borderRadiusTab = {
        borderTopRightRadius: EStyleSheet.value('5rem'),
        borderBottomRightRadius: EStyleSheet.value('5rem'),
      };
    } else if (page === 1) {
      borderRadiusTab = {
        borderLeftWidth: EStyleSheet.value('1rem'),
        borderRightWidth: EStyleSheet.value('1rem'),
        borderColor: '#EDEDED',
      };
    }
    return (
      <Button
        style={styles.flexOne}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}>
        <View
          style={[
            styles.tab,
            {
              backgroundColor: backgroundColor,
            },
            borderRadiusTab,
          ]}>
          <Text
            style={[
              {color: textColor, fontSize: fontSizes, fontFamily: fontFamily},
              textStyle,
            ]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage); // () =>
        })}
        <Animated.View style={{}} />
      </View>
    );
  }
}

CustomTabBarNoScroll.propTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  backgroundColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  textStyle: Text.propTypes.style,
  renderTab: PropTypes.func,
};

CustomTabBarNoScroll.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

const styles = EStyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '13rem',
    borderRadius: '6rem',
    borderWidth: 1,
    borderColor: '#EDEDED',
    marginBottom: '10rem',
  },
});
