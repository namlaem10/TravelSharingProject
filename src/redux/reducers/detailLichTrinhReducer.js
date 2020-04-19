import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/APIservice';

import {GetRoutes} from '../../utils/Constants';
import {DiemThamQuan} from '../../utils/fakedata';

export const types = {
  GET_LOCATION_INFO: 'GET_LOCATION_INFO',
  GET_LOCATION_INFO_FAIL: 'GET_LOCATION_INFO_FAIL',
  POST_HANHTRINH: 'POST_HANHTRINH',
  POST_HANHTRINH_FAIL: 'POST_HANHTRINH_FAIL',
  DELETE_SCHEDULE_DETAIL_ITEM: 'DELETE_SCHEDULE_DETAIL_ITEM',
  DELETE_SCHEDULE_DETAIL_ITEM_FAIL: 'DELETE_SCHEDULE_DETAIL_ITEM_FAIL',
  GET_LANDSCAPES: 'GET_LANDSCAPES',
  GET_LANDSCAPES_FAIL: 'GET_LANDSCAPES_FAIL',
  ADD_LANDSCAPES: 'ADD_LANDSCAPES',
  RESET: 'RESET',
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
  add_landscapes: (arrayItems, keyDay, schedule_detail, number_of_days) => {
    return async dispatch => {
      arrayItems.map(item => {
        schedule_detail[keyDay].push(item);
      });
      let routes = await GetRoutes(schedule_detail, number_of_days);
      dispatch({
        type: types.ADD_LANDSCAPES,
        payload: {
          data: {schedule_detail, routes},
        },
      });
    };
  },
  get_landscapes: destinationId => {
    return async dispatch => {
      // gọi api kèm destinationId để lấy array địa điểm
      let landscapes = DiemThamQuan;
      dispatch({
        type: types.GET_LANDSCAPES,
        payload: {
          data: landscapes,
        },
      });
    };
  },
  delete_schedule_detail_item: (schedule_detail, keyDay, itemID) => {
    return async dispatch => {
      schedule_detail[keyDay] = await schedule_detail[keyDay].filter(
        x => x._id !== itemID,
      );
      dispatch({
        type: types.DELETE_SCHEDULE_DETAIL_ITEM,
        payload: {
          data: schedule_detail,
        },
      });
    };
  },
  post_hanhtrinh: data => {
    return async dispatch => {
      try {
        const url = '/api/travel/create';
        const token = await getToken();
        const contentType = 'multipart/form-data';
        let nums_of_day = data.nums_of_day;
        var bodyFormData = new FormData();
        bodyFormData.append('departure', data.departure);
        bodyFormData.append('destination', data.destination);
        bodyFormData.append('start_day', data.start_day);
        bodyFormData.append('end_day', data.end_day);
        bodyFormData.append('rating', data.rating);
        bodyFormData.append('title', data.title);
        bodyFormData.append('description', data.description);
        bodyFormData.append('price', data.price);
        for (let i = 1; i <= nums_of_day; i++) {
          let count = 0;
          data.schedule_detail['day_' + i].map(item => {
            bodyFormData.append(
              `schedule_detail[day_${i}][${count}]`,
              item._id,
            );
            count++;
          });
        }
        let count = 0;
        data.member.map(item => {
          bodyFormData.append(`member[${count}]`, item);
          count++;
        });
        console.log(bodyFormData);
        const result = await api.post(url, bodyFormData, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.POST_HANHTRINH,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.POST_HANHTRINH_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.POST_HANHTRINH_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
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
// export const scheduleDetailReducer = (state = initialState, action) => {
//   const {type, payload} = action;
//   switch (type) {
//     case types.DELETE_SCHEDULE_DETAIL_ITEM: {
//       return {
//         type: types.DELETE_SCHEDULE_DETAIL_ITEM,
//         data: payload.data,
//       };
//     }
//     case types.DELETE_SCHEDULE_DETAIL_ITEM_FAIL: {
//       return {
//         type: types.DELETE_SCHEDULE_DETAIL_ITEM_FAIL,
//         data: payload.data,
//         status: payload.status,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// };
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
    case types.POST_HANHTRINH: {
      return {
        type: types.POST_HANHTRINH,
        data: payload.data,
      };
    }
    case types.POST_HANHTRINH_FAIL: {
      return {
        type: types.POST_HANHTRINH_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.DELETE_SCHEDULE_DETAIL_ITEM: {
      return {
        type: types.DELETE_SCHEDULE_DETAIL_ITEM,
        data: payload.data,
      };
    }
    case types.DELETE_SCHEDULE_DETAIL_ITEM_FAIL: {
      return {
        type: types.DELETE_SCHEDULE_DETAIL_ITEM_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.GET_LANDSCAPES: {
      return {
        type: types.GET_LANDSCAPES,
        data: payload.data,
      };
    }
    case types.ADD_LANDSCAPES: {
      return {
        type: types.ADD_LANDSCAPES,
        data: payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
