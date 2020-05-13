import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/APIservice';

import {GetRoutes} from '../../utils/Constants';

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
  UPDATE_SCHEDULE_DETAIL: 'UPDATE_SCHEDULE_DETAIL',
  UPDATE_SCHEDULE_DETAIL_FAIL: 'UPDATE_SCHEDULE_DETAIL_FAIL',
  CREATE_POST: 'CREATE_POST',
  CREATE_POST_FAIL: 'CREATE_POST_FAIL',
  POST_COMMENT: 'POST_COMMENT',
  POST_COMMENT_FAIL: 'POST_COMMENT_FAIL',
  POST_RATING: 'POST_RATING',
  POST_RATING_FAIL: 'POST_RATING_FAIL',
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
  create_post: (idHanhTrinh, title, description, backgroundFile = null) => {
    return async dispatch => {
      try {
        const url = `/api/travel/blog/${idHanhTrinh}`;
        const token = await getToken();
        const contentType = 'multipart/form-data';
        var bodyFormData = new FormData();
        bodyFormData.append('title', title);
        bodyFormData.append('description', description);
        if (backgroundFile !== null) {
          bodyFormData.append('background', {
            uri: backgroundFile.uri,
            type: backgroundFile.type,
            name: backgroundFile.fileName,
          });
        }
        const result = await api.put(url, bodyFormData, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_POST,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.CREATE_POST_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.CREATE_POST_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  update_schedule_detail: (schedule_detail, idHanhTrinh, number_of_days) => {
    // let params = new URLSearchParams();
    return async dispatch => {
      try {
        const url = `/api/travel/update/${idHanhTrinh}`;
        const token = await getToken();
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        for (let i = 1; i <= number_of_days; i++) {
          let count = 0;
          schedule_detail['day_' + i].map(item => {
            params.append(`schedule_detail[day_${i}][${count}]`, item._id);
            count++;
          });
        }
        const result = await api.put(url, params, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_SCHEDULE_DETAIL,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.UPDATE_SCHEDULE_DETAIL_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.UPDATE_SCHEDULE_DETAIL_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
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
      try {
        const url = `/api/touristdestination/${destinationId}`;
        const token = await getToken();
        const result = await api.get(url, token);
        if (result.status === 200) {
          dispatch({
            type: types.GET_LANDSCAPES,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.GET_LANDSCAPES_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.GET_LANDSCAPES_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
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
  post_comment: (id, content) => {
    return async dispatch => {
      try {
        const url = `/api/travel/comment/${id}`;
        const token = await getToken();
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        params.append('content', content);
        const result = await api.put(url, params, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.POST_COMMENT,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.POST_COMMENT_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.POST_COMMENT_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  post_rating: (id, rating) => {
    return async dispatch => {
      try {
        const url = `/api/travel/rating/${id}`;
        const token = await getToken();
        const contentType = 'application/x-www-form-urlencoded';
        let params = new URLSearchParams();
        params.append('rating', rating);
        const result = await api.put(url, params, token, contentType);
        if (result.status === 200) {
          dispatch({
            type: types.POST_RATING,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.POST_RATING_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.POST_RATING_FAIL,
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
    case types.UPDATE_SCHEDULE_DETAIL: {
      return {
        type: types.UPDATE_SCHEDULE_DETAIL,
        data: payload.data,
      };
    }
    case types.CREATE_POST: {
      return {
        type: types.CREATE_POST,
        data: payload.data,
      };
    }
    case types.CREATE_POST_FAIL: {
      return {
        type: types.CREATE_POST_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.POST_COMMENT: {
      return {
        type: types.POST_COMMENT,
        data: payload.data,
      };
    }
    case types.POST_COMMENT_FAIL: {
      return {
        type: types.POST_COMMENT_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.POST_RATING: {
      return {
        type: types.POST_RATING,
        data: payload.data,
      };
    }
    case types.POST_RATING_FAIL: {
      return {
        type: types.POST_RATING_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    default: {
      return state;
    }
  }
};
