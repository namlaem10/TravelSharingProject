export const types = {
  UPDATE_TAB: 'UPDATE_TAB',
  UPDATE_TAB_FAIL: 'UPDATE_TAB_FAIL',
};
export const actions = {
  update_tab: tab => {
    return async dispatch => {
      dispatch({
        type: types.UPDATE_TAB,
        payload: {data: tab},
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
export const postDetailReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.UPDATE_TAB: {
      return {
        type: types.RESET,
        data: payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
