import {managerGroupTripReducer} from './managerGroupTripReducer';
import {managerGroupMemberReducer} from './managerGroupMemberReducer';
import {
  startPlaceReducer,
  endPlaceReducer,
  destinationReducer,
} from './myTravelPlaceReducer';
import {userReducer} from './UserReducer';
import {allLichTrinhReducer} from './allLichTrinhReducer';
import {detailLichTrinhReducer} from './detailLichTrinhReducer';
import {ownLichTrinhReducer} from './ownLichTrinhReducer';
export default {
  trip: managerGroupTripReducer,
  membersId: managerGroupMemberReducer,
  startPlace: startPlaceReducer,
  endPlace: endPlaceReducer,
  user: userReducer,
  allLichTrinh: allLichTrinhReducer,
  detailLichTrinh: detailLichTrinhReducer,
  ownLichTrinh: ownLichTrinhReducer,
  desitnation: destinationReducer,
  // scheduleDetail: scheduleDetailReducer,
};
