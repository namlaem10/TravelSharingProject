export const types = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  RESET: 'RESET',
};
export const actions = {
  update_trip: trip => {
    return async dispatch => {
      dispatch({
        type: types.UPDATE_TRIP,
        payload: {data: trip},
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
  data: null,
  type: null,
  token: null,
  status: null,
  error: null,
};
export const managerGroupTripReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.UPDATE_TRIP: {
      return {
        type: types.UPDATE_TRIP,
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
