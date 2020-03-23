import React from 'react';
import {Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import StartScreen from '../screens/Authentication/StartScreen';
import Onboarding from '../screens/Authentication/OnboardingScreen';
import SignIn from '../screens/Authentication/SignInScreen';
import SignUp from '../screens/Authentication/SignUpScreen';
import ForgotPassword from '../screens/Authentication/ForgotPasswordScreen';
import MyTravel from '../screens/MyTravelTab/MyTravelScreen';
import ManageGroup from '../screens/ManageGroupTab/ManageGroupScreen';
import Notification from '../screens/NotificationTab/NotificationScreen';
import Account from '../screens/AcountTab/AccountScreen';

import NewsFeed from '../screens/SharingTab/NewsFeedScreen';
import PostDetail from '../screens/SharingTab/PostDetailScreen';

import {Images, FontSizes, Fonts, Colors, WIDTH} from './Constants';
EStyleSheet.build({$rem: WIDTH / 380});

const AuthStack = createStackNavigator(
  {
    Start: {
      screen: StartScreen,
    },
    Onboarding: {
      screen: Onboarding,
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
  },
  {
    initialRouteName: 'Start',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const SharingStack = createStackNavigator(
  {
    NewFeed: {
      screen: NewsFeed,
    },
    PostDetail: {
      screen: PostDetail,
    },
  },
  {
    initialRouteName: 'PostDetail',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
//hide Bottom tab navigation
SharingStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName !== 'NewFeed') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const MainStack = createBottomTabNavigator(
  {
    Sharing: {
      screen: SharingStack,
      navigationOptions: {
        title: 'Bài viết',
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={Images.IC_NEWSFEED_ACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Images.IC_NEWSFEED_DEACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ),
      },
    },
    MyTravel: {
      screen: MyTravel,
      navigationOptions: {
        title: 'Lịch trình của tôi',
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={Images.IC_MYTRAVEL_ACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Images.IC_MYTRAVEL_DEACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ),
      },
    },
    ManageGroup: {
      screen: ManageGroup,
      navigationOptions: {
        title: 'Quản lý nhóm',
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={Images.IC_MANAGEGROUP_ACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Images.IC_MANAGEGROUP_DEACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ),
      },
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        title: 'Thông báo',
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={Images.IC_NOTIFICATION_ACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Images.IC_NOTIFICATION_DEACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ),
      },
    },
    Account: {
      screen: Account,
      navigationOptions: {
        title: 'Khác',
        tabBarIcon: ({focused}) =>
          focused ? (
            <Image
              source={Images.IC_DIFFERENCE_ACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={Images.IC_DIFFERENCE_DEACTIVE}
              style={{
                width: EStyleSheet.value('25rem'),
                height: EStyleSheet.value('25rem'),
              }}
              resizeMode="contain"
            />
          ),
      },
    },
  },
  {
    initialRouteName: 'Sharing',
    tabBarOptions: {
      keyboardHidesTabBar: true,
      inactiveTintColor: Colors.deactive,
      inactiveBackgroundColor: Colors.white,
      activeBackgroundColor: Colors.white,
      activeTintColor: Colors.primary,
      labelStyle: {
        fontFamily: Fonts.medium,
        fontSize: EStyleSheet.value(FontSizes.tabTitle),
      },
      style: {
        height: EStyleSheet.value('50rem'),
      },
      tabStyle: {
        borderTopWidth: 0.3,
        borderTopColor: '#CDCDCD',
      },
    },
  },
);

const AppStack = createSwitchNavigator({
  // Auth: {
  //   screen: AuthStack,
  // },
  Main: {
    screen: MainStack,
  },
});

const AppContainer = createAppContainer(AppStack);

export default AppContainer;
