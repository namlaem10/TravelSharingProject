import api from '../../services/APIservice';
import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  LOGIN: 'LOGIN',
  LOGIN_FAIL: 'LOGIN_FAIL',
  UPDATE_INFO: 'UPDATE_INFO',
  UPDATE_INFO_FAIL: 'UPDATE_INFO_FAIL',
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_FAIL: 'SIGN_UP_FAIL',
  RESET: 'RESET',
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
export const actions = {
  login: user => {
    return async dispatch => {
      try {
        const url = '/api/user/login';
        const contentType = 'application/x-www-form-urlencoded';
        const data = user;
        const result = await api.post(url, data, null, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.LOGIN,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        } else {
          dispatch({
            type: types.LOGIN_FAIL,
            payload: {
              data: result.data.data,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.LOGIN_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  update_info: user => {
    return async dispatch => {
      try {
        const url = '/api/user/updateinfo';
        const contentType = 'multipart/form-data';
        const data = user;
        const token = await getToken();
        const result = await api.put(url, data, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_INFO,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.UPDATE_INFO_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.UPDATE_INFO_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  sign_up: params => {
    return async dispatch => {
      try {
        const url = '/api/user/register';
        const contentType = 'application/x-www-form-urlencoded';
        const data = params;
        const result = await api.post(url, data, null, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.SIGN_UP,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.SIGN_UP_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.SIGN_UP_FAIL,
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
export const userReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.LOGIN: {
      return {
        type: types.LOGIN,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.LOGIN_FAIL: {
      return {
        type: types.LOGIN_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.UPDATE_INFO: {
      return {
        type: types.UPDATE_INFO,
        data: payload.data,
      };
    }
    case types.UPDATE_INFO_FAIL: {
      return {
        type: types.UPDATE_INFO_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.SIGN_UP: {
      return {
        type: types.SIGN_UP,
        data: payload.data,
      };
    }
    case types.SIGN_UP_FAIL: {
      return {
        type: types.SIGN_UP_FAIL,
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
