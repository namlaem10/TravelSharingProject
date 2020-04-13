import AsyncStorage from '@react-native-community/async-storage';
import {API_KEY} from '../../utils/Constants';

async function DistanceCalculation(schedule_detail, numberOfDay) {
  let scheduleDetails = [];
  try {
    for (let i = 1; i <= numberOfDay; i++) {
      let routes = [];
      routes.push({
        index: 0,
        data: schedule_detail['day_' + i][0],
      });
      let startCoord = schedule_detail['day_' + i][0].location;
      for (let j = 1; j < schedule_detail['day_' + i].length; j++) {
        let endCoord = schedule_detail['day_' + i][j].location;
        let link = `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${API_KEY}&waypoint0=geo!${
          startCoord.latitude
        },${startCoord.longitude}&waypoint1=geo!${endCoord.latitude},${
          endCoord.longitude
        }&mode=fastest;car;traffic:disabled`;
        let response = await fetch(link);
        let responseJson = await response.json();
        routes.push({
          index: j,
          distance: responseJson.response.route[0].summary.distance,
          data: schedule_detail['day_' + i][j],
        });
      }
      const sortRoutes = routes.sort(function(a, b) {
        return a.distance - b.distance;
      });
      let waypoint = `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=${API_KEY}`;
      let count = 0;
      sortRoutes.map(item => {
        waypoint =
          waypoint +
          `&waypoint${count}=geo!${item.data.location.latitude},${
            item.data.location.longitude
          }`;
        count++;
      });
      waypoint = waypoint + '&mode=fastest;car;traffic:disabled';
      let response = await fetch(waypoint);
      let responseJson = await response.json();
      scheduleDetails.push({
        sortRoutes,
        route: responseJson.response.route,
      });
    }
    console.log(scheduleDetails);
    return [];
  } catch (error) {
    console.log(error);
  }
}

export const types = {
  GET_LOCATION_INFO: 'GET_LOCATION_INFO',
  GET_LOCATION_INFO_FAIL: 'GET_LOCATION_INFO_FAIL',
  RESET: 'RESET',
};

export const actions = {
  get_location_info: (schedule_detail, numberOfDay) => {
    return async dispatch => {
      let scheduledetail = await DistanceCalculation(
        schedule_detail,
        numberOfDay,
      );
      dispatch({
        type: types.GET_LOCATION_INFO,
        payload: {
          data: scheduledetail,
        },
      });
    };
  },
  //   get_location_info: () => {
  //     return async dispatch => {
  //       try {
  //         if (true) {
  //           dispatch({
  //             type: types.GET_LOCATION_INFO,
  //             payload: {
  //               data: result.data,
  //               status: result.status,
  //             },
  //           });
  //         } else {
  //           dispatch({
  //             type: types.GET_LOCATION_INFO_FAIL,
  //             payload: {
  //               data: result.data.data,
  //             },
  //           });
  //         }
  //       } catch (error) {
  //         dispatch({
  //           type: types.GET_LOCATION_INFO_FAIL,
  //           payload: {
  //             data: error.data,
  //             status: error.status,
  //           },
  //         });
  //       }
  //     };
  //   },
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
export const caculatedLichTrinhReducer = (state = initialState, action) => {
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
