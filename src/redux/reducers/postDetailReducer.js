export const types = {
  RESET: 'RESET',
  TEST: 'TEST',
};
export const actions = {
  resetState: () => {
    return async dispatch => {
      try {
        dispatch({
          type: types.RESET,
          payload: initialState,
        });
      } catch (error) {
        dispatch({
          type: types.RESET,
          payload: initialState,
        });
      } finally {
        dispatch(actions.updateLoading(false));
      }
    };
  },
  test: () => {
    return async dispatch => {
      try {
        dispatch({
          type: types.TEST,
          payload: {
            data: 'TEST nhẹ',
          },
        });
      } catch (error) {
        dispatch({
          type: types.TEST,
          payload: {
            data: 'Nát',
          },
        });
      } finally {
        dispatch(actions.updateLoading(false));
      }
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
    case types.RESET: {
      return {
        type: types.RESET,
        data: null,
      };
    }
    case types.TEST: {
      return {
        type: types.TEST,
        data: payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
