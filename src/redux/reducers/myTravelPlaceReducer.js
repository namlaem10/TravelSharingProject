import api from '../../services/APIservice';
import AsyncStorage from '@react-native-community/async-storage';
export const types = {
  PICK_START_PLACE: 'PICK_START_PLACE',
  PICK_END_PLACE: 'PICK_END_PLACE',
  RESET_START: 'RESET_START',
  RESET_END: 'RESET_END',
  GET_DESTINATION: 'GET_DESTINATION',
  GET_DESTINATION_FAIL: 'GET_DESTINATION_FAIL',
  GET_SUGGEST_SCHEDULE: 'GET_SUGGEST_SCHEDULE',
  GET_SUGGEST_SCHEDULE_FAIL: 'GET_SUGGEST_SCHEDULE_FAIL ',
};
import {getDistance} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
let userPosition = {latitude: '', longitude: ''};
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

function getCurrentPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  userPosition = {
    latitude: latitude,
    longitude: longitude,
  };
}
Geolocation.getCurrentPosition(info => getCurrentPosition(info));
function calDestication(array) {
  let newArray = [];
  array.map(item => {
    let dis = getDistance(
      {
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
      },
      {
        latitude: item.latitude,
        longitude: item.longitude,
      },
    );
    newArray.push({...item, distance: Math.round((dis / 1000) * 10) / 10});
  });
  newArray.sort(function(a, b) {
    return a.distance - b.distance;
  });
  return newArray;
}
export const actions = {
  get_suggest_schedule: (desinationID, num_of_days) => {
    return async dispatch => {
      try {
        const token = await getToken();
        const url = `/api/schedule/suggest?destination=${desinationID}&day=${num_of_days}`;
        const result = await api.get(url, token);
        if (result.status === 200) {
          dispatch({
            type: types.GET_SUGGEST_SCHEDULE,
            payload: {
              data: result.data,
            },
          });
        } else {
          dispatch({
            type: types.GET_SUGGEST_SCHEDULE_FAIL,
            payload: {
              data: result.data,
              status: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.GET_SUGGEST_SCHEDULE_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
  getDestination: () => {
    return async dispatch => {
      try {
        const url = '/api/destination/all';
        const token = await getToken();
        const result = await api.get(url, token);
        const data = calDestication(result.data);
        if (result.status === 200) {
          dispatch({
            type: types.GET_DESTINATION,
            payload: {
              data: data,
            },
          });
        } else {
          dispatch({
            type: types.GET_DESTINATION_FAIL,
            payload: {
              data: result.data.data,
              satus: result.status,
            },
          });
        }
      } catch (error) {
        dispatch({
          type: types.GET_DESTINATION_FAIL,
          payload: {
            data: error.data,
            status: error.status,
          },
        });
      }
    };
  },
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
  reset: () => {
    return async dispatch => {
      dispatch({
        type: types.RESET,
        payload: {data: initialState},
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

export const createTripReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.PICK_START_PLACE: {
      return {
        type: types.PICK_START_PLACE,
        data: payload.data,
      };
    }
    case types.PICK_END_PLACE: {
      return {
        type: types.PICK_END_PLACE,
        data: payload.data,
      };
    }
    case types.GET_SUGGEST_SCHEDULE: {
      return {
        type: types.GET_SUGGEST_SCHEDULE,
        data: payload.data,
      };
    }
    case types.GET_SUGGEST_SCHEDULE_FAIL: {
      return {
        type: types.GET_SUGGEST_SCHEDULE_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.GET_DESTINATION: {
      return {
        type: types.GET_DESTINATION,
        data: payload.data,
      };
    }
    case types.GET_DESTINATION_FAIL: {
      return {
        type: types.GET_DESTINATION_FAIL,
        data: payload.data,
        status: payload.status,
      };
    }
    case types.RESET: {
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
