export const types = {
  PICK_START_PLACE: 'PICK_START_PLACE',
  PICK_END_PLACE: 'PICK_END_PLACE',
  RESET_START: 'RESET_START',
  RESET_END: 'RESET_END',
};
export const actions = {
  pickStartPlace: place => {
    return async dispatch => {
      dispatch({
        type: types.PICK_START_PLACE,
        payload: {data: place},
      });
    };
  },
  pickEndPlace: place => {
    return async dispatch => {
      dispatch({
        type: types.PICK_END_PLACE,
        payload: {data: place},
      });
    };
  },
  resetStart: () => {
    return async dispatch => {
      dispatch({
        type: types.RESET_START,
      });
    };
  },
  resetEnd: () => {
    return async dispatch => {
      dispatch({
        type: types.RESET_END,
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

export const startPlaceReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.PICK_START_PLACE: {
      return {
        type: types.PICK_START_PLACE,
        data: payload.data,
      };
    }
    case types.RESET_START: {
      return {
        type: types.RESET_START,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
export const endPlaceReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.PICK_END_PLACE: {
      return {
        type: types.PICK_END_PLACE,
        data: payload.data,
      };
    }
    case types.RESET_END: {
      return {
        type: types.RESET_END,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
