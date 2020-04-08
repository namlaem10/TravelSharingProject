import api from '../../services/APIservice';
export const types = {
  LOGIN: 'LOGIN',
  LOGIN_FAIL: 'LOGIN_FAIL',
  RESET: 'RESET',
};
export const actions = {
  login: user => {
    return async dispatch => {
      try {
        const url = '/api/user/login';
        const contentType = 'application/x-www-form-urlencoded';
        const data = user;
        const result = await api.post(url, data, null, contentType);
        if (result) {
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
              data: result.data,
            },
          });
        }
      } catch (error) {
        console.log(error);
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
      };
    }
    case types.RESET: {
      return {
        type: types.RESET,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
