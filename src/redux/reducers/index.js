import {managerGroupTripReducer} from './managerGroupTripReducer';
import {managerGroupMemberReducer} from './managerGroupMemberReducer';
import {startPlaceReducer, endPlaceReducer} from './myTravelPlaceReducer';
import {userReducer} from './UserReducer';
import {allLichTrinhReducer} from './allLichTrinhReducer';
import {caculatedLichTrinhReducer} from './caculatedLichTrinhReducer';
export default {
  trip: managerGroupTripReducer,
  membersId: managerGroupMemberReducer,
  startPlace: startPlaceReducer,
  endPlace: endPlaceReducer,
  user: userReducer,
  allLichTrinh: allLichTrinhReducer,
  calLichTrinh: caculatedLichTrinhReducer,
};
