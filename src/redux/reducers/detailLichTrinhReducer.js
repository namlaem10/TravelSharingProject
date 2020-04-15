import AsyncStorage from '@react-native-community/async-storage';
import {GetRoutes} from '../../utils/Constants';

export const types = {
  GET_LOCATION_INFO: 'GET_LOCATION_INFO',
  GET_LOCATION_INFO_FAIL: 'GET_LOCATION_INFO_FAIL',
  RESET: 'RESET',
};

export const actions = {
  get_location_info: (schedule_detail, numberOfDay) => {
    return async dispatch => {
      try {
        let scheduledetail = await GetRoutes(schedule_detail, numberOfDay);
        if (scheduledetail) {
          dispatch({
            type: types.GET_LOCATION_INFO,
            payload: {
              data: scheduledetail,
            },
          });
        } else {
          let message = 'Lỗi tải dữ liệu';
          let status = 404;
          dispatch({
            type: types.GET_LOCATION_INFO_FAIL,
            payload: {
              data: message,
              status: status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.GET_LOCATION_INFO_FAIL,
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
      console.log('reset State');
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
export const detailLichTrinhReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.GET_LOCATION_INFO: {
      return {
        type: types.GET_LOCATION_INFO,
        data: payload.data,
      };
    }
    case types.GET_LOCATION_INFO_FAIL: {
      return {
        type: types.GET_LOCATION_INFO_FAIL,
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
