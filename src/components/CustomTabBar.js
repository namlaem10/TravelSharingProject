import React, {Component} from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

const {Text, View, ViewPropTypes, Animated, ScrollView} = ReactNative;
import Button from './Button';
import * as constants from '../utils/Constants';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({$rem: constants.WIDTH / 380});

let currentTab = 0;
let jumpX = 0;
export default class CustomTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.renderTab = this.renderTab.bind(this);
  }

  componentDidMount = () => {
    currentTab = this.props.tab;
  };

  renderTabOption(name, page) {}

  renderTab(name, page, isTabActive, onPressHandler) {
    const {activeTextColor, inactiveTextColor} = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fonFamily = isTabActive
      ? constants.Fonts.bold
      : constants.Fonts.regular;
    const fontSize = isTabActive
      ? EStyleSheet.value('16rem')
      : EStyleSheet.value('14rem');

    return (
      <Button
        style={styles.flexOne}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}>
        <Text
          style={{
            ...styles.textStyle,
            color: textColor,
            fontFamily: fonFamily,
            fontSize: fontSize,
            backgroundColor: isTabActive ? 'rgba(52,220,120,0.98)' : 'white',
          }}>
          {name}
        </Text>
      </Button>
    );
  }
  jumpTab = () => {
    const {tab} = this.props;

    if (tab >= 2) {
      if (tab < currentTab) {
        if (tab === 2) {
          jumpX = 0;
          this.listView.scrollTo({
            x: EStyleSheet.value(jumpX + 'rem'),
            animated: true,
          });
          jumpX = 120;
          currentTab = tab;
        } else {
          jumpX = jumpX - 120;
          this.listView.scrollTo({
            x: EStyleSheet.value(jumpX + 'rem'),
            animated: true,
          });
          currentTab = tab;
        }
      } else if (tab > currentTab) {
        jumpX = jumpX + 120;
        this.listView.scrollTo({
          x: EStyleSheet.value(jumpX + 'rem'),
          animated: true,
        });
        currentTab = tab;
      }
    }
  };

  render() {
    this.jumpTab();
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: EStyleSheet.value(containerWidth / numberOfTabs + 'rem'),
      height: EStyleSheet.value('4rem'),
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <ScrollView
        ref={ref => (this.listView = ref)}
        horizontal={true}
        contentContainerStyle={[
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
      </ScrollView>
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
  tabStyle: ViewPropTypes.style,
  renderTab: PropTypes.func,
  underlineStyle: ViewPropTypes.style,
};

CustomTabBar.defaultProps = {
  activeTextColor: 'navy',
  inactiveTextColor: 'black',
  backgroundColor: null,
};

const styles = EStyleSheet.create({
  tab: {
    width: '90rem',
    height: '30rem',
    borderRadius: '20rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '30rem',
  },
  flexOne: {
    flex: 1,
  },
  tabs: {
    height: '50rem',
    flexDirection: 'row',
    borderBottomLeftRadius: '20rem',
    borderBottomRightRadius: '20rem',
    minWidth: constants.WIDTH,
  },
  textStyle: {
    width: '90rem',
    height: '30rem',
    borderRadius: '20rem',
    textAlignVertical: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: '18rem',
  },
});
