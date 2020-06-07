import api from '../../services/APIservice';
import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  LOGOUT: 'LOGOUT',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
  LOGIN: 'LOGIN',
  LOGIN_FAIL: 'LOGIN_FAIL',
  UPDATE_INFO: 'UPDATE_INFO',
  UPDATE_INFO_FAIL: 'UPDATE_INFO_FAIL',
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_FAIL: 'SIGN_UP_FAIL',
  RESET: 'RESET',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  FORGOT_PASSWORD_FAIL: 'FORGOT_PASSWORD_FAIL',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_FAIL: 'CHANGE_PASSWORD_FAIL',
  ADD_FRIEND: 'ADD_FRIEND',
  ADD_FRIEND_FAIL: 'ADD_FRIEND_FAIL',
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
  logout: () => {
    return async dispatch => {
      try {
        const url = '/api/user/fcm';
        const token = await getToken();
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        params.append('fcm', 'null');
        const result = await api.put(url, params, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.LOGOUT,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.LOGOUT_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.LOGOUT_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  login: user => {
    return async dispatch => {
      try {
        const url = '/api/user/login';
        const contentType = 'application/x-www-form-urlencoded';
        const data = user;
        const fcmToken = await getFcmToken();
        const result = await api.post(url, data, null, contentType);
        if (result.status === 200) {
          const urlFcm = '/api/user/fcm';
          let params = new URLSearchParams();
          params.append('fcm', fcmToken);
          api.put(urlFcm, params, result.data.token, contentType);
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
        console.log(data);
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
  change_password: (password, newpassword) => {
    return async dispatch => {
      try {
        const url = '/api/user/changepassword';
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        params.append('password', password);
        params.append('newpassword', newpassword);
        const token = await getToken();
        const result = await api.put(url, params, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.CHANGE_PASSWORD,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.CHANGE_PASSWORD_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.CHANGE_PASSWORD_FAIL,
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
  forgot_password: email => {
    return async dispatch => {
      try {
        const url = '/api/user/forgotpassword';
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        params.append('email', email);
        const result = await api.post(url, params, null, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.FORGOT_PASSWORD,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        } else {
          dispatch({
            type: types.FORGOT_PASSWORD_FAIL,
            payload: {
              data: result.data.data,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.FORGOT_PASSWORD_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  add_friend: (user, friend) => {
    return async dispatch => {
      try {
        const url = '/api/user/addfriend';
        const contentType = 'application/x-www-form-urlencoded';
        let token = await getToken();
        let params = new URLSearchParams();
        params.append('friend', friend._id);

        const result = await api.put(url, params, token, contentType);
        if (result.status === 200) {
          let newFriend = {
            _id: friend._id,
            email: friend.email,
            display_name: friend.display_name,
            phone: friend.phone,
            avatar: friend.avatar,
          };
          let User = user;
          User.user_info.friend.push(newFriend);
          dispatch({
            type: types.ADD_FRIEND,
            payload: {
              data: User,
            },
          });
        } else {
          dispatch({
            type: types.ADD_FRIEND_FAIL,
            payload: {
              data: result.data.data,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.ADD_FRIEND_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
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
    case types.LOGOUT: {
      return {
        type: types.LOGOUT,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.LOGOUT_FAIL: {
      return {
        type: types.LOGOUT_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
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
        data: state.data,
        status: payload.status,
      };
    }
    case types.CHANGE_PASSWORD: {
      return {
        type: types.CHANGE_PASSWORD,
        data: state.data,
      };
    }
    case types.CHANGE_PASSWORD_FAIL: {
      return {
        type: types.CHANGE_PASSWORD_FAIL,
        message: payload.data.message,
        data: state.data,
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
    case types.FORGOT_PASSWORD: {
      return {
        type: types.FORGOT_PASSWORD,
        data: payload.data,
      };
    }
    case types.FORGOT_PASSWORD_FAIL: {
      return {
        type: types.FORGOT_PASSWORD_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.ADD_FRIEND: {
      return {
        type: types.ADD_FRIEND,
        data: payload.data,
      };
    }
    case types.ADD_FRIEND_FAIL: {
      return {
        type: types.ADD_FRIEND_FAIL,
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
