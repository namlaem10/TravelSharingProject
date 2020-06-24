import api from '../../services/APIservice';
import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  PUSH_NOTI: 'PUSH_NOTI',
  PUSH_NOTI_FAIL: 'PUSH_NOTI_FAIL',
  GET_TRAVEL_BY_ID: 'GET_TRAVEL_BY_ID',
  GET_TRAVEL_BY_ID_FAIL: 'GET_TRAVEL_BY_ID_FAIL',
  GET_NOTI: 'GET_NOTI',
  GET_NOTI_FAIL: 'GET_NOTI_FAIL',
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
// async function getFcmToken() {
//   try {
//     const value = await AsyncStorage.getItem('fcmToken');
//     if (value) {
//       return value;
//     } else {
//       return null;
//     }
//   } catch (e) {
//     console.log('get fcm token has error');
//   }
// }
export const actions = {
  push_noti: (idHanhTrinh, data, arrayMember) => {
    return async dispatch => {
      try {
        const url = '/api/notification/send/' + idHanhTrinh;
        const token = await getToken();
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        let count = 0;
        data.map(item => {
          params.append(`member_away[${count}][name]`, item.name);
          params.append(`member_away[${count}][distance]`, item.dis);
          count++;
        });
        let count1 = 0;
        arrayMember.map(item => {
          params.append(`member[${count1}]`, item._id);
          count1++;
        });
        const result = await api.post(url, params, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.PUSH_NOTI,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.PUSH_NOTI_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
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
  get_travel_by_id: idHanhTrinh => {
    return async dispatch => {
      try {
        const url = '/api/travel/get/' + idHanhTrinh;
        const token = await getToken();
        const result = await api.get(url, token);
        if (result.status === 200) {
          dispatch({
            type: types.GET_TRAVEL_BY_ID,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.GET_TRAVEL_BY_ID_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.GET_TRAVEL_BY_ID_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  get_noti: () => {
    return async dispatch => {
      try {
        const url = '/api/notification/get';
        const token = await getToken();
        const result = await api.get(url, token);
        if (result.status === 200) {
          dispatch({
            type: types.GET_NOTI,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.GET_NOTI_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.GET_NOTI_FAIL,
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
    case types.GET_TRAVEL_BY_ID: {
      return {
        type: types.GET_TRAVEL_BY_ID,
        data: payload.data,
      };
    }
    case types.GET_TRAVEL_BY_ID_FAIL: {
      return {
        type: types.GET_TRAVEL_BY_ID_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.GET_NOTI: {
      return {
        type: types.GET_NOTI,
        data: payload.data,
      };
    }
    case types.GET_NOTI_FAIL: {
      return {
        type: types.GET_NOTI_FAIL,
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
