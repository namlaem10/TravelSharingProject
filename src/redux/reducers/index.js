import {managerGroupTripReducer} from './managerGroupTripReducer';
import {managerGroupMemberReducer} from './managerGroupMemberReducer';
import {startPlaceReducer, endPlaceReducer} from './myTravelPlaceReducer';

export default {
  trip: managerGroupTripReducer,
  membersId: managerGroupMemberReducer,
  startPlace: startPlaceReducer,
  endPlace: endPlaceReducer,
};
