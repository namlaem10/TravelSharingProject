import {createStore, applyMiddleware, compose} from 'redux';
import {persistReducer, persistCombineReducers} from 'redux-persist';

import Reactotron from 'reactotron-react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';

import ReduxThunk from 'redux-thunk';
import appReducers from '../reducers';
import {AsyncStorage} from 'react-native';

const composeEnhancers =
  (__DEV__ &&
    typeof window != 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const persistConfig = {
  key: 'root',
  blacklist: ['toast', 'navigation'],
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, appReducers);
const configureStore = () => {
  console.disableYellowBox = true;
  const ReactotronConnect = Reactotron.configure({
    name: 'TravelSharing',
    // host: "192.168.1.28"
  })
    .useReactNative({
      asyncStorage: false, // there are more options to the async storage.
      networking: {
        // optionally, you can turn it off with false.
        ignoreUrls: /symbolicate/,
      },
      editor: false, // there are more options to editor
      errors: {veto: stackFrame => false}, // or turn it off with false
      overlay: false, // just turning off overlay
    })
    .use(reduxPlugin())
    .connect();

  const store = createStore(persistedReducer, {}, enhancer);
  return store;
};
export default configureStore();
