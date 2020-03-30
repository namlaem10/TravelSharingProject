export const types = {
  UPDATE_MEMBER: 'UPDATE_MEMBER',
  RESET: 'RESET',
};
export const actions = {
  update_mem: mems => {
    return async dispatch => {
      dispatch({
        type: types.UPDATE_MEMBER,
        payload: {data: mems},
      });
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
  data: [],
  type: null,
  token: null,
  status: null,
  error: null,
};
export const managerGroupMemberReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.UPDATE_MEMBER: {
      return {
        type: types.UPDATE_MEMBER,
        data: payload.data,
      };
    }
    case types.RESET: {
      return {
        type: types.RESET,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};
