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
import ManageGroup from '../screens/ManageGroupTab/ManageGroupScreen';
import Notification from '../screens/NotificationTab/NotificationScreen';

import NewsFeed from '../screens/SharingTab/NewsFeedScreen';
import PostDetail from '../screens/SharingTab/PostDetailScreen';
import TravelTimelineDetail from '../screens/SharingTab/TravelTimelineDetailScreen';
import CreateTeam from '../screens/ManageGroupTab/CreateTeamScreen';
import AddTrip from '../screens/ManageGroupTab/AddTripScreen';
import AddMember from '../screens/ManageGroupTab/AddMemberScreen';
import Chatting from '../screens/ManageGroupTab/ChattingScreen';
import TrackingMap from '../screens/ManageGroupTab/TrackingMapScreen';
import InfoGroup from '../screens/ManageGroupTab/InfoGroupScreen';
import Member from '../screens/ManageGroupTab/MemberScreen';

import Account from '../screens/AcountTab/AccountScreen';
import InfoUser from '../screens/AcountTab/InfoUserScreen';
import EditInfo from '../screens/AcountTab/EditInfoScreen';

import MyTravel from '../screens/MyTravelTab/MyTravelScreen';
import TimeLineDetail from '../screens/MyTravelTab/TimeLineDetailScreen';
import ShareTimeLineDetail from '../screens/MyTravelTab/ShareTimeLineDetailScreen';
import CreatePost from '../screens/MyTravelTab/CreatePostScreen';
import CreateTrip from '../screens/MyTravelTab/CreateTripScreen';
import AddPlace from '../screens/MyTravelTab/AddPlaceScreen';
import TripDetail from '../screens/MyTravelTab/TripDetailScreen';
import AddPlaceDetail from '../screens/MyTravelTab/AddPlaceDetailScreen';

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
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const SharingStack = createStackNavigator(
  {
    NewsFeed: {
      screen: NewsFeed,
    },
    PostDetail: {
      screen: PostDetail,
    },
    TravelTimelineDetail: {
      screen: TravelTimelineDetail,
    },
  },
  {
    initialRouteName: 'NewsFeed',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
//hide Bottom tab navigation
SharingStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName !== 'NewsFeed') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const ManageGroupStack = createStackNavigator(
  {
    ManageGroup: {
      screen: ManageGroup,
    },
    CreateTeam: {
      screen: CreateTeam,
    },
    AddTrip: {
      screen: AddTrip,
    },
    AddMember: {
      screen: AddMember,
    },
    Chatting: {
      screen: Chatting,
    },
    TrackingMap: {
      screen: TrackingMap,
    },
    InfoGroup: {
      screen: InfoGroup,
    },
    Member: {
      screen: Member,
    },
  },
  {
    initialRouteName: 'ManageGroup',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
//hide Bottom tab navigation
ManageGroupStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName !== 'ManageGroup') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const AccountStack = createStackNavigator(
  {
    Account: {
      screen: Account,
    },
    InfoUser: {
      screen: InfoUser,
    },
    EditInfo: {
      screen: EditInfo,
    },
  },
  {
    initialRouteName: 'Account',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
//hide Bottom tab navigation
AccountStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName !== 'Account') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
const MyTravelStack = createStackNavigator(
  {
    MyTravel: {
      screen: MyTravel,
    },
    TimeLineDetail: {
      screen: TimeLineDetail,
    },
    CreatePost: {
      screen: CreatePost,
    },
    ShareTimeLineDetail: {
      screen: ShareTimeLineDetail,
    },
    CreateTrip: {
      screen: CreateTrip,
    },
    AddPlace: {
      screen: AddPlace,
    },
    TripDetail: {
      screen: TripDetail,
    },
    AddPlaceDetail: {
      screen: AddPlaceDetail,
    },
  },
  {
    initialRouteName: 'MyTravel',
    defaultNavigationOptions: {
      header: null,
    },
  },
);
//hide Bottom tab navigation
MyTravelStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName !== 'MyTravel') {
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
      screen: MyTravelStack,
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
      screen: ManageGroupStack,
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
      screen: AccountStack,
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
  Auth: {
    screen: AuthStack,
  },
  Main: {
    screen: MainStack,
  },
});

const AppContainer = createAppContainer(AppStack);

export default AppContainer;
