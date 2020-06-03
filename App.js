import React, {Component} from 'react';
import {StatusBar, Platform, InteractionManager} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';

import AppContainer from './src/utils/Navigator';
import configureStore from './src/redux/stores/configureStore';
import notificationService from './src/services/Notification';
import firebase from 'react-native-firebase';

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    await notificationService.init();
  }

  async componentWillUnmount() {
    notificationService.release();
    // firebase.crashlytics().enableCrashlyticsCollection();
    // firebase.analytics().setAnalyticsCollectionEnabled(true);
  }
  render() {
    const persistor = persistStore(configureStore);
    return (
      <Provider store={configureStore}>
        <PersistGate persistor={persistor}>
          <StatusBar
            translucent
            backgroundColor={'transparent'}
            barStyle="dark-content"
          />
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
