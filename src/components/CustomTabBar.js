import React, {Component} from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

const {StyleSheet, Text, View, ViewPropTypes, Animated} = ReactNative;
import Button from './Button';

const defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

export default class CustomTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);
  }

  renderTabOption(name, page) {}

  renderTab(name, page, isTabActive, onPressHandler) {
    const {activeTextColor, inactiveTextColor, textStyle} = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <Button
        style={styles.flexOne}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}>
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{color: textColor, fontWeight}, textStyle]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View
        style={[
          styles.tabs,
          {backgroundColor: this.props.backgroundColor},
          this.props.style,
        ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage); // () =>
        })}
        <Animated.View
          style={[tabUnderlineStyle, {left}, this.props.underlineStyle]}
        />
      </View>
    );
  }
}

CustomTabBar.propTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
  backgroundColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  textStyle: Text.propTypes.style,
  tabStyle: ViewPropTypes.style,
  renderTab: PropTypes.func,
  underlineStyle: ViewPropTypes.style,
};

CustomTabBar.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});
