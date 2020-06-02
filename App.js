import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/es/integration/react';

import AppContainer from './src/utils/Navigator';
import configureStore from './src/redux/stores/configureStore';
import notificationService from './src/services/Notification';
import firebase from 'react-native-firebase';

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
    firebase.crashlytics().enableCrashlyticsCollection();
    firebase.analytics().setAnalyticsCollectionEnabled(true);
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
