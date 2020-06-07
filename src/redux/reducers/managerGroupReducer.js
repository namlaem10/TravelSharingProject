import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/APIservice';

export const types = {
  UPDATE_MEMBER: 'UPDATE_MEMBER',
  UPDATE_TRIP: 'UPDATE_TRIP',
  PUT_UPDATE_MEMBER: 'PUT_UPDATE_MEMBER',
  PUT_UPDATE_MEMBER_FAIL: 'PUT_UPDATE_MEMBER_FAIL',
  RESET_MEMBER: 'RESET_MEMBER',
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
  put_update_member: (idHanhTrinh, member) => {
    return async dispatch => {
      try {
        const url = `/api/travel/update/${idHanhTrinh}`;
        const token = await getToken();
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        let count = 0;
        if (member.length > 0) {
          member.map(item => {
            params.append(`member[${count}]`, item);
            count++;
          });
        } else {
          params.append('member[0]', 'null');
        }
        const result = await api.put(url, params, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.PUT_UPDATE_MEMBER,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.PUT_UPDATE_MEMBER_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.PUT_UPDATE_MEMBER_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  update_trip: trip => {
    return async dispatch => {
      dispatch({
        type: types.UPDATE_TRIP,
        payload: {data: trip},
      });
    };
  },
  update_mem: mems => {
    return async dispatch => {
      dispatch({
        type: types.UPDATE_MEMBER,
        payload: {data: mems},
      });
    };
  },
  reset_member: () => {
    return async dispatch => {
      dispatch({
        type: types.RESET_MEMBER,
      });
    };
  },
  updateLoading: (status, type) => ({
    type: type,
    payload: {error: status},
  }),
};
const initialState = {
  data: [],
  type: null,
  token: null,
  status: null,
  error: null,
};
export const managerGroupReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.UPDATE_MEMBER: {
      return {
        type: types.UPDATE_MEMBER,
        data: payload.data,
      };
    }
    case types.UPDATE_TRIP: {
      return {
        type: types.UPDATE_TRIP,
        data: payload.data,
      };
    }
    case types.PUT_UPDATE_MEMBER: {
      return {
        type: types.PUT_UPDATE_MEMBER,
        data: payload.data,
      };
    }
    case types.PUT_UPDATE_MEMBER_FAIL: {
      return {
        type: types.PUT_UPDATE_MEMBER_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.RESET_MEMBER: {
      return {
        type: types.RESET_MEMBER,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
