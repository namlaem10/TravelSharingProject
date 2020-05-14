import api from '../../services/APIservice';
import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  PUSH_NOTI: 'PUSH_NOTI',
  PUSH_NOTI_FAIL: 'PUSH_NOTI_FAIL',
};
async function getToken() {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.log('get token has error');
  }
}
async function getFcmToken() {
  try {
    const value = await AsyncStorage.getItem('fcmToken');
    if (value) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.log('get fcm token has error');
  }
}
export const actions = {
  push_noti: data => {
    return async dispatch => {
      try {
        const url = '/api/notification/send';
        const token = await getToken();
        const contentType = 'application/x-www-form-urlencoded';
        const fcmToken = await getFcmToken();
        console.log(fcmToken);
        let params = new URLSearchParams();
        // idHanhTrinh,title,message,groupName,time
        params.append('fcmToken', fcmToken);
        params.append('idHanhTrinh', data.idHanhTrinh);
        params.append('message', data.message);
        params.append('title', data.title);
        params.append('subTitle', data.subTitle);
        params.append('groupName', data.groupName);
        params.append('time', data.time);
        params.append('image', data.image);
        const result = await api.post(url, params, token, contentType);
        dispatch({
          type: types.PUSH_NOTI,
          payload: {
            data: result.data,
          },
        });
      } catch (error) {
        dispatch({
          type: types.PUSH_NOTI_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  reset: () => {
    return async dispatch => {
      dispatch({
        type: types.RESET,
      });
    };
  },
  updateLoading: (status, type) => ({
    type: type,
    payload: {error: status},
  }),
};
const initialState = {
  data: null,
  type: null,
  token: null,
  status: null,
  error: null,
};
export const notificationReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.PUSH_NOTI: {
      return {
        type: types.PUSH_NOTI,
        data: payload.data,
      };
    }
    case types.PUSH_NOTI_FAIL: {
      return {
        type: types.PUSH_NOTI_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.RESET: {
      return {
        type: types.RESET,
        data: null,
        status: null,
      };
    }
    default: {
      return state;
    }
  }
};
